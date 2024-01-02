const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Address } = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./address.schema");
const { QueryBuilder } = require("../../../libs");

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const qb = new QueryBuilder(req.query)
    .where("customerId", customerId)
    .whereLike("name", req.query.q)
    .orderBy("createdAt", "ASC")
    .build();

  try {
    const addresses = await Address.model.findAll(qb);

    return res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
});

// Get One
router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;

    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound("Address not found"));

      return res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Create
router.post(
  "/",
  JWT.verify,
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    try {
      const customerId = req.auth.id;
      const { body } = req;

      const address = await Address.model.create({
        ...body,
        customerId,
      });

      return res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Update
router.put(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.base, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;

    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound("Address not found"));

      await address.update(req.body);

      return res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Delete
router.delete(
  "/:id",
  JWT.verify,
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;
    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound("Address not found"));

      await address.destroy();

      return res.status(200).json({
        message: "Address deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
