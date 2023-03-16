const sequelize = require('../../database/mysql');
const { Business, Product } = require('../../database/mysql/models');

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
}

module.exports = BusinessService;
