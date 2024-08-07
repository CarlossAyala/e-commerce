const { Op } = require("sequelize");
const { unlink } = require("fs/promises");
const cloudinary = require("../../../services/cloudinary");
const { BadRequest } = require("../../../utils/http-errors");
const slugify = require("../../../utils/slugify");
const sequelize = require("../../../db/mysql");

const StoreModel = sequelize.model("Store");
const StoreGalleryModel = sequelize.model("StoreGallery");
const OrderModel = sequelize.model("Order");
const OrderItemModel = sequelize.model("OrderItem");
const ProductModel = sequelize.model("Product");

const find = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { name, description } = req.body;
  const slug = slugify(name);

  try {
    const store = await StoreModel.findOne({
      where: {
        slug,
      },
    });

    if (store?.userId === userId) {
      throw new BadRequest("You already have a store.");
    } else if (store) {
      throw new BadRequest("There is already a store with the same name.");
    }

    const newStore = await StoreModel.create({
      name,
      description,
      userId,
      slug,
    });

    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { userId } = req.auth;
  const { store } = req;
  const { name, description, profile, gallery } = req.body;
  const { nextProfile, nextGallery } = req.files;

  const slug = slugify(name);

  try {
    const storeExist = await StoreModel.findOne({
      where: {
        slug,
      },
    });

    if (storeExist && storeExist.userId !== userId) {
      throw new BadRequest("There is already a store with the same name");
    }

    await store.update({
      name,
      slug,
      description,
    });

    if (!profile && store.publicId) {
      await cloudinary.uploader.destroy(store.publicId);
      await store.update({
        publicId: null,
        url: null,
      });
    }
    if (nextProfile?.length) {
      if (store.publicId) {
        await cloudinary.uploader.destroy(store.publicId);
      }

      const { path, filename } = nextProfile[0];
      const result = await cloudinary.uploader.upload(path, {
        resource_type: "image",
        public_id: filename,
        transformation: [
          { width: 120, height: 120, crop: "scale" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
      await store.update({
        publicId: result.public_id,
        url: result.secure_url,
      });
      await unlink(path);
    }

    const currentGallery = await StoreGalleryModel.findAll({
      where: {
        storeId: store.id,
      },
    });
    const imagesToDelete = currentGallery.filter((image) => {
      return !gallery.includes(image.id);
    });
    if (imagesToDelete.length) {
      await StoreGalleryModel.destroy({
        where: {
          id: {
            [Op.in]: imagesToDelete.map((image) => image.id),
          },
        },
      });
      await Promise.all(
        imagesToDelete.map((image) => {
          return cloudinary.uploader.destroy(image.publicId);
        }),
      );
    }

    const galleryToUpdate = currentGallery.filter((image) => {
      return gallery.includes(image.id);
    });
    if (galleryToUpdate.length) {
      await Promise.all(
        galleryToUpdate.map((image, index) => {
          return image.update({
            order: index,
          });
        }),
      );
    }
    if (nextGallery?.length) {
      const result = await Promise.all(
        nextGallery.map((file) => {
          return cloudinary.uploader.upload(file.path, {
            resource_type: "image",
            public_id: file.filename,
            transformation: [
              { width: 810, height: 172, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });
        }),
      );
      await StoreGalleryModel.bulkCreate(
        result.map((image, index) => ({
          publicId: image.public_id,
          url: image.secure_url,
          order: index + galleryToUpdate.length,
          storeId: store.id,
        })),
      );
      await Promise.all(nextGallery.map((file) => unlink(file.path)));
    }

    res.json(store);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { store } = req;

  try {
    if (store.gallery.length) {
      await Promise.all(
        store.gallery.map((image) => {
          return cloudinary.uploader.destroy(image.publicId);
        }),
      );
      await StoreGalleryModel.destroy({
        where: {
          storeId: store.id,
        },
      });
    }

    if (store.publicId) {
      await cloudinary.uploader.destroy(store.publicId);
    }

    await store.destroy();

    res.json({
      message: "Store deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getEarnings = async (req, res, next) => {
  const { store } = req;

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  try {
    const orders = await OrderModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
      include: {
        model: OrderItemModel,
        as: "items",
        include: {
          model: ProductModel,
          as: "product",
          attributes: [],
          where: {
            storeId: store.id,
          },
        },
      },
    });

    const earnings = orders.reduce((acc, order) => {
      return (
        acc +
        order.items.reduce((acc, item) => {
          return acc + +item.price * item.quantity;
        }, 0)
      );
    }, 0);

    res.json(earnings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  find,
  create,
  update,
  remove,
  getEarnings,
};
