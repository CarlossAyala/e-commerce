const { Cart, User, Product } = require('../../database/mysql/models');

class CartService {
  getOne(id) {
    return Cart.model.findByPk(id);
  }

  addProduct({ quantity, customerId, productId }) {
    return Cart.model.create({
      quantity,
      customerId,
      productId,
    });
  }

  getCart(id) {
    return User.model.findAll({
      where: {
        id,
      },
      attributes: ['id'],
      include: {
        model: Product.model,
        as: 'cart',
        through: {
          as: 'details',
          attributes: ['id', 'quantity'],
        },
        attributes: ['id', 'name', 'price', 'available', 'stock'],
      },
    });
  }

  updateProduct(id, quantity) {
    return Cart.model.update(
      { quantity },
      {
        where: {
          id,
        },
      }
    );
  }

  removeProduct(id) {
    return Cart.model.destroy({
      where: {
        id,
      },
    });
  }

  clearCart(id) {
    return Cart.model.destroy({
      where: {
        customerId: id,
      },
    });
  }
}

module.exports = CartService;
