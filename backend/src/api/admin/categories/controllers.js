const path = require("path");
const { unlink } = require("node:fs/promises");
const { Op } = require("sequelize");
const sequelize = require("../../../db/mysql");
const { NotFound, BadRequest } = require("../../../utils/http-errors");
const slugify = require("../../../utils/slugify");

const ProductModel = sequelize.model("Product");
const CategoryModel = sequelize.model("Category");
const CategoryGalleryModel = sequelize.model("CategoryGallery");

const validateCategoryId = async (req, _res, next, categoryId) => {
  try {
    const category = await CategoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFound("Category not found");
    }
    const gallery = await CategoryGalleryModel.findAll({
      where: {
        categoryId,
      },
      raw: true,
    });
    req.gallery = gallery;

    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await CategoryModel.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: CategoryModel,
          as: "children",
          include: {
            model: CategoryGalleryModel,
            as: "gallery",
            required: false,
            order: [["order", "ASC"]],
            separate: true,
          },
        },
        {
          model: CategoryGalleryModel,
          as: "gallery",
          required: false,
          order: [["order", "ASC"]],
          separate: true,
        },
      ],
      order: [["name", "ASC"]],
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCount = async (_req, res, next) => {
  try {
    const count = await CategoryModel.count();

    res.json(count);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { category } = req;

  try {
    if (category.parentId) {
      const _category = await CategoryModel.findByPk(category.id, {
        include: [
          {
            model: CategoryModel,
            as: "parent",
          },
          {
            model: CategoryGalleryModel,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
        ],
      });

      res.json(_category);
    } else {
      const _category = await CategoryModel.findByPk(category.id, {
        include: [
          {
            model: CategoryModel,
            as: "children",
            include: {
              model: CategoryGalleryModel,
              as: "gallery",
              required: false,
              order: [["order", "ASC"]],
              separate: true,
            },
          },
          {
            model: CategoryGalleryModel,
            as: "gallery",
            required: false,
            order: [["order", "ASC"]],
            separate: true,
          },
        ],
        order: [["name", "ASC"]],
      });

      res.json(_category);
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, description } = req.body;
  const gallery = req.files;

  const slug = slugify(name);

  try {
    const _category = await CategoryModel.findOne({
      where: {
        slug,
      },
    });
    if (_category) {
      throw new BadRequest("Category already exists");
    }

    const category = await CategoryModel.create({
      name,
      description,
      slug,
    });
    await CategoryGalleryModel.bulkCreate(
      gallery.map((file, index) => ({
        filename: file.filename,
        order: index,
        url:
          req.protocol + "://" + req.get("host") + "/images/" + file.filename,
        categoryId: category.id,
      })),
    );

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { category } = req;
  const { name, description, currentGallery } = req.body;
  const newGallery = req.files;

  const slug = slugify(name);

  try {
    if (category.slug !== slug) {
      const _category = await CategoryModel.findOne({
        where: {
          slug,
        },
      });
      if (_category) {
        throw new BadRequest("Category already exists");
      }
    }

    await category.update({
      name,
      description,
      slug,
    });

    const gallery = await CategoryGalleryModel.findAll({
      where: {
        categoryId: category.id,
      },
    });
    const galleryToDelete = gallery.filter(
      (image) => !currentGallery.includes(image.id),
    );
    if (galleryToDelete.length) {
      await Promise.all(
        galleryToDelete.map((image) => {
          const filePath = path.join(
            __dirname,
            "../../../../public/images",
            image.filename,
          );
          return unlink(filePath);
        }),
      );
      await CategoryGalleryModel.destroy({
        where: {
          id: {
            [Op.in]: galleryToDelete.map((image) => image.id),
          },
        },
      });
    }

    const galleryToUpdate = gallery.filter((image) =>
      currentGallery.includes(image.id),
    );
    if (galleryToUpdate.length) {
      await Promise.all(
        galleryToUpdate.map((image, index) => {
          return image.update({
            order: index,
          });
        }),
      );
    }

    if (newGallery.length) {
      await CategoryGalleryModel.bulkCreate(
        newGallery.map((file, index) => ({
          filename: file.filename,
          order: galleryToUpdate.length + index,
          url:
            req.protocol + "://" + req.get("host") + "/images/" + file.filename,
          categoryId: category.id,
        })),
      );
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const attach = async (req, res, next) => {
  const { category } = req;
  const { categoriesId } = req.body;

  try {
    if (category.parentId) {
      throw new BadRequest(`${category.name} category need be a main category`);
    }

    const categories = await CategoryModel.findAll({
      where: {
        id: {
          [Op.in]: categoriesId,
        },
      },
    });

    for (const _category of categories) {
      const hasSubCategories = await CategoryModel.findOne({
        where: {
          parentId: _category.id,
        },
      });
      if (hasSubCategories) {
        throw new BadRequest(
          `${_category.name} need be without any sub-category`,
        );
      }
    }

    await CategoryModel.update(
      {
        parentId: category.id,
      },
      {
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      },
    );

    res.json({ message: "Categories attached successfully" });
  } catch (error) {
    next(error);
  }
};

const detach = async (req, res, next) => {
  const { category } = req;
  const { categoriesId } = req.body;

  try {
    if (category.parentId) {
      throw new BadRequest(`${category.name} category need be a main category`);
    }

    const categories = await CategoryModel.findAll({
      where: {
        id: {
          [Op.in]: categoriesId,
        },
      },
    });

    for (const _category of categories) {
      if (_category.parentId !== category.id) {
        throw new BadRequest(
          `${_category.name} category is not a sub category of ${category.name}`,
        );
      }
    }

    await CategoryModel.update(
      {
        parentId: null,
      },
      {
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      },
    );

    res.json({ message: "Categories detached successfully" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { category } = req;

  try {
    if (!category.parentId) {
      const subs = await CategoryModel.findAll({
        where: {
          parentId: category.id,
        },
      });
      if (subs.length) {
        throw new BadRequest("Category need be empty");
      }
    }

    const gallery = await CategoryGalleryModel.findAll({
      where: {
        categoryId: category.id,
      },
    });
    if (gallery.length) {
      await Promise.all(
        gallery.map((image) => {
          const filePath = path.join(
            __dirname,
            "../../../../public/images",
            image.filename,
          );
          return unlink(filePath);
        }),
      );
      await CategoryGalleryModel.destroy({
        where: {
          categoryId: category.id,
        },
      });
    }

    await ProductModel.update(
      {
        categoryId: null,
      },
      {
        where: {
          categoryId: category.id,
        },
      },
    );

    await CategoryModel.destroy({
      where: {
        id: category.id,
      },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCategoryId,
  getAll,
  create,
  getCount,
  findOne,
  update,
  attach,
  detach,
  remove,
};
