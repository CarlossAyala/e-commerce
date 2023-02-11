const {
  User,
  Product,
  Address,
  Card,
  OrderItem,
  PurchaseOrder,
  CardRegister,
  AddressRegister,
  CartItem,
} = require('../../database/mysql/models');

class BuyService {
  getProducts(id) {
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

  getDestination(userId, destinationId) {
    return Address.model.findOne({
      where: {
        id: destinationId,
        fkUser: userId,
      },
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'fkUser'],
      },
    });
  }

  getCreditCard(userId, creditCardId) {
    return Card.model.findOne({
      where: {
        id: creditCardId,
        fkUser: userId,
      },
    });
  }

  getTotalShoppingCart(cartItems) {
    const initialValue = 0;

    const total = cartItems.reduce((accumulator, item) => {
      const priceProduct = +item.price;
      const quantity = item.details.quantity;
      const finalPrice = priceProduct * quantity;

      return accumulator + finalPrice;
    }, initialValue);

    return total;
  }

  registerCard({ brand, number }, transaction) {
    return CardRegister.model.create(
      {
        brand,
        number,
      },
      { transaction }
    );
  }

  registerDestination(destination, transaction) {
    return AddressRegister.model.create(destination, { transaction });
  }

  createPurchaseOrder(
    { total, states, customerId, registerCard, registerDestination },
    transaction
  ) {
    return PurchaseOrder.model.create(
      {
        total,
        states,
        fkCardPayment: registerCard.id,
        fkDestination: registerDestination.id,
        fkCustomer: customerId,
      },
      { transaction }
    );
  }

  async createOrderItems(cartItems, purchaseOrder, transaction) {
    for (const item of cartItems) {
      const price = +item.price;
      const quantity = item.details.quantity;

      await OrderItem.model.create(
        {
          name: item.name,
          quantity,
          price,
          total: price * quantity,
          fkOrder: purchaseOrder.id,
          fkProduct: item.id,
        },
        { transaction }
      );
    }
  }

  clearCartItems(customerId, transaction) {
    return CartItem.model.destroy(
      {
        where: {
          customerId,
        },
      },
      { transaction }
    );
  }
}

module.exports = BuyService;
