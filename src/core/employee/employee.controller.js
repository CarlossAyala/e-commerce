const EmployeeService = require('./employee.service');

const EmployeeProvider = new EmployeeService();

const getOne = async (req, res, next) => {
  try {
    const resoure = await EmployeeProvider.getOne(req.params.id);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resources = await EmployeeProvider.getAll();

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await EmployeeProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await EmployeeProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await EmployeeProvider.update(req.params.id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
};
