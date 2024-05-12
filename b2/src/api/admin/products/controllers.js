const db = require("../../../db/mysql/models");

const ProductModel = db.sequelize.model("Product");

const getCount = async (_req, res, next) => {
  try {
    const count = await ProductModel.count();

    res.json(count);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCount,
};
