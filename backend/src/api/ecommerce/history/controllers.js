const sequelize = require("../../../db/mysql");
const QueryBuilder = require("../../../utils/query-builder");

const HistoryModel = sequelize.model("History");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const history = await HistoryModel.findAndCountAll({
      where: {
        userId,
      },
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductGalleryModel,
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
        userId,
        productId,
      },
    });

    if (!history) {
      await HistoryModel.create({
        userId,
        productId,
      });

      res.json({ message: "History created" });
    } else {
      await history.update({ createdAt: new Date() });

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
        userId,
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
        userId,
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
