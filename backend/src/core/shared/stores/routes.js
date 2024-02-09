const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");
const { Store } = require("../../../database/mysql/models");

router.get(
  "/:id/by-id",
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: storeId } = req.params;

    try {
      const store = await Store.model.findByPk(storeId);
      if (!store) {
        throw Boom.badRequest("Store not found");
      }

      return res.json(store);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
