const Boom = require('@hapi/boom');
const CardService = require('./card.service');

const CardProvider = new CardService();

const cardExist = async (req, res, next) => {
  try {
    const card = await CardProvider.getOne(req.params.id);

    if (!card) return next(Boom.notFound('Card not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cardExist,
};
