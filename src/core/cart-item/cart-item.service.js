const { CartItem, User, Product } = require('../../database/mysql/models');

class CartItemService {
  getOne(id) {
    return CartItem.model.findByPk(id);
  }

  addProduct({ quantity, customerId, productId }) {
    return CartItem.model.create({
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
        attributes: ['id', 'name', 'price', 'available'],
      },
    });
  }

  updateProduct(id, quantity) {
    return CartItem.model.update(
      { quantity },
      {
        where: {
          id,
        },
      }
    );
  }

  removeProduct(id) {
    return CartItem.model.destroy({
      where: {
        id,
      },
    });
  }

  clearCart(id) {
    return CartItem.model.destroy({
      where: {
        customerId: id,
      },
    });
  }
}

module.exports = CartItemService;
