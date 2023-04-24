const express = require('express');

const accountRoutes = require('../core/account/account.routes');
const userRoutes = require('../core/user/user.routes');
const addressRoutes = require('../core/address/address.routes');
const cardRoutes = require('../core/card/card.routes');
const categoryRoutes = require('../core/category/category.routes');
const roleRoutes = require('../core/role/role.routes');
const productRoutes = require('../core/product/product.routes');
const employeeRoutes = require('../core/employee/employee.routes');
const cartRoutes = require('../core/cart/cart.routes');
const buyRoutes = require('../core/buy/buy.routes');
const purchaseOrderRoutes = require('../core/purchase-order/purchase-order.routes');
const reviewRoutes = require('../core/review/review.routes');
const questionRoutes = require('../core/question/question.routes');
const answerRoutes = require('../core/answer/answer.routes');
const employeeRoleRoutes = require('../core/employee-role/employee-role.routes');
const storesRoutes = require('../core/store/store.routes');
const bookmarkRoutes = require('../core/bookmark/bookmark.routes');
const historyRoutes = require('../core/history/history.routes');

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
  routes.use('/stores', storesRoutes);

  // Bookmarks
  routes.use('/bookmarks', bookmarkRoutes);

  // History
  routes.use('/history', historyRoutes);

  // Cart
  routes.use('/cart', cartRoutes);

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
