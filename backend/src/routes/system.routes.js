const express = require('express');
const systemCore = express.Router();
const API = express.Router();
const product = require('../core/system/product/product.routes');

systemCore.use('/api', API);

API.use('/products', product);

module.exports = systemCore;
