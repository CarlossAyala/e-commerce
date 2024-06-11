const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");

const CartModel = sequelize.model("Cart");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const validateProductId = async (req, _res, next, productId) => {
  try {
    const product = await ProductModel.findByPk(productId);
    if (!product) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    const cart = await CartModel.findAll({
      where: {
        userId,
      },
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductGalleryModel,
          as: "gallery",
          separate: true,
          order: [["order", "ASC"]],
          required: false,
        },
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    let item = await CartModel.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!item) {
      item = await CartModel.create({
        userId,
        productId,
        quantity,
      });
    } else {
      await item.update({ quantity });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await CartModel.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!item) throw notFound("Item not found");

    await item.update({ quantity });

    res.json(item);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await CartModel.destroy({
      where: {
        userId,
        productId,
      },
    });

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProductId,
  findAll,
  create,
  update,
  remove,
};
