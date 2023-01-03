const ScopeService = require('./scope.service');

const ScopeProvider = new ScopeService();

const create = async (req, res, next) => {
  try {
    await ScopeProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const scope = await ScopeProvider.getOne(req.params.id);

    res.status(200).json(scope);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const scopes = await ScopeProvider.getAll();

    res.status(200).json(scopes);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ScopeProvider.update(id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await ScopeProvider.remove(req.params.id);

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
