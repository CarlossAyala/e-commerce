const {
  Cart,
  Product,
  CartProduct,
  Bookmark,
} = require('../../database/mysql/models');

class CartService {
  getOne(id) {
    return CartProduct.model.findByPk(id);
  }

  getOneExtended(id) {
    return CartProduct.model.findOne({
      where: {
        id,
      },
      include: {
        model: Product.model,
        as: 'product',
      },
    });
  }

  getCartByCustomerId(customerId) {
    return Cart.model.findOne({
      where: {
        customerId,
      },
    });
  }

  getProductsCart(cartId) {
    return CartProduct.model.findAll({
      where: {
        cartId,
      },
      include: {
        model: Product.model,
        as: 'product',
        include: {
          model: Bookmark.model,
          as: 'inBookmark',
          required: false,
        },
      },
    });
  }

  updateQuantity(id, quantity) {
    return CartProduct.model.update(
      { quantity },
      {
        where: {
          id,
        },
      }
    );
  }

  updateVisible(id, visible) {
    return CartProduct.model.update(
      { visible },
      {
        where: {
          id,
        },
      }
    );
  }

  removeItem(id) {
    return CartProduct.model.destroy({
      where: {
        id,
      },
    });
  }

  clearCart(id) {
    return CartProduct.model.destroy({
      where: {
        cartId: id,
      },
    });
  }

  findOrCreateItem(cartId, productId, quantity) {
    return CartProduct.model.findOrCreate({
      where: {
        cartId,
        productId,
      },
      include: {
        model: Product.model,
        as: 'product',
      },
      defaults: {
        cartId,
        productId,
        quantity,
      },
    });
  }
}

module.exports = CartService;
