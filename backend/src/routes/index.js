const express = require('express');
const APIHub = express.Router();
const customerRoutes = require('./customer.routes');
const sellerRoutes = require('./seller.routes');
const systemRoutes = require('./system.routes');
const strapiRoutes = require('./strapi.routes');

APIHub.use('/customer', customerRoutes);
APIHub.use('/seller', sellerRoutes);
APIHub.use('/system', systemRoutes);
APIHub.use('/strapi', strapiRoutes);

module.exports = APIHub;
