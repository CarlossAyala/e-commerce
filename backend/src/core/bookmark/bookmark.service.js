const {
  Bookmark,
  Product,
  CartProduct,
} = require('../../database/mysql/models');

class BookmarkService {
  getOne(customerId, productId) {
    return Bookmark.model.findOne({
      where: {
        customerId,
        productId,
      },
    });
  }

  getAll(bookmarkClauses) {
    return Bookmark.model.findAndCountAll({
      ...bookmarkClauses,
      include: {
        model: Product.model,
        as: 'product',
        include: {
          model: CartProduct.model,
          as: 'inCart',
        },
      },
    });
  }

  findOrCreate(customerId, productId) {
    return Bookmark.model.findOrCreate({
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
    return Bookmark.model.destroy({
      where: {
        customerId,
        productId,
      },
    });
  }

  removeAll(customerId) {
    return Bookmark.model.destroy({
      where: {
        customerId,
      },
    });
  }

  existProduct(id) {
    return Product.model.findByPk(id);
  }
}

module.exports = BookmarkService;
