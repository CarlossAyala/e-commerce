const User = require("./user.model");
const Address = require("./address.model");

const RefreshToken = require("./refresh-token.model");

const Store = require("./store.model");
const RequestOfficialStore = require("./request-official-store.model");

const Category = require("./category.model");

const Product = require("./product.model");

const Bookmark = require("./bookmark.model");

const History = require("./history.model");

const Order = require("./order.model");
const OrderItem = require("./order-item.model");

const CartProduct = require("./cart-product.model");

const Review = require("./review.model");

const Question = require("./question.model");
const Answer = require("./answer.model");

// STORE
Store.model.hasMany(RequestOfficialStore.model, {
  foreignKey: "storeId",
  as: "requests",
  onDelete: "CASCADE",
});
RequestOfficialStore.model.belongsTo(Store.model, {
  as: "store",
  onDelete: "CASCADE",
});
User.model.hasOne(Store.model, {
  foreignKey: "sellerId",
  as: "store",
  onDelete: "CASCADE",
});
Store.model.belongsTo(User.model, {
  foreignKey: "sellerId",
  as: "seller",
  onDelete: "CASCADE",
});

// CATEGORIES
Category.model.hasMany(Category.model, {
  foreignKey: "parentId",
  as: "children",
  onDelete: "CASCADE",
});
Category.model.belongsTo(Category.model, {
  foreignKey: "parentId",
  as: "parent",
  onDelete: "CASCADE",
});

// CART AND PRODUCT
CartProduct.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
});

// ORDER AND ORDER-ITEM
Order.model.hasMany(OrderItem.model, {
  foreignKey: "orderId",
  as: "items",
});
OrderItem.model.belongsTo(Order.model, {
  foreignKey: "orderId",
  as: "order",
});

// ORDER AND USER
Order.model.belongsTo(User.model, {
  foreignKey: "customerId",
  as: "customer",
});

// ORDER AND ADDRESS
Order.model.belongsTo(Address.model, {
  foreignKey: "addressId",
  as: "address",
});

// ORDER-ITEM AND PRODUCT
OrderItem.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
});
// REVIEW AND ORDER-ITEM
Review.model.hasOne(OrderItem.model, {
  foreignKey: "reviewId",
  as: "item",
});
OrderItem.model.belongsTo(Review.model, {
  foreignKey: "reviewId",
  as: "review",
});

// QUESTIONS AND ANSWERS
Question.model.hasOne(Answer.model, {
  foreignKey: "questionId",
  as: "answer",
});
// QUESTIONS AND CUSTOMERS
Question.model.belongsTo(User.model, {
  foreignKey: "customerId",
  as: "customer",
});

// PRODUCTS AND QUESTIONS
Product.model.hasMany(Question.model, {
  foreignKey: "productId",
  as: "questions",
});
// QUESTIONS AND PRODUCTS
Question.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
});

// CATEGORIES AND PRODUCTS
Category.model.hasMany(Product.model, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "CASCADE",
});
Product.model.belongsTo(Category.model, {
  foreignKey: "categoryId",
  as: "category",
});

// BUSINESSES AND PRODUCTS
Store.model.hasMany(Product.model, {
  foreignKey: "storeId",
  as: "products",
});
Product.model.belongsTo(Store.model, {
  foreignKey: "storeId",
  as: "store",
});

// HISTORY AND PRODUCT
History.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE",
});

// BOOKMARK AND PRODUCT
Bookmark.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
});

module.exports = {
  User,
  Address,

  RefreshToken,

  Store,
  RequestOfficialStore,

  Category,

  Product,

  Bookmark,

  History,

  Order,
  OrderItem,

  CartProduct,

  Review,

  Question,
  Answer,
};
