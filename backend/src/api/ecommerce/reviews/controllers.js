const { Op, Sequelize } = require("sequelize");
const QueryBuilder = require("../../../utils/query-builder");
const { NotFound } = require("../../../utils/http-errors");
const sequelize = require("../../../db/mysql");

const ReviewModel = sequelize.model("Review");
const OrderItemModel = sequelize.model("OrderItem");
const OrderModel = sequelize.model("Order");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const findAllDone = async (req, res, next) => {
  const { userId } = req.auth;

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await ReviewModel.findAndCountAll({
      include: {
        model: OrderItemModel,
        as: "item",
        include: [
          {
            model: OrderModel,
            as: "order",
            where: {
              userId,
            },
          },
          {
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
        ],
      },
      order,
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const findAllPending = async (req, res, next) => {
  const { userId } = req.auth;

  const { where: whereProduct } = new QueryBuilder()
    .whereLike("name", req.query.q)
    .build();

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await OrderItemModel.findAndCountAll({
      where: {
        reviewId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: OrderModel,
          as: "order",
          where: {
            userId,
          },
        },
        {
          model: ProductModel,
          as: "product",
          where: whereProduct,
          include: {
            model: ProductGalleryModel,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
        },
      ],
      order,
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { orderItemId } = req.params;
  const { body } = req;

  try {
    const orderItem = await OrderItemModel.findByPk(orderItemId, {
      include: {
        model: OrderModel,
        as: "order",
        where: {
          userId,
        },
      },
    });
    if (!orderItem) {
      throw new NotFound("Order item not found");
    }

    const review = await ReviewModel.create(body);

    await orderItem.update({
      reviewId: review.id,
    });

    res.json(review);
  } catch (error) {
    next(error);
  }
};

const findAllByProductId = async (req, res, next) => {
  const { productId } = req.params;
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const reviews = await ReviewModel.findAndCountAll({
      include: {
        model: OrderItemModel,
        as: "item",
        attributes: [],
        where: { productId },
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const productStats = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await ReviewModel.findAll({
      attributes: [
        "rating",
        [Sequelize.fn("COUNT", Sequelize.col("rating")), "rating_count"],
      ],
      include: {
        model: OrderItemModel,
        as: "item",
        attributes: [],
        where: { productId },
      },
      group: ["rating"],
      raw: true,
    });

    const stats = new Map([
      [5, 0],
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
    ]);

    for (const { rating, rating_count } of result) {
      stats.set(rating, rating_count);
    }
    const count = result.reduce((acc, curr) => acc + curr.rating_count, 0);

    // calc % of each rating
    const levels = Array.from(stats.keys()).map((rating) => {
      const rating_count = stats.get(rating);

      return {
        rating,
        percentage: rating_count
          ? +Number((rating_count / count) * 100).toFixed(2)
          : 0,
        count: stats.get(rating),
      };
    });

    // calc average rating
    const average = result.length
      ? Number(
          result.reduce(
            (acc, curr) => acc + curr.rating * curr.rating_count,
            0,
          ) / count,
        ).toFixed(1)
      : 0;

    res.json({
      levels,
      average,
      count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllDone,
  findAllPending,
  create,
  findAllByProductId,
  productStats,
};
