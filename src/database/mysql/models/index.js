const User = require('./user.model');
const Address = require('./address.model');

const Business = require('./business.model');

const Role = require('./role.model');
const Scope = require('./scope.model');
const Permission = require('./permission.model');
const UserRole = require('./user-role.model');
const Employee = require('./employee.model');

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

const CartItem = require('./cart-item.model');

const Review = require('./review.model');

const Like = require('./like.model');
const Dislike = require('./dislike.model');

const Question = require('./question.model');
const Answer = require('./answer.model');

const WalletShop = require('./wallet-shop.model');

// Association

// SECURITY

// CATEGORIAS
Category.model.hasMany(Category.model, {
  as: 'subCats',
  foreignKey: 'parentId',
});

// CART SHOPPING
User.model.belongsToMany(Product.model, {
  through: CartItem.model,
  foreignKey: 'customerId',
  as: 'cart',
});
Product.model.belongsToMany(User.model, {
  through: CartItem.model,
  foreignKey: 'productId',
  as: 'cart',
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

module.exports = {
  User,
  Address,

  Business,

  Card,

  CardRegister,
  AddressRegister,

  Role,
  Scope,
  Permission,
  UserRole,
  Employee,

  PurchaseOrder,
  OrderItem,

  Return,

  Refund,

  Exchange,

  WalletStatus,
  WalletTransfer,
  WalletWithdrawal,

  Category,

  Product,

  MovementType,

  ChargeCategory,
  Charge,

  MovementCharge,

  Transaction,
  TransactionCharge,

  Sale,

  CartItem,

  Review,

  Like,
  Dislike,

  Answer,
  Question,

  WalletShop,
};
