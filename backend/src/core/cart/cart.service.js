const { Cart, Product, CartProduct } = require('../../database/mysql/models');

class CartService {
  getOne(id) {
    return CartProduct.model.findByPk(id);
  }

  getCartByCustomerId(customerId) {
    return Cart.model.findOne({
      where: {
        customerId,
      },
    });
  }

  addItem(quantity, cartId, productId) {
    return CartProduct.model.create({
      quantity,
      cartId,
      productId,
    });
  }

  getProductsCart(cartId) {
    return CartProduct.model.findAll({
      attributes: {
        exclude: ['cartId', 'productId'],
      },
      where: {
        cartId,
      },
      include: {
        model: Product.model,
        as: 'product',
      },
    });
  }

  updateItem(id, quantity) {
    return CartProduct.model.update(
      { quantity },
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

  existItem(cartId, productId) {
    return CartProduct.model.findOne({
      where: {
        cartId,
        productId,
      },
    });
  }
}

module.exports = CartService;
