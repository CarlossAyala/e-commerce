const sequelize = require("../../../db/mysql");
const QueryBuilder = require("../../../utils/query-builder");

const BookmarkModel = sequelize.model("Bookmark");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");

const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const bookmarks = await BookmarkModel.findAndCountAll({
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
        userId,
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
        userId,
        productId,
      },
    });
    if (!bookmark) {
      await BookmarkModel.create({
        userId,
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
        userId,
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
        userId,
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
