const User = require('./user.model');
const Address = require('./address.model');

const Business = require('./business.model');

const Role = require('./role.model');
const Employee = require('./employee.model');
const EmployeeRole = require('./employee-role.model');

const Card = require('./card.model');

const CardRegister = require('./card-register.model');

const WalletStatus = require('./wallet-status.model');
const WalletTransfer = require('./wallet-transfer.model');
const WalletWithdrawal = require('./wallet-withdrawal.model');

const Category = require('./category.model');

const Product = require('./product.model');

const MovementType = require('./movement-type.model');

const ChargeCategory = require('./charge-category.model');
const Charge = require('./charge.model');

const MovementCharge = require('./movement-charge.model');
const TransactionCharge = require('./transaction-charge.model');

const Transaction = require('./transaction.model');

const PurchaseOrder = require('./purchase-order.model');
const OrderItem = require('./order-item.model');
const AddressRegister = require('./address-register.model');

const Return = require('./return.model');

const Refund = require('./refund.model');

const Exchange = require('./exchange.model');

const Sale = require('./sale.model');

const Cart = require('./cart.model');
const CartProduct = require('./cart-product.model');

const Review = require('./review.model');

const Like = require('./like.model');
const Dislike = require('./dislike.model');

const Question = require('./question.model');
const Answer = require('./answer.model');

const WalletShop = require('./wallet-shop.model');

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
PurchaseOrder.model.hasMany(OrderItem.model, {
  foreignKey: 'fkOrder',
  as: 'products',
});
PurchaseOrder.model.belongsTo(AddressRegister.model, {
  foreignKey: 'fkDestination',
  as: 'destination',
});
PurchaseOrder.model.belongsTo(CardRegister.model, {
  foreignKey: 'fkCardPayment',
  as: 'creditCard',
});

OrderItem.model.belongsTo(Product.model, {
  foreignKey: 'fkProduct',
  as: 'details',
});

// QUESTIONS AND ANSWERS
Question.model.hasOne(Answer.model, {
  foreignKey: 'questionId',
  as: 'answer',
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
Business.model.hasMany(Product.model, {
  foreignKey: 'businessId',
  as: 'products',
});
Product.model.belongsTo(Business.model, {
  foreignKey: 'businessId',
  as: 'business',
});

module.exports = {
  User,
  Address,

  Business,

  Card,

  CardRegister,
  AddressRegister,

  Role,
  Employee,
  EmployeeRole,

  Category,

  Product,

  PurchaseOrder,
  OrderItem,

  Return,

  Refund,

  Exchange,

  WalletStatus,
  WalletTransfer,
  WalletWithdrawal,

  MovementType,

  ChargeCategory,
  Charge,

  MovementCharge,

  Transaction,
  TransactionCharge,

  Sale,

  Cart,
  CartProduct,

  Review,

  Like,
  Dislike,

  Question,
  Answer,

  WalletShop,
};
