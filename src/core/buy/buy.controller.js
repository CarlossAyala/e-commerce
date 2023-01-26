const sequelize = require('../../database/mysql');
const { PurchaseOrder } = require('../../database/mysql/models');
const BuyService = require('./buy.service');

const BuyProvider = new BuyService();

/*
  - producto y cantidad
  - lugar de entrega (domicilio)
  - pago del producto(seleccionar tarjeta)
  - confirmar pago
*/

const buy = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const { destinationId, cardId } = req.body;

    // Get Cart Items
    const cartItems = await BuyProvider.getProducts(customerId);
    const shoppingCart = cartItems.at(0).cart;
    const totalCartItems = BuyProvider.getTotalShoppingCart(shoppingCart);

    // Get Destination
    const destination = await BuyProvider.getDestination(
      customerId,
      destinationId
    );

    // Get Payment Method (credit card)
    const creditCart = await BuyProvider.getCreditCard(customerId, cardId);

    // Transaction Implementation
    await sequelize.transaction(async (t) => {
      // Register Payment Method (credit card)
      const registerCard = await BuyProvider.registerCard(creditCart, t);
      // Register Destination
      const registerDestination = await BuyProvider.registerDestination(
        destination,
        t
      );

      // Create Purchase Order
      const states = PurchaseOrder.enums.realized;
      const purchaseOrder = await BuyProvider.createPurchaseOrder(
        {
          total: totalCartItems,
          states,
          customerId,
          registerCard,
          registerDestination,
        },
        t
      );

      // Create Order-Items
      await BuyProvider.createOrderItems(shoppingCart, purchaseOrder, t);

      // Clear Cart Items
      await BuyProvider.clearCartItems(customerId, t);

      res.status(201).json({
        message: 'Created successfully',
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buy,
};
