// eslint-disable-next-line no-unused-vars
const express = require("express");

const LIMIT_DEFAULT = 10;
const PAGE_DEFAULT = 1;

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const pagination = async (req, _res, next) => {
  let { page = 1, limit = 10 } = req.query;

  if (page < 1 || Number.isNaN(page || !Number.isInteger(page))) {
    page = PAGE_DEFAULT;
  }
  if (limit % 5 !== 0) {
    limit = LIMIT_DEFAULT;
  }

  req.query.offset = (parseInt(page, 10) - 1) * +limit;
  req.query.limit = limit;

  next();
};

module.exports = pagination;
