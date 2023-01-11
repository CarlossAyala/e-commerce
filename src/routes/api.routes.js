const express = require('express');

const accountRoutes = require('../core/account/account.routes');
const userRoutes = require('../core/user/user.routes');
// const permissionRoutes = require('../core/permission/permission.routes');
const addressRoutes = require('../core/address/address.routes');
const cardRoutes = require('../core/card/card.routes');
const categoryRoutes = require('../core/category/category.routes');
const roleRoutes = require('../core/role/role.routes');
const scopeRoutes = require('../core/scope/scope.routes');

function router(app) {
  const routes = express.Router();

  app.use('/api/v1', routes);

  routes.use('/account', accountRoutes);
  routes.use('/user', userRoutes);
  // routes.use('/permission', permissionRoutes);
  routes.use('/address', addressRoutes);
  routes.use('/card', cardRoutes);
  routes.use('/category', categoryRoutes);
  routes.use('/role', roleRoutes);
  routes.use('/scope', scopeRoutes);
}

module.exports = router;
