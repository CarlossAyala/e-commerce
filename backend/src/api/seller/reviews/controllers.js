const { Sequelize } = require("sequelize");
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

// const findAll = async (req, res, next) => {
//   const { store } = req;

//   const { where: whereProduct } = new QueryBuilder(req.query)
//     .where("storeId", store.id)
//     .whereLike("name", req.query.q)
//     .build();
//   const { limit, offset } = new QueryBuilder(req.query).pagination().build();

//   try {
//     const reviews = await ReviewModel.findAndCountAll({
//       include: {
//         model: OrderItemModel,
//         as: "item",
//         include: {
//           model: ProductModel,
//           as: "product",
//           where: whereProduct,
//         },
//         required: true,
//       },
//       order: [["createdAt", "DESC"]],
//       limit,
//       offset,
//     });

//     res.json(reviews);
//   } catch (error) {
//     next(error);
//   }
// };
const findAll = async (req, res, next) => {
  const { store } = req;

  const { where: whereProduct } = new QueryBuilder(req.query)
    .where("storeId", store.id)
    .whereLike("name", req.query.q)
    .build();
  const { limit, offset, order } = new QueryBuilder(req.query)
    .orderBy("name", "ASC")
    .build();

  try {
    const products = await ProductModel.findAndCountAll({
      where: whereProduct,
      limit,
      offset,
      order,
      raw: true,
    });

    const reviews = await Promise.all(
      products.rows.map(async (product) => {
        const { rows, count } = await ReviewModel.findAndCountAll({
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("rating")), "rating"],
          ],
          include: {
            model: OrderItemModel,
            as: "item",
            attributes: [],
            include: {
              model: ProductModel,
              as: "product",
              attributes: [],
              where: {
                id: product.id,
              },
            },
            required: true,
          },
          raw: true,
        });

        const rating = Number(rows[0]?.rating ?? 0).toFixed(1);

        return { ...product, rating, count };
      }),
    );

    res.json({
      rows: reviews,
      count: products.count,
    });
  } catch (error) {
    next(error);
  }
};

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
      group: ["item.productId"],
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
