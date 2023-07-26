const express = require('express');
const customerCore = express.Router();
const API = express.Router();

const question = require('../core/customer/question/question.routes');
const cart = require('../core/customer/cart/cart.routes');
const bookmark = require('../core/customer/bookmark/bookmark.routes');
const address = require('../core/customer/address/address.routes');
const order = require('../core/customer/order/order.routes');

// TODO: Re-hacer
const accountRoutes = require('../core/customer-v0/account/account.routes');

customerCore.use('/api', API);

// API Routes
API.use('/account', accountRoutes);
API.use('/questions', question);
API.use('/cart', cart);
API.use('/bookmarks', bookmark);
API.use('/addresses', address);
API.use('/orders', order);

module.exports = customerCore;

// const express = require('express');

// const userRoutes = require('../core-customer-v0/user/user.routes');
// const addressRoutes = require('../core-customer-v0/address/address.routes');
// const cardRoutes = require('../core-customer-v0/card/card.routes');
// const categoryRoutes = require('../core-customer-v0/category/category.routes');
// const productRoutes = require('../core-customer-v0/product/product.routes');
// const employeeRoutes = require('../core-customer-v0/employee/employee.routes');
// const cartRoutes = require('../core-customer-v0/cart/cart.routes');
// const buyRoutes = require('../core-customer-v0/buy/buy.routes');
// const purchaseOrderRoutes = require('../core-customer-v0/purchase-order/purchase-order.routes');
// const reviewRoutes = require('../core-customer-v0/review/review.routes');
// const questionRoutes = require('../core-customer-v0/question/question.routes');
// const answerRoutes = require('../core-customer-v0/answer/answer.routes');
// const employeeRoleRoutes = require('../core-customer-v0/employee-role/employee-role.routes');
// const storesRoutes = require('../core-customer-v0/store/store.routes');
// const bookmarkRoutes = require('../core-customer-v0/bookmark/bookmark.routes');
// const historyRoutes = require('../core-customer-v0/history/history.routes');

// const customerCore = express.Router();
// const checkout = express.Router();

// customerCore.use('/api', customerCore);
// customerCore.use('/checkout', checkout);

// customerCore.use('/account', accountRoutes);
// customerCore.use('/users', userRoutes);
// customerCore.use('/addresses', addressRoutes);
// customerCore.use('/cards', cardRoutes);
// customerCore.use('/categories', categoryRoutes);

// // Security
// customerCore.use('/employees', employeeRoutes);
// customerCore.use('/employees-roles', employeeRoleRoutes);

// // Products
// customerCore.use('/products', productRoutes);

// // Business
// customerCore.use('/stores', storesRoutes);

// // Bookmarks
// customerCore.use('/bookmarks', bookmarkRoutes);

// // History
// customerCore.use('/history', historyRoutes);

// // Cart
// customerCore.use('/cart', cartRoutes);

// // Checkout's
// checkout.use('/buying', buyRoutes);

// // Purchase Order
// customerCore.use('/purchase-orders', purchaseOrderRoutes);

// // Review
// customerCore.use('/reviews', reviewRoutes);

// // Questions and Answers
// customerCore.use('/questions', questionRoutes);
// customerCore.use('/answers', answerRoutes);

// module.exports = customerCore;
