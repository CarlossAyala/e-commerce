// eslint-disable-next-line no-unused-vars
import express from "express";
import { Op } from "sequelize";
import { unlink } from "fs/promises";
import {
  Store,
  StoreImage,
  Order,
  OrderItem,
  Product,
} from "../../../database/mysql/models/index.js";
import { badRequest } from "../../../middlewares/index.js";
import { slugify, cloudinary } from "../../../libs/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const find = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { name, description } = req.body;
  const slug = slugify(name);

  try {
    const store = await Store.model.findOne({
      where: {
        slug,
      },
    });

    if (store?.sellerId === userId) {
      throw badRequest("You already have a store.");
    } else if (store) {
      throw badRequest("There is already a store with the same name");
    }

    const newStore = await Store.model.create({
      name,
      description,
      sellerId: userId,
      slug,
    });

    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const update = async (req, res, next) => {
  const { userId } = req.auth;
  const { store } = req;
  const { name, description, profile, gallery } = req.body;
  const { nextProfile, nextGallery } = req.files;

  const slug = slugify(name);

  try {
    const storeExist = await Store.model.findOne({
      where: {
        slug,
      },
    });

    if (storeExist && storeExist.sellerId !== userId) {
      throw badRequest("There is already a store with the same name");
    }

    await store.update({
      name,
      slug,
      description,
    });

    console.log("PUBLIC ID", store);
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
          { width: 250, height: 250, crop: "fill" },
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

    const currentGallery = await StoreImage.model.findAll({
      where: {
        storeId: store.id,
      },
    });
    const imagesToDelete = currentGallery.filter((image) => {
      return !gallery.includes(image.id);
    });
    if (imagesToDelete.length) {
      await StoreImage.model.destroy({
        where: {
          id: {
            [Op.in]: imagesToDelete.map((image) => image.id),
          },
        },
      });
      await Promise.all(
        imagesToDelete.map((image) => {
          return cloudinary.uploader.destroy(image.publicId);
        })
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
        })
      );
    }
    if (nextGallery?.length) {
      const result = await Promise.all(
        nextGallery.map((file) => {
          return cloudinary.uploader.upload(file.path, {
            resource_type: "image",
            public_id: file.filename,
            transformation: [
              { width: 1600, height: 350, crop: "fill" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });
        })
      );
      await StoreImage.model.bulkCreate(
        result.map((image, index) => ({
          publicId: image.public_id,
          url: image.secure_url,
          order: index + galleryToUpdate.length,
          storeId: store.id,
        }))
      );
      await Promise.all(nextGallery.map((file) => unlink(file.path)));
    }

    res.json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const remove = async (req, res, next) => {
  const { store } = req;

  try {
    if (store.gallery.length) {
      await Promise.all(
        store.gallery.map((image) => {
          return cloudinary.uploader.destroy(image.publicId);
        })
      );
      await StoreImage.model.destroy({
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const getEarnings = async (req, res, next) => {
  const { store } = req;

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const orders = await Order.model.findAll({
      where: {
        createdAt: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
      include: {
        model: OrderItem.model,
        as: "items",
        include: {
          model: Product.model,
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
