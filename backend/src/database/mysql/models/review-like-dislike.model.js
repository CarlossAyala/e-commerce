const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Review = require('./review.model');

const modelName = 'ReviewLikeDislike';
const tableName = 'review_like_dislikes';
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  state: DataTypes.BOOLEAN,
  customerId: {
    type: DataTypes.UUID,
    field: 'customer_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  reviewId: {
    type: DataTypes.UUID,
    field: 'review_id',
    references: {
      model: Review.model,
      key: 'id',
    },
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
