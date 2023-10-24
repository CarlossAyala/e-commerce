const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const {
  Store,
  RequestOfficialStore,
  User,
} = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./schemas");
const { QueryBuilder } = require("../../../libs");

router.get("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;

  try {
    const seller = await User.model.findByPk(sellerId, {
      include: {
        model: Store.model,
        as: "store",
      },
    });
    if (!seller) {
      throw Boom.badRequest("Seller not found");
    } else if (!seller.store) {
      throw Boom.badRequest("Store not found");
    }

    const qb = new QueryBuilder(req.query)
      .where("storeId", seller.store.id)
      .orderBy("updated_at", "DESC")
      .pagination()
      .build();

    const requests = await RequestOfficialStore.model.findAndCountAll(qb);

    return res.json(requests);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: requestId } = req.params;

    try {
      const seller = await User.model.findByPk(sellerId, {
        include: {
          model: Store.model,
          as: "store",
        },
      });
      if (!seller) {
        throw Boom.badRequest("Seller not found");
      } else if (!seller.store) {
        throw Boom.badRequest("Store not found");
      }

      const request = await RequestOfficialStore.model.findByPk(requestId);
      if (!request) {
        throw Boom.badRequest("Request not found");
      }

      return res.json(request);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  JWT.verify,
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { description } = req.body;

    try {
      const seller = await User.model.findByPk(sellerId, {
        include: {
          model: Store.model,
          as: "store",
        },
      });
      if (!seller || !seller.store) {
        throw Boom.badRequest("Seller not found");
      } else if (seller.store.official) {
        throw Boom.badRequest("You store is already official");
      }

      const hasRequest = await RequestOfficialStore.model.findOne({
        where: {
          status: RequestOfficialStore.enums.status.process,
          storeId: seller.store.id,
        },
      });
      if (hasRequest) {
        throw Boom.badRequest("You already have a request for official store");
      }

      const request = await RequestOfficialStore.model.create({
        description,
        status: RequestOfficialStore.enums.status.process,
        storeId: seller.store.id,
      });

      return res.status(201).json(request);
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
    const { id: sellerId } = req.auth;
    const { id: requestId } = req.params;
    const { description } = req.body;

    try {
      const seller = await User.model.findByPk(sellerId, {
        include: {
          model: Store.model,
          as: "store",
        },
      });
      if (!seller) {
        throw Boom.badRequest("Seller not found");
      } else if (!seller.store) {
        throw Boom.badRequest("Store not found");
      }

      const { process } = RequestOfficialStore.enums.status;

      const request = await RequestOfficialStore.model.findByPk(requestId);
      if (!request) {
        throw Boom.badRequest("Request not found");
      } else if (request.status !== process) {
        throw Boom.badRequest("Request is not in process");
      }

      await request.update({
        description,
      });

      return res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }
);

// Delete
router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { id: requestId } = req.params;

    try {
      const seller = await User.model.findByPk(sellerId, {
        include: {
          model: Store.model,
          as: "store",
        },
      });
      if (!seller) {
        throw Boom.badRequest("Seller not found");
      } else if (!seller.store) {
        throw Boom.badRequest("Store not found");
      }

      const { process } = RequestOfficialStore.enums.status;

      const request = await RequestOfficialStore.model.findByPk(requestId);
      if (!request) {
        throw Boom.badRequest("Request not found");
      } else if (request.status !== process) {
        throw Boom.badRequest("Request is not in process");
      }

      await request.destroy();

      return res.status(201).json({
        message: "Request deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
