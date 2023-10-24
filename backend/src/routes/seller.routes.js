const express = require("express");
const seller = express.Router();
const API = express.Router();

const product = require("../core/seller/product/product.routes");
const store = require("../core/seller/store/store.routes");
const category = require("../core/seller/category/category.routes");
const qa = require("../core/seller/qa/qa.routes");
const sale = require("../core/seller/sale/sale.routes");
const review = require("../core/seller/review/review.routes");
const requestsOfficialStores = require("../core/seller/requests-official-stores/routes");

seller.use("/api", API);

// API Routes
API.use("/products", product);
API.use("/stores", store);
API.use("/categories", category);
API.use("/qa", qa);
API.use("/sales", sale);
API.use("/reviews", review);
API.use("/requests-official-stores", requestsOfficialStores);

module.exports = seller;
