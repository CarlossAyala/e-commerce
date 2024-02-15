const express = require("express");
const customer = express.Router();
const API = express.Router();

const { authentication } = require("../middlewares");
const { JWT } = require("../libs");
const question = require("../core/customer/question/question.routes");
const cart = require("../core/customer/cart/cart.routes");
const bookmark = require("../core/customer/bookmark/bookmark.routes");
const address = require("../core/customer/address/address.routes");
const order = require("../core/customer/order/order.routes");
const history = require("../core/customer/history/history.routes");
const review = require("../core/customer/review/review.routes");
const category = require("../core/customer/category/category.routes");
const store = require("../core/customer/store/store.routes");
const checkouts = require("../core/customer/checkout/checkout.routes");

customer.use("/api", API);

API.use("/questions", question);
API.use("/cart", cart);
API.use("/bookmarks", JWT.verify, authentication, bookmark);
API.use("/addresses", address);
API.use("/orders", order);
API.use("/history", JWT.verify, authentication, history);
API.use("/reviews", review);
API.use("/categories", category);
API.use("/stores", store);
API.use("/checkouts", checkouts);

module.exports = customer;
