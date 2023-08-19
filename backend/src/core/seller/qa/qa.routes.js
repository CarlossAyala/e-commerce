const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const {
  Product,
  Store,
  Question,
  Answer,
} = require("../../../database/mysql/models");
const JWT = require("../../../middlewares/auth/jwt.auth");
const validatorSchema = require("../../../middlewares/api/validator.middleware");
const QueryBuilder = require("../../../utils/database/query-builder");
const schemas = require("./qa.schema");
const sequelize = require("../../../database/mysql");

// Get All Question
router.get("/all", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  const { limit, offset } = new QueryBuilder(req.query).pagination().build();
  const { where } = new QueryBuilder(req.query)
    .where("name", req.query.name)
    .build();

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const questions = await Question.model.findAndCountAll({
      attributes: [
        "productId",
        [sequelize.fn("COUNT", sequelize.col("product_id")), "count"],
      ],
      where: {
        states: Question.enums.states.queue,
      },
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
          ...where,
        },
      },
      group: ["productId"],
      order: [["count", "DESC"]],
      limit,
      offset,
    });

    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

// Get Product Questions
router.get(
  "/:id/list",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: productId } = req.params;
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

      const product = await Product.model.findByPk(productId);
      if (!product || product.storeId !== store.id) {
        return next(Boom.notFound("Product not found"));
      }

      const questions = await Question.model.findAndCountAll({
        where: {
          states: Question.enums.states.queue,
          productId,
        },
        order,
        limit,
        offset,
      });

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }
);

// Get Question
router.get(
  "/:id",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: questionId } = req.params;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const question = await Question.model.findOne({
        where: {
          id: questionId,
        },
        include: {
          model: Product.model,
          as: "product",
          where: {
            storeId: store.dataValues.id,
          },
        },
      });
      if (!question) {
        return next(Boom.notFound("Question not found"));
      }

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
);

// Reply Question
router.post(
  "/:id/reply",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  validatorSchema(schemas.answer, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: questionId } = req.params;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const question = await Question.model.findOne({
        where: {
          id: questionId,
        },
        include: {
          model: Product.model,
          as: "product",
          where: {
            storeId: store.dataValues.id,
          },
        },
      });
      if (!question) return next(Boom.notFound("Question not found"));
      else if (question.states !== Question.enums.states.queue) {
        return next(Boom.badRequest("Question is not in queue"));
      }

      const futureAnswer = await sequelize.transaction(async (t) => {
        const answer = await Answer.model.create(
          {
            answer: req.body.answer,
            employeeId: req.auth.id,
            questionId,
          },
          {
            transaction: t,
          }
        );
        await question.update(
          {
            states: Question.enums.states.answered,
          },
          {
            transaction: t,
          }
        );

        return answer;
      });

      return res.status(200).json(futureAnswer);
    } catch (error) {
      next(error);
    }
  }
);

// Reject Question
router.patch(
  "/:id/reject",
  JWT.verify,
  validatorSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: questionId } = req.params;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const question = await Question.model.findOne({
        where: {
          id: questionId,
        },
        include: {
          model: Product.model,
          as: "product",
          where: {
            storeId: store.dataValues.id,
          },
        },
      });
      if (!question) return next(Boom.notFound("Question not found"));
      else if (question.states !== Question.enums.states.queue) {
        return next(Boom.badRequest("Question is not in queue"));
      }

      await question.update({
        states: Question.enums.states.rejected,
      });

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
