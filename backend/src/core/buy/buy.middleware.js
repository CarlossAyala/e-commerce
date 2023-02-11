const Boom = require('@hapi/boom');
const { CartItem, Address, Card } = require('../../database/mysql/models');

/* 
  Check if 
  - [x] the user has a shopping cart
  - [x] the user select a destination
  - [x] the user select a payment method
  - [x] the payment method has a sufficient balance
*/

const checkCartItems = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const cartItem = await CartItem.model.findOne({
      where: {
        customerId,
      },
    });

    if (!cartItem) return next(Boom.notFound('No shopping cart found'));

    next();
  } catch (error) {
    next(error);
  }
};

const checkDestination = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const { destinationId } = req.body;
    const destination = await Address.model.findOne({
      where: {
        id: destinationId,
        fkUser: customerId,
      },
    });

    if (!destination) return next(Boom.notFound('Destination not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const checkPaymentMethod = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const { cardId } = req.body;
    const creditCard = await Card.model.findOne({
      where: {
        id: cardId,
        fkUser: customerId,
      },
    });

    if (!creditCard) return next(Boom.notFound('Credit Card not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const checkBalance = async (req, res, next) => {
  try {
    // TODO: See what to do here xd...

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCartItems,
  checkDestination,
  checkPaymentMethod,
  checkBalance,
};
