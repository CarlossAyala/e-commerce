const db = require("../../../db/mysql/models");
const { NotFound } = require("../../../utils/http-errors");

const CartProductModel = db.sequelize.model("CartProduct");
const ProductModel = db.sequelize.model("Product");
const ProductImageModel = db.sequelize.model("ProductImage");

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
  const { userId: customerId } = req.auth;

  try {
    const cart = await CartProductModel.findAll({
      where: {
        customerId,
      },
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductImageModel,
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
  const { userId: customerId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    let item = await CartProductModel.findOne({
      where: {
        customerId,
        productId,
      },
    });

    if (!item) {
      item = await CartProductModel.create({
        customerId,
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
  const { userId: customerId } = req.auth;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await CartProductModel.findOne({
      where: {
        customerId,
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
  const { userId: customerId } = req.auth;
  const { productId } = req.params;

  try {
    await CartProductModel.destroy({
      where: {
        customerId,
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
