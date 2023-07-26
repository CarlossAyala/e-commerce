const AddressService = require('./address.service');

const AddressProvider = new AddressService();

const getOne = async (req, res, next) => {
  try {
    const address = await AddressProvider.getOne(req.params.id);

    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const addresses = await AddressProvider.getAll(userId);

    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const resource = await AddressProvider.create({
      ...req.body,
      fkUser: req.auth.id,
    });

    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await AddressProvider.remove(req.params.id);

    res.status(200).json({
      message: 'Successfully removed',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    await AddressProvider.update(id, req.body);

    res.status(200).json({
      message: 'Successfully updated',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  create,
  remove,
  update,
};
