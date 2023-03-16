const Boom = require('@hapi/boom');
const CardService = require('./card.service');

const CardProvider = new CardService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await CardProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Card not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
