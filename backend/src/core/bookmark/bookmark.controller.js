const BookmarkService = require('./bookmark.service');
const BookmarkQueryBuilder = require('./bookmark.query-builder');

const BookmarkProvider = new BookmarkService();

const getOne = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    const resource = await BookmarkProvider.getOne(customerId, productId);

    res.status(200).json(resource);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const customerId = req.auth.id;

    const bookmarkClauses = new BookmarkQueryBuilder(req.query)
      .where('customerId', customerId)
      .orderBy('createdAt', 'DESC')
      .withPagination()
      .build();
    const resources = await BookmarkProvider.getAll(bookmarkClauses);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    const [favorite, created] = await BookmarkProvider.findOrCreate(
      customerId,
      productId
    );

    res.status(201).json({ ...favorite.dataValues, created });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    await BookmarkProvider.remove(customerId, productId);

    res.status(200).json({
      message: 'Removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const removeAll = async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    await BookmarkProvider.removeAll(customerId);

    res.status(200).json({
      message: 'All bookmarks removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  create,
  remove,
  removeAll,
};
