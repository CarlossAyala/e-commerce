const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const schemas = require("./schemas");
const {
  JWT,
  validateSchema,
  authorization,
  authentication,
} = require("../../../middlewares");
const {
  Roles,
  RequestOfficialStore,
  Store,
} = require("../../../database/mysql/models");
const { QueryBuilder } = require("../../../libs");

router.get(
  "/",
  JWT.verify,
  authentication,
  authorization([Roles.permissions.crud_requests_official_stores]),
  async (req, res, next) => {
    const { status } = req.query;

    const _status =
      RequestOfficialStore.enums.status[status] ??
      RequestOfficialStore.enums.status.process;

    const { limit, offset, order } = new QueryBuilder(req.query)
      .orderBy("updatedAt", "DESC")
      .pagination()
      .build();

    try {
      const stores = await RequestOfficialStore.model.findAndCountAll({
        where: {
          status: _status,
        },
        include: {
          model: Store.model,
          as: "store",
        },
        order,
        limit,
        offset,
      });

      return res.json(stores);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  JWT.verify,
  authentication,
  authorization([Roles.permissions.crud_requests_official_stores]),
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: requestId } = req.params;

    try {
      const request = await RequestOfficialStore.model.findByPk(requestId, {
        include: {
          model: Store.model,
          as: "store",
        },
      });
      if (!request) {
        throw Boom.badRequest("Request not found");
      }

      return res.json(request);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/history",
  JWT.verify,
  authentication,
  authorization([Roles.permissions.crud_requests_official_stores]),
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: storeId } = req.params;
    const { limit, offset } = new QueryBuilder(req.query).pagination().build();

    try {
      const store = await Store.model.findByPk(storeId);
      if (!store) {
        throw Boom.badRequest("Store not found");
      }

      const history = await RequestOfficialStore.model.findAndCountAll({
        where: {
          storeId,
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      return res.json(history);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  JWT.verify,
  authentication,
  authorization([Roles.permissions.crud_requests_official_stores]),
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.update, "body"),
  async (req, res, next) => {
    const { id: requestId } = req.params;
    const { response, status } = req.body;

    const { process, approved } = RequestOfficialStore.enums.status;

    try {
      const request = await RequestOfficialStore.model.findByPk(requestId);
      if (!request) {
        throw Boom.badRequest("Request not found");
      } else if (request.status !== process) {
        throw Boom.badRequest("Request is not in process");
      }

      if (status === approved) {
        await Store.model.update(
          { official: true },
          { where: { id: request.storeId } }
        );
      }

      await request.update({ response, status });

      return res.json(request);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
