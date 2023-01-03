const Boom = require('@hapi/boom');
const AddressService = require('./address.service');

const AddressProvider = new AddressService();

const addressExist = async (req, res, next) => {
  try {
    const address = await AddressProvider.getOne(req.params.id);

    if (!address) return next(Boom.notFound('Address not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addressExist,
};
