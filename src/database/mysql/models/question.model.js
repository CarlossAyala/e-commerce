const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
// const { User, Product, QuestionStatus, Answer } = require('.');
const User = require('./user.model');
const Product = require('./product.model');
const QuestionStatus = require('./question-status.model');
const Answer = require('./answer.model');

const modelName = 'Question';
const tableName = 'questions';
const modelOptions = {
  tableName,
  timestamps: true,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  fkCustomer: {
    type: DataTypes.UUID,
    field: 'fk_customer',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  fkProduct: {
    type: DataTypes.UUID,
    field: 'fk_product',
    references: {
      model: Product.model,
      key: 'id',
    },
  },
  fkStatus: {
    type: DataTypes.UUID,
    field: 'fk_status',
    references: {
      model: QuestionStatus.model,
      key: 'id',
    },
  },
  fkAnswer: {
    type: DataTypes.UUID,
    field: 'fk_answer',
    references: {
      model: Answer.model,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
