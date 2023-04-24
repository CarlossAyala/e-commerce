const sequelize = require('../../database/mysql');
const { Store, Product, Category } = require('../../database/mysql/models');

class StoreService {
  // create({ brand, number, holder, expiration, cvv, fkUser }) {
  //   return Store.model.create({
  //     brand,
  //     number,
  //     holder,
  //     expiration,
  //     cvv,
  //     fkUser,
  //   });
  // }
  // getOne(id) {
  //   return Store.model.findByPk(id);
  // }
  // getAll(id) {
  //   return Store.model.findAll({
  //     where: {
  //       fkUser: id,
  //     },
  //     attributes: {
  //       exclude: ['fkUser'],
  //     },
  //   });
  // }
  // update(id, { brand, number, holder, expiration, cvv }) {
  //   return Store.model.update(
  //     { brand, number, holder, expiration, cvv },
  //     {
  //       where: {
  //         id,
  //       },
  //     }
  //   );
  // }
  // remove(id) {
  //   return Store.model.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  getAll(clauses) {
    return Store.model.findAndCountAll({
      ...clauses,
    });
  }

  getBusinessBySlug(slug) {
    return Store.model.findOne({
      where: {
        slug,
      },
    });
  }

  existBusinessBySlug(slug) {
    return Store.model.findOne({
      where: {
        slug,
      },
    });
  }

  getOfficialStores() {
    return Store.model.findAll({
      where: {
        official: true,
      },
    });
  }

  getBestBrands() {
    return Product.model.findAll({
      attributes: [
        'storeId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      order: [['n_ventas', 'DESC']],
      group: 'storeId',
      limit: 6,
      include: {
        model: Store.model,
        as: 'store',
      },
    });
  }

  getInfoBrand(id) {
    return Product.model.findOne({
      where: {
        id,
      },
      include: {
        model: Store.model,
        as: 'store',
        attributes: {
          exclude: ['userId'],
        },
      },
    });
  }

  getCategoriesStore(slug) {
    // return Product.model.findAndCountAll({
    //   attributes: ['categoryId', 'businessId'],
    //   group: ['categoryId', 'businessId'],
    //   include: [
    //     {
    //       model: Store.model,
    //       as: 'business',
    //       where: {
    //         slug,
    //       },
    //     },
    //     {
    //       model: Category.model,
    //       as: 'category',
    //     },
    //   ],
    // });
    return Category.model.findAll({
      include: {
        model: Product.model,
        as: 'products',
        group: 'categoryId',
        attributes: [],
        include: {
          model: Store.model,
          as: 'store',
          where: {
            slug,
          },
        },
      },
    });
  }

  getProductsByClauses(productClauses, categoryClauses) {
    return Product.model.findAndCountAll({
      ...productClauses,
      include: {
        model: Category.model,
        as: 'category',
        attributes: [],
        ...categoryClauses,
      },
    });
  }
}

module.exports = StoreService;
