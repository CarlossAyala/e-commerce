const User = require('./user.model');
const Address = require('./address.model');

const Store = require('./store.model');

const Category = require('./category.model');

const Product = require('./product.model');

const Bookmark = require('./bookmark.model');

const History = require('./history.model');

const Order = require('./order.model');
const OrderItem = require('./order-item.model');

const Cart = require('./cart.model');
const CartProduct = require('./cart-product.model');

const Review = require('./review.model');

const Like = require('./like.model');
const Dislike = require('./dislike.model');

const Question = require('./question.model');
const Answer = require('./answer.model');

// Association

// SECURITY

// CATEGORIAS
Category.model.belongsTo(Category.model, {
  foreignKey: 'parentId',
  as: 'parent',
});
Category.model.hasMany(Category.model, {
  foreignKey: 'parentId',
  as: 'children',
});

// USER AND CART
User.model.hasOne(Cart.model, {
  foreignKey: 'customerId',
  as: 'cart',
});
Cart.model.belongsTo(User.model, {
  foreignKey: 'customerId',
  as: 'customer',
});

// CART AND PRODUCT
Cart.model.belongsToMany(Product.model, {
  through: CartProduct.model,
  foreignKey: 'cartId',
  as: 'products',
});
Product.model.belongsToMany(Cart.model, {
  through: CartProduct.model,
  foreignKey: 'productId',
  as: 'cart',
});

// CART-PRODUCT AND PRODUCT
CartProduct.model.belongsTo(Product.model, {
  foreignKey: 'productId',
  as: 'product',
});

// PURCHASE ORDER
Order.model.hasMany(OrderItem.model, {
  foreignKey: 'orderId',
  as: 'products',
});

OrderItem.model.belongsTo(Product.model, {
  foreignKey: 'productId',
  as: 'product',
});

// QUESTIONS AND ANSWERS
Question.model.hasOne(Answer.model, {
  foreignKey: 'questionId',
  as: 'answer',
});
// QUESTIONS AND ANSWERS
Question.model.belongsTo(User.model, {
  foreignKey: 'customerId',
  as: 'customer',
});

// QUESTIONS AND PRODUCTS
Product.model.hasMany(Question.model, {
  foreignKey: 'productId',
  as: 'questions',
});
// QUESTIONS AND PRODUCTS
Question.model.belongsTo(Product.model, {
  foreignKey: 'productId',
  as: 'product',
});

// CATEGORIES AND PRODUCTS
Category.model.hasMany(Product.model, {
  foreignKey: 'categoryId',
  as: 'products',
});
Product.model.belongsTo(Category.model, {
  foreignKey: 'categoryId',
  as: 'category',
});

// BUSINESSES AND PRODUCTS
Store.model.hasMany(Product.model, {
  foreignKey: 'storeId',
  as: 'products',
});
Product.model.belongsTo(Store.model, {
  foreignKey: 'storeId',
  as: 'store',
});

// HISTORY AND PRODUCT
History.model.belongsTo(Product.model, {
  foreignKey: 'productId',
  as: 'product',
});

// PRODUCT AND BOOKMARK
Product.model.hasOne(Bookmark.model, {
  foreignKey: 'productId',
  as: 'inBookmark',
});
// PRODUCT AND CARTPRODUCT
Product.model.hasOne(CartProduct.model, {
  foreignKey: 'productId',
  as: 'inCart',
});

// BOOKMARK AND PRODUCT
Bookmark.model.belongsTo(Product.model, {
  foreignKey: 'productId',
  as: 'product',
});

module.exports = {
  User,
  Address,

  Store,

  Category,

  Product,

  Bookmark,

  History,

  Order,
  OrderItem,

  Cart,
  CartProduct,

  Review,

  Like,
  Dislike,

  Question,
  Answer,
};
