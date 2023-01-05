const User = require('./user.model');
const Address = require('./address.model');

const Role = require('./role.model');
const ScopeType = require('./scope-type.model');
const Scope = require('./scope.model');
// const Permission = require('./permission.model');

const Card = require('./card.model');

const CardRegister = require('./card-register.model');

const WalletStatus = require('./wallet-status.model');
const WalletTransfer = require('./wallet-transfer.model');
const WalletWithdrawal = require('./wallet-withdrawal.model');

const Category = require('./category.model');

const ProductCondition = require('./product-condition.model');
const Product = require('./product.model');

const MovementType = require('./movement-type.model');

const ChargeCategory = require('./charge-category.model');
const Charge = require('./charge.model');

const MovementCharge = require('./movement-charge.model');
const TransactionCharge = require('./transaction-charge.model');

const Transaction = require('./transaction.model');

const OrderState = require('./order-state.model');
const PurchaseOrder = require('./purchase-order.model');
const OrderItem = require('./order-item.model');
const OrderAddress = require('./order-address.model');

const ReturnRequestStatus = require('./return-request-status.model');
const ReturnRequest = require('./return-request.model');
const ReturnProcess = require('./return-process.model');

const Sale = require('./sale.model');

const ShoppingCart = require('./shopping-cart.model');
const CartItem = require('./cart-item.model');

const Review = require('./review.model');

const QuestionStatus = require('./question-status.model');
const Question = require('./question.model');
const Answer = require('./answer.model');

const BusinessSeller = require('./business-seller.model');

const WalletShop = require('./wallet-shop.model');

// Association

// CATEGORIAS
Category.model.hasMany(Category.model, {
  as: 'subCats',
  foreignKey: 'parentId',
});

module.exports = {
  User,
  Address,

  Role,
  ScopeType,
  Scope,

  Card,

  CardRegister,

  WalletStatus,
  WalletTransfer,
  WalletWithdrawal,

  Category,

  ProductCondition,
  Product,

  MovementType,

  ChargeCategory,
  Charge,

  MovementCharge,

  Transaction,
  TransactionCharge,

  OrderState,
  PurchaseOrder,
  OrderItem,
  OrderAddress,

  ReturnRequestStatus,
  ReturnRequest,
  ReturnProcess,

  Sale,

  ShoppingCart,
  CartItem,

  Review,

  QuestionStatus,
  Answer,
  Question,

  BusinessSeller,

  WalletShop,
};
