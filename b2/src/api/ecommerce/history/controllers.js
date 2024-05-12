const db = require("../../../db/mysql/models");
const QueryBuilder = require("../../../utils/query-builder");

const HistoryModel = db.sequelize.model("History");
const ProductModel = db.sequelize.model("Product");
const ProductImageModel = db.sequelize.model("ProductImage");

const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("lastSeenAt", "DESC")
    .pagination()
    .build();

  try {
    const history = await HistoryModel.findAndCountAll({
      where: {
        customerId: userId,
      },
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductImageModel,
          as: "gallery",
          separate: true,
          order: [["order", "ASC"]],
          required: false,
        },
      },
      order,
      limit,
      offset,
    });

    res.json(history);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const history = await HistoryModel.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });

    if (!history) {
      await HistoryModel.create({
        customerId: userId,
        productId,
      });

      res.json({ message: "History created" });
    } else {
      await history.update({ lastSeenAt: new Date() });

      res.json({ message: "History updated" });
    }
  } catch (error) {
    next(error);
  }
};

const clear = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    await HistoryModel.destroy({
      where: {
        customerId: userId,
      },
    });

    res.json({ message: "History cleared" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await HistoryModel.destroy({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json({ message: "History removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  create,
  clear,
  remove,
};
