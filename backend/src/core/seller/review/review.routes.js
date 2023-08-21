const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Store, Review, Product } = require("../../../database/mysql/models");
const JWT = require("../../../middlewares/auth/jwt.auth");
const QueryBuilder = require("../../../utils/database/query-builder");

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const reviews = await Review.model.findAndCountAll({
      where: {
        status: Review.enums.status.done,
      },
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
        },
      },
      order,
      limit,
      offset,
    });

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
