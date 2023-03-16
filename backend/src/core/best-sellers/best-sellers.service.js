const sequelize = require('../../database/mysql');
const { Product, Category } = require('../../database/mysql/models');

class BestSellerService {
  // create({ brand, number, holder, expiration, cvv, fkUser }) {
  //   return Card.model.create({
  //     brand,
  //     number,
  //     holder,
  //     expiration,
  //     cvv,
  //     fkUser,
  //   });
  // }
  // getOne(id) {
  //   return Card.model.findByPk(id);
  // }
  // getAll(id) {
  //   return Card.model.findAll({
  //     where: {
  //       fkUser: id,
  //     },
  //     attributes: {
  //       exclude: ['fkUser'],
  //     },
  //   });
  // }
  // update(id, { brand, number, holder, expiration, cvv }) {
  //   return Card.model.update(
  //     { brand, number, holder, expiration, cvv },
  //     {
  //       where: {
  //         id,
  //       },
  //     }
  //   );
  // }
  // remove(id) {
  //   return Card.model.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // TODO: Cachear getBestCategories y getBestProductsByCategory
  getBestCategories() {
    return Product.model.findAll({
      attributes: [
        'categoryId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      order: [['n_ventas', 'DESC']],
      group: ['categoryId'],
      limit: 10,
      include: {
        model: Category.model,
        as: 'category',
      },
    });
  }

  getBestProductsByCategory(categoryId) {
    return Product.model.findAll({
      where: {
        categoryId,
      },
      order: [['sold', 'DESC']],
      limit: 6,
    });
  }
}

module.exports = BestSellerService;
