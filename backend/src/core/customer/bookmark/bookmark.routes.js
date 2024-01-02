const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Product, Bookmark } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./bookmark.schema");
const { QueryBuilder } = require("../../../libs");

router.get("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const bookmarks = await Bookmark.model.findAndCountAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
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
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;
    try {
      const bookmark = await Bookmark.model.findOne({
        where: {
          customerId,
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
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound("Product not found"));

      const [bookmark, created] = await Bookmark.model.findOrCreate({
        where: {
          customerId,
          productId,
        },
        defaults: {
          customerId,
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
  const { id: customerId } = req.auth;

  try {
    await Bookmark.model.destroy({
      where: {
        customerId,
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
    const { id: customerId } = req.auth;
    const { id: productId } = req.params;

    try {
      await Bookmark.model.destroy({
        where: {
          customerId,
          productId,
        },
      });

      return res.status(200).json({ message: "Bookmark removed" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
