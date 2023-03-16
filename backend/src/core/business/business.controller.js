const BusinessService = require('./business.service');

const BusinessProvider = new BusinessService();

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

const getOfficialStores = async (req, res, next) => {
  try {
    const resources = await BusinessProvider.getOfficialStores();

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const getBestBrands = async (req, res, next) => {
  try {
    const brands = await BusinessProvider.getBestBrands();

    const fixedBrands = brands.map((brand) => brand.business.dataValues);

    res.status(200).json(fixedBrands);
  } catch (error) {
    next(error);
  }
};

const getInfoBrand = async (req, res, next) => {
  try {
    const product = await BusinessProvider.getInfoBrand(req.params.id);
    const brand = product.dataValues.business;

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // create,
  // getOne,
  // getAll,
  // update,
  // remove,
  getOfficialStores,
  getBestBrands,
  getInfoBrand,
};
