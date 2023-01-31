const EcommerceService = require('./ecommerce.service');

const EcommerceProvider = new EcommerceService();

const getOne = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const resoure = await EcommerceProvider.getOne(employeeId);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resoure = await EcommerceProvider.getAll();

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = req.body;

    await EcommerceProvider.create(payload);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateName = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await EcommerceProvider.updateName(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await EcommerceProvider.updateEmail(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await EcommerceProvider.updatePassword(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updateHireDate = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await EcommerceProvider.updatePassword(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const employeeId = req.params.id;

    await EcommerceProvider.remove(employeeId);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  updateName,
  updateEmail,
  updatePassword,
  updateHireDate,
  remove,
};
