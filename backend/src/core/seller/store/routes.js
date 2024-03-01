const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema, authStore } = require("../../../middlewares");

const router = express.Router();

router.get("/", authStore, controllers.find);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.put(
  "/",
  authStore,
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.delete("/", authStore, controllers.remove);

// Get Store Stats
// router.get("/stats", JWT.verify, async (req, res, next) => {
//   const { id: sellerId } = req.auth;

//   try {
//     const store = await Store.model.findOne({
//       where: {
//         sellerId,
//       },
//     });
//     if (!store) return next(Boom.notFound("Store not found"));

//     const daysAgo30 = new Date(new Date() - 60 * 60 * 24 * 30 * 1000);

//     const revenuesPromise = OrderItem.model.findAll({
//       attributes: [
//         "id",
//         [
//           Sequelize.fn(
//             "SUM",
//             Sequelize.literal("OrderItem.price * OrderItem.quantity")
//           ),
//           "revenue",
//         ],
//       ],
//       where: {
//         createdAt: {
//           [Op.gte]: daysAgo30,
//         },
//       },
//       include: {
//         model: Product.model,
//         as: "product",
//         attributes: [],
//         where: {
//           storeId: store.id,
//         },
//       },
//       group: ["id"],
//     });

//     const soldPromise = OrderItem.model.findAll({
//       attributes: ["quantity"],
//       where: {
//         createdAt: {
//           [Op.gte]: daysAgo30,
//         },
//       },
//       include: {
//         model: Product.model,
//         as: "product",
//         attributes: [],
//         where: {
//           storeId: store.id,
//         },
//       },
//     });

//     const stockAlertPromise = Product.model.count({
//       where: {
//         storeId: store.id,
//         stock: {
//           [Op.lte]: Sequelize.col("stock_alert"),
//         },
//       },
//     });

//     const questionsPromise = Question.model.count({
//       where: {
//         states: Question.enums.states.queue,
//       },
//       include: {
//         model: Product.model,
//         as: "product",
//         attributes: [],
//         where: {
//           storeId: store.id,
//         },
//       },
//     });

//     const [revenuesResult, soldResult, stockAlertResult, questionsResult] =
//       await Promise.all([
//         revenuesPromise,
//         soldPromise,
//         stockAlertPromise,
//         questionsPromise,
//       ]);

//     const revenue = revenuesResult.reduce(
//       (acc, item) => acc + (+item.dataValues.revenue || 0),
//       0
//     );
//     const sold = soldResult.reduce(
//       (acc, item) => acc + (+item.dataValues.quantity || 0),
//       0
//     );

//     return res.status(200).json({
//       revenue,
//       sold,
//       stockAlert: stockAlertResult,
//       questions: questionsResult,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
