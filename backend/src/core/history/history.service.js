const {
  History,
  Product,
  Bookmark,
  CartProduct,
} = require('../../database/mysql/models');

class HistoryService {
  getOne(customerId, productId) {
    return History.model.findOne({
      customerId,
      productId,
    });
  }

  getAll(historyClauses, customerId) {
    return History.model.findAndCountAll({
      ...historyClauses,
      include: [
        {
          model: Product.model,
          as: 'product',
          include: [
            {
              model: Bookmark.model,
              as: 'inBookmark',
              where: {
                customerId,
              },
              required: false,
            },
            {
              model: CartProduct.model,
              as: 'inCart',
              required: false,
            },
          ],
        },
      ],
    });
  }

  existProductHistory(customerId, productId) {
    return History.model.findOne({
      where: {
        customerId,
        productId,
      },
    });
  }

  create(customerId, productId) {
    return History.model.create({
      customerId,
      productId,
    });
  }

  findOrCreate(customerId, productId) {
    return History.model.findOrCreate({
      where: {
        customerId,
        productId,
      },
      defaults: {
        customerId,
        productId,
      },
    });
  }

  remove(customerId, productId) {
    return History.model.destroy({
      where: {
        customerId,
        productId,
      },
    });
  }

  removeAll(customerId) {
    return History.model.destroy({
      where: {
        customerId,
      },
    });
  }

  existProduct(id) {
    return Product.model.findByPk(id);
  }

  updateLastSeen(customerId, productId) {
    return History.model.update(
      {
        lastSeenAt: new Date(),
      },
      {
        where: {
          customerId,
          productId,
        },
      }
    );
  }
}

module.exports = HistoryService;
