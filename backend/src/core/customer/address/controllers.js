// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Address } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} addressId
 */
const validateAddressId = async (req, _res, next, addressId) => {
  const { userId } = req.auth;

  try {
    const address = await Address.model.findByPk(addressId);
    if (!address || address.customerId !== userId) {
      throw notFound("Address not found");
    }

    req.address = address;
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
  const { userId } = req.auth;

  try {
    const addresses = await Address.model.findAll({
      where: {
        customerId: userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(addresses);
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
  const { address } = req;

  try {
    res.json(address);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { body } = req;

  try {
    const address = await Address.model.create({
      ...body,
      customerId: userId,
    });

    res.json(address);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
  const { address } = req;
  const { body } = req;

  try {
    await address.update(body);

    res.json(address);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const remove = async (req, res, next) => {
  const { address } = req;

  try {
    await address.destroy();

    res.json(address);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateAddressId,
  findAll,
  findOne,
  create,
  update,
  remove,
};
