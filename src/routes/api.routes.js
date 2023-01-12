const express = require('express');

const accountRoutes = require('../core/account/account.routes');
const userRoutes = require('../core/user/user.routes');
const addressRoutes = require('../core/address/address.routes');
const cardRoutes = require('../core/card/card.routes');
const categoryRoutes = require('../core/category/category.routes');
const roleRoutes = require('../core/role/role.routes');
const scopeRoutes = require('../core/scope/scope.routes');
const permissionRoutes = require('../core/permission/permission.routes');

function router(app) {
  const routes = express.Router();

  app.use('/api/v1', routes);

  routes.use('/accounts', accountRoutes);
  routes.use('/users', userRoutes);
  routes.use('/addresses', addressRoutes);
  routes.use('/cards', cardRoutes);
  routes.use('/categories', categoryRoutes);
  routes.use('/roles', roleRoutes);
  routes.use('/scopes', scopeRoutes);
  routes.use('/permissions', permissionRoutes);
}

module.exports = router;
