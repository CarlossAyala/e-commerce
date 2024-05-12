const { Op, Sequelize } = require("sequelize");
const { unlink } = require("fs/promises");
const db = require("../../../db/mysql/models");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");
const cloudinary = require("../../../services/cloudinary");
const slugify = require("../../../utils/slugify");

const ProductModel = db.sequelize.model("Product");
const ProductImageModel = db.sequelize.model("ProductImage");
const CategoryModel = db.sequelize.model("Category");

const findById = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await ProductModel.findByPk(productId, {
      include: {
        model: ProductImageModel,
        as: "gallery",
        order: [["order", "ASC"]],
        separate: true,
      },
    });

    if (!product || product.storeId !== store.id) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { store } = req;
  const qb = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .pagination()
    .build();

  try {
    const result = await ProductModel.findAndCountAll({
      ...qb,
      include: {
        model: ProductImageModel,
        as: "gallery",
        order: [["order", "ASC"]],
        limit: 1,
        separate: true,
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { product } = req;

  try {
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { store } = req;
  const { name, categoryId, ...rest } = req.body;
  const gallery = req.files;

  try {
    const category = await CategoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFound("Category not found");
    }

    const product = await ProductModel.create({
      name,
      slug: slugify(name),
      categoryId,
      storeId: store.id,
      ...rest,
    });

    const result = await Promise.all(
      gallery.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          public_id: file.filename,
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
      })
    );

    await ProductImageModel.bulkCreate(
      result.map((image, index) => ({
        publicId: image.public_id,
        url: image.secure_url,
        order: index,
        productId: product.id,
      }))
    );

    await Promise.all(gallery.map((file) => unlink(file.path)));

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { product } = req;
  const { name, categoryId, currentGallery, ...rest } = req.body;
  const newGallery = req.files;

  try {
    const category = await CategoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFound("Category not found");
    }

    await product.update({
      name,
      slug: slugify(name),
      categoryId,
      ...rest,
    });

    const gallery = await ProductImageModel.findAll({
      where: {
        productId: product.id,
      },
    });

    const galleryIds = gallery.map((image) => image.id);
    const galleryToDelete = galleryIds.filter(
      (id) => !currentGallery.includes(id)
    );
    if (galleryToDelete.length) {
      await ProductImageModel.destroy({
        where: {
          id: {
            [Op.in]: galleryToDelete,
          },
        },
      });

      await Promise.all(
        gallery
          .filter((image) => galleryToDelete.includes(image.id))
          .map((image) => cloudinary.uploader.destroy(image.publicId))
      );
    }

    const galleryToUpdate = gallery.filter((image) =>
      currentGallery.includes(image.id)
    );
    if (galleryToUpdate.length) {
      await Promise.all(
        galleryToUpdate.map((image, index) => {
          return image.update({
            order: index,
          });
        })
      );
    }

    if (newGallery.length) {
      const newGalleryResult = await Promise.all(
        newGallery.map((file) => {
          return cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            public_id: file.filename,
            transformation: [
              { width: 500, height: 500, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });
        })
      );

      await ProductImageModel.bulkCreate(
        newGalleryResult.map((image, index) => ({
          publicId: image.public_id,
          url: image.secure_url,
          order: index + galleryToUpdate.length,
          productId: product.id,
        }))
      );
      await Promise.all(newGallery.map((file) => unlink(file.path)));
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { product } = req;

  try {
    const images = await ProductImageModel.findAll({
      where: {
        productId: product.id,
      },
    });
    await Promise.all(
      images.map((image) => cloudinary.uploader.destroy(image.publicId))
    );

    await ProductImageModel.destroy({
      where: {
        productId: product.id,
      },
    });
    await product.destroy();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getCount = async (req, res, next) => {
  const { store } = req;

  try {
    const count = await ProductModel.count({
      where: {
        storeId: store.id,
      },
    });

    res.json(count);
  } catch (error) {
    next(error);
  }
};

const getGrowthStats = async (req, res, next) => {
  const { store } = req;
  const INTERVALS = ["7d", "30d", "3m", "6m", "1y", "all-time"];
  const DEFAULT_INTERVAL = "7d";

  const { interval } = req.query;
  const intervalToUse = INTERVALS.includes(interval)
    ? interval
    : DEFAULT_INTERVAL;

  try {
    switch (intervalToUse) {
      case "7d": {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 7 DAY"),
            },
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "30d": {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 30 DAY"),
            },
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "3m": {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 3 MONTH"),
            },
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "6m": {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 6 MONTH"),
            },
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      case "1y": {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL 1 YEAR"),
            },
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
        break;
      }
      default: {
        const stats = await ProductModel.findAll({
          attributes: [
            [
              Sequelize.fn(
                "date_format",
                Sequelize.col("created_at"),
                "%Y-%m-%d"
              ),
              "date",
            ],
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          where: {
            storeId: store.id,
          },
          group: ["date"],
          order: [["date", "ASC"]],
          raw: true,
        });

        res.json(stats);
      }
    }
  } catch (error) {
    next(error);
  }
};

const getCountStatus = async (req, res, next) => {
  const { store } = req;

  try {
    const active = await ProductModel.count({
      where: {
        storeId: store.id,
        available: true,
      },
    });

    const inactive = await ProductModel.count({
      where: {
        storeId: store.id,
        available: false,
      },
    });

    res.json({ active, inactive });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findById,
  create,
  findAll,
  findOne,
  update,
  remove,
  getCount,
  getGrowthStats,
  getCountStatus,
};
