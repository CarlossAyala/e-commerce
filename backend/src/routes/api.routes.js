const express = require('express');

const accountRoutes = require('../core/account/account.routes');
const userRoutes = require('../core/user/user.routes');
const addressRoutes = require('../core/address/address.routes');
const cardRoutes = require('../core/card/card.routes');
const categoryRoutes = require('../core/category/category.routes');
const roleRoutes = require('../core/role/role.routes');
const productRoutes = require('../core/product/product.routes');
const employeeRoutes = require('../core/employee/employee.routes');
const movementTypeRoutes = require('../core/movement-type/movement-type.routes');
const chargeCategoryRoutes = require('../core/charge-category/charge-category.routes');
const chargeRoutes = require('../core/charge/charge.routes');
const cartRoutes = require('../core/cart/cart.routes');
// const cartProductRoutes = require('../core/cart-product/cart-product.routes');
const buyRoutes = require('../core/buy/buy.routes');
const purchaseOrderRoutes = require('../core/purchase-order/purchase-order.routes');
const reviewRoutes = require('../core/review/review.routes');
const questionRoutes = require('../core/question/question.routes');
const answerRoutes = require('../core/answer/answer.routes');
const employeeRoleRoutes = require('../core/employee-role/employee-role.routes');
const bestSellerRoutes = require('../core/best-sellers/best-sellers.routes');
const businessRoutes = require('../core/business/business.routes');

function router(app) {
  const routes = express.Router();
  const checkout = express.Router();

  app.use('/api/v1', routes);
  routes.use('/checkout', checkout);

  routes.use('/account', accountRoutes);
  routes.use('/users', userRoutes);
  routes.use('/addresses', addressRoutes);
  routes.use('/cards', cardRoutes);
  routes.use('/categories', categoryRoutes);

  // Security
  routes.use('/roles', roleRoutes);
  routes.use('/employees', employeeRoutes);
  routes.use('/employees-roles', employeeRoleRoutes);

  // Products
  routes.use('/products', productRoutes);

  // Business
  routes.use('/businesses', businessRoutes);

  // Categories and Products
  routes.use('/best-sellers', bestSellerRoutes);

  // Transactions and recharges
  routes.use('/movement-types', movementTypeRoutes);
  routes.use('/charge-categories', chargeCategoryRoutes);
  routes.use('/charges', chargeRoutes);

  // Cart
  routes.use('/cart', cartRoutes);

  // Cart-Product
  // routes.use('/cart-product', cartProductRoutes);

  // Checkout's
  checkout.use('/buying', buyRoutes);

  // Purchase Order
  routes.use('/purchase-orders', purchaseOrderRoutes);

  // Review
  routes.use('/reviews', reviewRoutes);

  // Questions and Answers
  routes.use('/questions', questionRoutes);
  routes.use('/answers', answerRoutes);
}

module.exports = router;
