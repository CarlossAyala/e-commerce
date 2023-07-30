const express = require('express');
const seller = express.Router();
const API = express.Router();

const product = require('../core/seller/product/product.routes');
const store = require('../core/seller/store/store.routes');
const question = require('../core/seller/question/question.routes');
const category = require('../core/seller/category/category.routes');

seller.use('/api', API);

// API Routes
API.use('/products', product);
API.use('/stores', store);
API.use('/questions', question);
API.use('/categories', category);

module.exports = seller;
