const BestSellerService = require('./best-sellers.service');

const BestSellerProvider = new BestSellerService();

const getBestSellers = async (req, res, next) => {
  try {
    const bestCategories = await BestSellerProvider.getBestCategories();

    // console.log(bestCategories);

    const bestProducts = [];
    for (const category of bestCategories) {
      const products = await BestSellerProvider.getBestProductsByCategory(
        category.categoryId
      );

      bestProducts.push({
        category: category.category.dataValues,
        products,
      });
    }

    res.status(200).json(bestProducts);
  } catch (error) {
    next(error);
  }
};

// const getOne = async (req, res, next) => {
//   try {
//     const resoure = await BestSellerProvider.getOne(req.params.id);

//     res.status(200).json(resoure);
//   } catch (error) {
//     next(error);
//   }
// };

// const getAll = async (req, res, next) => {
//   try {
//     const userId = req.auth.id;
//     const resources = await BestSellerProvider.getAll(userId);

//     res.status(200).json(resources);
//   } catch (error) {
//     next(error);
//   }
// };

// const create = async (req, res, next) => {
//   try {
//     const fkUser = req.auth.id;

//     await BestSellerProvider.create({ ...req.body, fkUser });

//     res.status(201).json({
//       message: 'Created successfully',
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     await BestSellerProvider.remove(req.params.id);

//     res.status(200).end();
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     await BestSellerProvider.update(req.params.id, req.body);

//     res.status(200).end();
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getBestSellers,
};
