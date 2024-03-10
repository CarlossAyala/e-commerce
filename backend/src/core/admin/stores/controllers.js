// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const {
  Store,
  RequestOfficialStore,
  User,
} = require("../../../database/mysql/models");
const { notFound, badRequest } = require("../../../middlewares");
const sequelize = require("../../../database/mysql/connection");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} storeId
 */
const validateStoreId = async (req, _res, next, storeId) => {
  try {
    const store = await Store.model.findByPk(storeId, {
      include: {
        model: User.model,
        as: "seller",
      },
    });
    if (!store) {
      throw notFound("Store not found");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} requestId
 */
const validateRequestId = async (req, _res, next, requestId) => {
  try {
    const request = await RequestOfficialStore.model.findByPk(requestId, {
      include: {
        model: Store.model,
        as: "store",
      },
    });
    if (!request) {
      throw notFound("Request not found");
    }

    req.request = request;
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
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .where("official", req.query.official === "yes" ? true : null)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const stores = await Store.model.findAndCountAll({
      ...qb,
      include: {
        model: User.model,
        as: "seller",
      },
    });

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findOne = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAllRequestsVerify = async (req, res, next) => {
  const { status } = RequestOfficialStore.enums;

  let _status = req.query.status;
  if (!Object.values(status).includes(_status)) {
    _status = null;
  }

  const { where: whereRequest } = new QueryBuilder()
    .where("status", _status)
    .build();
  const { where: whereStore } = new QueryBuilder()
    .whereLike("name", req.query.q)
    .build();

  const { limit, offset, order } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const requests = await RequestOfficialStore.model.findAndCountAll({
      where: whereRequest,
      include: {
        model: Store.model,
        as: "store",
        where: whereStore,
      },
      order,
      limit,
      offset,
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateRequestVerify = async (req, res, next) => {
  const { request } = req;
  const { status, response } = req.body;

  const { approved, queue } = RequestOfficialStore.enums.status;

  try {
    if (request.status !== queue) {
      throw badRequest("Request not in queue");
    }

    await sequelize.transaction(async (t) => {
      if (status === approved) {
        await Store.model.update(
          { official: true },
          { where: { id: request.storeId }, transaction: t }
        );
      }

      await request.update({
        status,
        response,
      });
    });

    res.json(request);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateStoreId,
  validateRequestId,
  findAll,
  findOne,
  findAllRequestsVerify,
  updateRequestVerify,
};
