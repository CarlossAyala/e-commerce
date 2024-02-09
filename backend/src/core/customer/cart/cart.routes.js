const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Product, CartProduct } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./cart.schema");

// TODO: Dependiendo de una key de los query params, buscar productos aptos para
// iniciar el proceso de checkout
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  try {
    const cart = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { id: customerId } = req.auth;
    const { quantity } = req.body;

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) throw Boom.notFound("Product not found");

      const cart = await CartProduct.model.findOne({
        where: {
          customerId,
          productId,
        },
      });

      if (cart) {
        cart.quantity = quantity;
        await cart.save();
        return res.json(cart);
      } else {
        const newCart = await CartProduct.model.create({
          customerId,
          productId,
          quantity,
        });
        return res.json(newCart);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await CartProduct.model.findOne({
        where: {
          customerId,
          productId,
        },
      });
      if (!cart) throw Boom.notFound("Cart not found");

      cart.quantity = quantity;
      await cart.save();

      res.json(cart);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;

    try {
      await CartProduct.model.destroy({
        where: {
          customerId,
          productId,
        },
      });

      res.json({
        message: "Product removed from cart",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
