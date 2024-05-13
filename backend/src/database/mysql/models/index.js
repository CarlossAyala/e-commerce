import User from "./user.model.js";
import Address from "./address.model.js";

import RefreshToken from "./refresh-token.model.js";

import Store from "./store.model.js";
import StoreImage from "./store-image.model.js";

import Category from "./category.model.js";
import CategoryImage from "./category-image.model.js";

import Product from "./product.model.js";
import ProductImage from "./product-image.model.js";

import Bookmark from "./bookmark.model.js";

import History from "./history.model.js";

import Order from "./order.model.js";
import OrderItem from "./order-item.model.js";

import CartProduct from "./cart-product.model.js";

import Review from "./review.model.js";

import Question from "./question.model.js";
import Answer from "./answer.model.js";

// PRODUCT - PRODUCT-IMAGES
Product.model.hasMany(ProductImage.model, {
  foreignKey: "productId",
  as: "gallery",
  onDelete: "CASCADE",
});
ProductImage.model.belongsTo(Product.model, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE",
});

// STORE
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
Store.model.hasMany(StoreImage.model, {
  foreignKey: "storeId",
  as: "gallery",
  onDelete: "CASCADE",
});
StoreImage.model.belongsTo(Store.model, {
  foreignKey: "storeId",
  as: "store",
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
// CATEGORIES - CATEGORY-IMAGES
Category.model.hasMany(CategoryImage.model, {
  foreignKey: "categoryId",
  as: "gallery",
  onDelete: "CASCADE",
});
CategoryImage.model.belongsTo(Category.model, {
  foreignKey: "categoryId",
  as: "category",
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

export {
  User,
  Address,
  RefreshToken,
  Store,
  StoreImage,
  Category,
  CategoryImage,
  Product,
  ProductImage,
  Bookmark,
  History,
  Order,
  OrderItem,
  CartProduct,
  Review,
  Question,
  Answer,
};
