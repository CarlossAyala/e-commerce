const StoreService = require('./store.service');

const StoreProvider = new StoreService();

const getOne = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const resoure = await StoreProvider.getOne(employeeId);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const business = await StoreProvider.getOne(employeeId);

    const resoure = await StoreProvider.getAll(business.businessId);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const employeeId = req.auth.id;

    const employee = await StoreProvider.getOne(employeeId);
    const businessId = employee.dataValues.businessId;

    const payload = {
      ...req.body,
      businessId,
    };

    await StoreProvider.create(payload);

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

    await StoreProvider.updateName(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await StoreProvider.updateEmail(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await StoreProvider.updatePassword(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updateHireDate = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const payload = req.body;

    await StoreProvider.updatePassword(employeeId, payload);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const employeeId = req.params.id;

    await StoreProvider.remove(employeeId);

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
