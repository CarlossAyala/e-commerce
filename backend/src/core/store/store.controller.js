const StoreQueryBuilder = require('./store.query-builder');
const StoreService = require('./store.service');

const StoreProvider = new StoreService();

// const getOne = async (req, res, next) => {
//   try {
//     const resoure = await BusinessProvider.getOne(req.params.id);

//     res.status(200).json(resoure);
//   } catch (error) {
//     next(error);
//   }
// };

// const getAll = async (req, res, next) => {
//   try {
//     const userId = req.auth.id;
//     const resources = await BusinessProvider.getAll(userId);

//     res.status(200).json(resources);
//   } catch (error) {
//     next(error);
//   }
// };

// const create = async (req, res, next) => {
//   try {
//     const fkUser = req.auth.id;

//     await BusinessProvider.create({ ...req.body, fkUser });

//     res.status(201).json({
//       message: 'Created successfully',
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     await BusinessProvider.remove(req.params.id);

//     res.status(200).end();
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     await BusinessProvider.update(req.params.id, req.body);

//     res.status(200).end();
//   } catch (error) {
//     next(error);
//   }
// };

const getAll = async (req, res, next) => {
  try {
    const queryClauses = new StoreQueryBuilder(req.query)
      .orderBy('name', 'ASC')
      .withPagination()
      .build();
    const resources = await StoreProvider.getAll(queryClauses);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const getOfficialStores = async (req, res, next) => {
  try {
    const resources = await StoreProvider.getOfficialStores();

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const getBestBrands = async (req, res, next) => {
  try {
    const brands = await StoreProvider.getBestBrands();

    const fixedBrands = brands.map((brand) => brand.store.dataValues);

    res.status(200).json(fixedBrands);
  } catch (error) {
    next(error);
  }
};

const getInfoBrand = async (req, res, next) => {
  try {
    const product = await StoreProvider.getInfoBrand(req.params.id);
    const brand = product.dataValues.store;

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

const getCategoriesStore = async (req, res, next) => {
  try {
    const categories = await StoreProvider.getCategoriesStore(req.params.slug);
    // console.log(categories.count.length);
    // console.log(categories.length);

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getProductsStore = async (req, res, next) => {
  try {
    const business = await StoreProvider.getBusinessBySlug(req.params.slug);

    const productClauses = new StoreQueryBuilder(req.query)
      .whereStoreId(business.dataValues.id)
      .isAvailable()
      .conditions()
      .withStock()
      .priceRange()
      .withPagination()
      .sort()
      .build();
    const categoryClauses = new StoreQueryBuilder(req.query)
      .inCategories()
      .build();

    const products = await StoreProvider.getProductsByClauses(
      productClauses,
      categoryClauses
    );

    console.log('Products Clauses', productClauses);
    console.log('Category Clauses', categoryClauses);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getBusinessBySlug = async (req, res, next) => {
  try {
    const business = await StoreProvider.getBusinessBySlug(req.params.slug);

    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // create,
  // getOne,
  // update,
  // remove,
  getAll,
  getOfficialStores,
  getBestBrands,
  getInfoBrand,
  getCategoriesStore,
  getProductsStore,
  getBusinessBySlug,
};
