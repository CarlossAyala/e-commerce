const sequelize = require('../../database/mysql');
const { Business, Product, Category } = require('../../database/mysql/models');

class BusinessService {
  // create({ brand, number, holder, expiration, cvv, fkUser }) {
  //   return Business.model.create({
  //     brand,
  //     number,
  //     holder,
  //     expiration,
  //     cvv,
  //     fkUser,
  //   });
  // }
  // getOne(id) {
  //   return Business.model.findByPk(id);
  // }
  // getAll(id) {
  //   return Business.model.findAll({
  //     where: {
  //       fkUser: id,
  //     },
  //     attributes: {
  //       exclude: ['fkUser'],
  //     },
  //   });
  // }
  // update(id, { brand, number, holder, expiration, cvv }) {
  //   return Business.model.update(
  //     { brand, number, holder, expiration, cvv },
  //     {
  //       where: {
  //         id,
  //       },
  //     }
  //   );
  // }
  // remove(id) {
  //   return Business.model.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  getBusinessBySlug(slug) {
    return Business.model.findOne({
      where: {
        slug,
      },
    });
  }

  existBusinessBySlug(slug) {
    return Business.model.findOne({
      where: {
        slug,
      },
    });
  }

  getOfficialStores() {
    return Business.model.findAll({
      where: {
        official: true,
      },
    });
  }

  getBestBrands() {
    return Product.model.findAll({
      attributes: [
        'businessId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      order: [['n_ventas', 'DESC']],
      group: 'businessId',
      limit: 6,
      include: {
        model: Business.model,
        as: 'business',
      },
    });
  }

  getInfoBrand(id) {
    return Product.model.findOne({
      where: {
        id,
      },
      include: {
        model: Business.model,
        as: 'business',
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
    //       model: Business.model,
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
          model: Business.model,
          as: 'business',
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

module.exports = BusinessService;
