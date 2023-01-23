const { CartItem } = require('../../database/mysql/models');

class CartItemService {
  getOne(id) {
    return CartItem.model.findByPk(id);
  }

  addProduct({ quantity, fkCustomer, fkProduct }) {
    return CartItem.model.create({
      quantity,
      fkCustomer,
      fkProduct,
    });
  }

  getCart(id) {
    return CartItem.model.findAll({
      where: {
        fkCustomer: id,
      },
      attributes: {
        exclude: ['fkCustomer'],
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
        fkCustomer: id,
      },
    });
  }
}

module.exports = CartItemService;
