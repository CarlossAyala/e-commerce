const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const ProductModel = sequelize.model("Product");
const OrderItemModel = sequelize.model("OrderItem");
const ReviewModel = sequelize.model("Review");

const validateProductId = async (req, _res, next, productId) => {
  const { store } = req;

  try {
    const product = await ProductModel.findByPk(productId, {
      where: {
        storeId: store.id,
      },
    });
    if (!product) {
      throw new NotFound("Product not found");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const { store } = req;

  const { where: whereProduct } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .build();
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  try {
    const reviews = await ReviewModel.findAndCountAll({
      include: {
        model: OrderItemModel,
        as: "item",
        include: {
          model: ProductModel,
          as: "product",
          where: whereProduct,
        },
        required: true,
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAllByProductId = async (req, res, next) => {
  const { productId } = req.params;

  const { limit, offset } = new QueryBuilder(req.query).pagination().build();

  const { where: whereReview } = new QueryBuilder(req.query)
    .whereLike("description", req.query.q)
    .build();

  try {
    const reviews = await ReviewModel.findAndCountAll({
      where: whereReview,
      include: {
        model: OrderItemModel,
        as: "item",
        include: {
          model: ProductModel,
          as: "product",
          where: {
            id: productId,
          },
        },
        required: true,
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const avgRatingByProductId = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await ReviewModel.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "rating"],
        [Sequelize.fn("COUNT", Sequelize.col("Review.id")), "count"],
      ],
      include: {
        model: OrderItemModel,
        as: "item",
        attributes: [],
        include: {
          model: ProductModel,
          as: "product",
          where: {
            id: productId,
          },
        },
        required: true,
      },
      group: ["item.product_id"],
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findAllByProductId,
  avgRatingByProductId,
  validateProductId,
};
