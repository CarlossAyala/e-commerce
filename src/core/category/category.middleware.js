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

const parentCategoryExist = async (req, res, next) => {
  try {
    const parentCategory = await CategoryProvider.getOne(req.body.parentId);

    if (!parentCategory)
      return next(Boom.notFound('Parent category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryExist,
  parentCategoryExist,
};
