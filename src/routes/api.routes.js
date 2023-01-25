const express = require('express');

const accountRoutes = require('../core/account/account.routes');
const userRoutes = require('../core/user/user.routes');
const addressRoutes = require('../core/address/address.routes');
const cardRoutes = require('../core/card/card.routes');
const categoryRoutes = require('../core/category/category.routes');
const roleRoutes = require('../core/role/role.routes');
const scopeRoutes = require('../core/scope/scope.routes');
const permissionRoutes = require('../core/permission/permission.routes');
const productRoutes = require('../core/product/product.routes');
const employeeRoutes = require('../core/employee/employee.routes');
const movementTypeRoutes = require('../core/movement-type/movement-type.routes');
const chargeCategoryRoutes = require('../core/charge-category/charge-category.routes');
const chargeRoutes = require('../core/charge/charge.routes');
const cartItemRoutes = require('../core/cart-item/cart-item.routes');
const buyRoutes = require('../core/buy/buy.routes');

function router(app) {
  const routes = express.Router();
  const checkout = express.Router();

  app.use('/api/v1', routes);
  routes.use('/checkout', checkout);

  routes.use('/accounts', accountRoutes);
  routes.use('/users', userRoutes);
  routes.use('/addresses', addressRoutes);
  routes.use('/cards', cardRoutes);
  routes.use('/categories', categoryRoutes);

  // Security
  routes.use('/roles', roleRoutes);
  routes.use('/scopes', scopeRoutes);
  routes.use('/permissions', permissionRoutes);
  routes.use('/employees', employeeRoutes);

  // Products
  routes.use('/products', productRoutes);

  // Transactions and recharges
  routes.use('/movement-types', movementTypeRoutes);
  routes.use('/charge-categories', chargeCategoryRoutes);
  routes.use('/charges', chargeRoutes);

  // Shopping Cart
  routes.use('/cart-items', cartItemRoutes);

  // Checkout's
  checkout.use('/buying', buyRoutes);
}

module.exports = router;
