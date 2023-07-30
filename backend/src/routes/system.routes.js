const express = require('express');
const systemCore = express.Router();
const API = express.Router();

const product = require('../core/system/product/product.routes');
const category = require('../core/system/category/category.routes');
const store = require('../core/system/store/store.routes');

systemCore.use('/api', API);

API.use('/products', product);
API.use('/categories', category);
API.use('/stores', store);

module.exports = systemCore;
