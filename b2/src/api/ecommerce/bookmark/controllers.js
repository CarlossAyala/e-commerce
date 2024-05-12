const db = require("../../../db/mysql/models");
const QueryBuilder = require("../../../utils/query-builder");

const BookmarkImage = db.sequelize.model("Bookmark");
const ProductImage = db.sequelize.model("Product");
const ProductImageImage = db.sequelize.model("ProductImage");

const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const bookmarks = await BookmarkModel.findAndCountAll({
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

    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const bookmark = await BookmarkModel.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json(bookmark);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const bookmark = await BookmarkModel.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });
    if (!bookmark) {
      await BookmarkModel.create({
        customerId: userId,
        productId,
      });
    }

    res.json({ message: "Bookmark added" });
  } catch (error) {
    next(error);
  }
};

const clear = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    await BookmarkModel.destroy({
      where: {
        customerId: userId,
      },
    });

    res.json({ message: "Bookmarks cleared" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await BookmarkModel.destroy({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json({ message: "Bookmark removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  clear,
  remove,
};
