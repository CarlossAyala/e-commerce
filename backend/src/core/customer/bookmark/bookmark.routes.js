const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Product, Bookmark } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./bookmark.schema");

// TODO: Add pagination

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.model.findAndCountAll({
      where: {
        customerId: req.auth.id,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
});

// Get
router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const { id: productId } = req.params;

      const bookmark = await Bookmark.model.findOne({
        where: {
          customerId: req.auth.id,
          productId,
        },
      });

      return res.status(200).json(bookmark);
    } catch (error) {
      next(error);
    }
  }
);

// Add
router.post(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    try {
      const { id: productId } = req.params;

      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound("Product not found"));

      const [bookmark, created] = await Bookmark.model.findOrCreate({
        where: {
          customerId: req.auth.id,
          productId,
        },
        defaults: {
          customerId: req.auth.id,
          productId,
        },
      });

      return res.status(created ? 201 : 200).json(bookmark);
    } catch (error) {
      next(error);
    }
  }
);

// Clear
router.delete("/clear", JWT.verify, async (req, res, next) => {
  try {
    await Bookmark.model.destroy({
      where: {
        customerId: req.auth.id,
      },
    });

    return res.status(200).json({ message: "Bookmarks cleared" });
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: productId } = req.params;

    try {
      await Bookmark.model.destroy({
        where: {
          productId,
          customerId: req.auth.id,
        },
      });

      return res.status(200).json({ message: "Bookmark removed" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
