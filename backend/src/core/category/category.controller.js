const CategoryService = require('./category.service');

const CategoryProvider = new CategoryService();

const getOne = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getOneExtended(req.params.id);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const categories = await CategoryProvider.getAll();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlug(req.params.cat);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const getSubCatBySlug = async (req, res, next) => {
  try {
    const subCategory = await CategoryProvider.getSubCatBySlug(
      req.params.subCat
    );

    res.status(200).json(subCategory);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await CategoryProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await CategoryProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    await CategoryProvider.update(id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const getBestCategories = async (req, res, next) => {
  try {
    const categories = await CategoryProvider.getBestCategories();

    const fixedCategories = categories.map((cat) => cat.category.dataValues);

    res.status(200).json(fixedCategories);
  } catch (error) {
    next(error);
  }
};

const getBestSubCategories = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getParentCatBySlug(req.params.cat);
    const subCategories = await CategoryProvider.getBestSubCategories(
      category.dataValues.id
    );

    const fixedCategories = subCategories.map((cat) => cat.category.dataValues);

    res.status(200).json(fixedCategories);
  } catch (error) {
    next(error);
  }
};

// News
const getBestSellers = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlug(req.params.cat);
    const products = await CategoryProvider.getBestSellers(
      category.dataValues.id
    );

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getBestBrands = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlug(req.params.cat);
    const brands = await CategoryProvider.getBestBrands(category.dataValues.id);

    const fixedBrands = brands.map((brand) => brand.business.dataValues);

    res.status(200).json(fixedBrands);
  } catch (error) {
    next(error);
  }
};

const getInfoParentCat = async (req, res, next) => {
  try {
    const cat = await CategoryProvider.getInfoParentCat(req.params.cat);

    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
};

const getInfoChildrenCat = async (req, res, next) => {
  try {
    const cat = await CategoryProvider.getCatBySlug(req.params.cat);
    const subCat = await CategoryProvider.getCatBySlug(req.params.subCat);

    res.status(200).json({
      cat,
      subCat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  getCatBySlug,
  getSubCatBySlug,
  create,
  remove,
  update,

  getBestCategories,
  getBestSubCategories,
  getBestSellers,
  getBestBrands,
  getInfoParentCat,
  getInfoChildrenCat,
};
