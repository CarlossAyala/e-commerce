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

const catSlugExist = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlug(req.params.cat);

    if (!category) return next(Boom.notFound('Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const catAndSubCatBySlugExist = async (req, res, next) => {
  try {
    const { cat, subCat } = req.params;

    // TODO: getCatBySlug tiene includes que son inncesarios aqui
    const parentCategory = await CategoryProvider.getCatBySlug(cat);
    const subCategory = await CategoryProvider.getSubCatByParentId(
      parentCategory.id,
      subCat
    );

    if (!subCategory) return next(Boom.notFound('Sub-Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

// News
const existCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlug(req.params.cat);

    if (!category) return next(Boom.notFound('Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const existParentCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getParentCatBySlug(req.params.cat);

    if (!category) return next(Boom.notFound('Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const existChildrenCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getChildrenCatBySlug(
      req.params.subCat
    );

    if (!category) return next(Boom.notFound('Sub-Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryExist,
  parentCategoryExist,
  catSlugExist,
  catAndSubCatBySlugExist,

  existCatBySlug,
  existParentCatBySlug,
  existChildrenCatBySlug,
};
