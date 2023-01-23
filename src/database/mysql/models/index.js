const User = require('./user.model');
const Address = require('./address.model');

const Business = require('./business.model');

const Role = require('./role.model');
const Scope = require('./scope.model');
const Permission = require('./permission.model');
const UserRole = require('./role.model');
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
const OrderAddress = require('./order-address.model');

const ReturnRequest = require('./return-request.model');
const ReturnProcess = require('./return-process.model');

const Sale = require('./sale.model');

const CartItem = require('./cart-item.model');

const Review = require('./review.model');

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

module.exports = {
  User,
  Address,

  Role,
  Scope,
  Permission,
  UserRole,
  Employee,

  Business,

  Card,

  CardRegister,

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

  PurchaseOrder,
  OrderItem,
  OrderAddress,

  ReturnRequest,
  ReturnProcess,

  Sale,

  CartItem,

  Review,

  Answer,
  Question,

  WalletShop,
};
