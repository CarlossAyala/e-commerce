const CategoryQueryBuilder = require('./category.query-builder');
const CategoryService = require('./category.service');

const CategoryProvider = new CategoryService();

const getAll = async (req, res, next) => {
  try {
    const categories = await CategoryProvider.getAll();

    res.status(200).json(categories);
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

const getCatBySlug = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlugExtend(req.params.cat);

    res.status(200).json(category);
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
    const category = await CategoryProvider.getCatBySlugSimple(req.params.cat);

    if (category.dataValues.parentId) return res.status(200).json(null);

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
    const category = await CategoryProvider.getCatBySlugSimple(req.params.cat);
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
    const category = await CategoryProvider.getCatBySlugSimple(req.params.cat);
    const brands = await CategoryProvider.getBestBrands(category.dataValues.id);

    const fixedBrands = brands.map((brand) => brand.store.dataValues);

    res.status(200).json(fixedBrands);
  } catch (error) {
    next(error);
  }
};

const getCategoryStores = async (req, res, next) => {
  try {
    const cat = await CategoryProvider.getCatBySlugSimple(req.params.cat);
    const stores = await CategoryProvider.getCategoryStores(cat.dataValues.id);

    const cleanUpStores = stores.map((store) => store.business);
    const orderStore = cleanUpStores.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.status(200).json(orderStore);
  } catch (error) {
    next(error);
  }
};

const getCategoryProducts = async (req, res, next) => {
  try {
    const category = await CategoryProvider.getCatBySlugSimple(req.params.cat);

    const queryProduc = new CategoryQueryBuilder(req.query)
      .whereCategoryId(category.dataValues.id)
      .conditions()
      .priceRange()
      .isAvailable()
      .withStock()
      .limitAndOffset()
      .sort()
      .build();
    const queryStore = new CategoryQueryBuilder(req.query)
      .storeNames()
      .officialStores()
      .build();

    console.log('QUERY PARAM', req.query);
    console.log('Product', queryProduc);
    console.log('Business', queryStore);

    const products = await CategoryProvider.getCategoryProducts(
      queryProduc,
      queryStore
    );

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,

  getCatBySlug,
  getBestCategories,
  getBestSubCategories,
  getBestSellers,
  getBestBrands,

  getCategoryStores,
  getCategoryProducts,
};
