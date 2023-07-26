const Boom = require('@hapi/boom');
const CategoryService = require('./category.service');

const CategoryProvider = new CategoryService();

const categoryExist = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getOne(req.params.id);

    if (!category) return next(Boom.notFound('Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

// News
const existCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.existCatBySlug(req.params.cat);

    if (!category) return next(Boom.notFound('Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryExist,
  existCatBySlug,
};
