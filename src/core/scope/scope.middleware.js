const Boom = require('@hapi/boom');
const ScopeService = require('./scope.service');

const ScopeProvider = new ScopeService();

const scopeExist = async (req, res, next) => {
  try {
    const scopeId = req.params.id;
    const scope = await ScopeProvider.getOne(scopeId);

    if (!scope) return next(Boom.notFound('Scope not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scopeExist,
};
