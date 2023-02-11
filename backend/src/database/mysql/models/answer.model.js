const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Question = require('./question.model');

const modelName = 'Answer';
const tableName = 'answers';
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
  answer: DataTypes.STRING,
  employeeId: {
    type: DataTypes.UUID,
    field: 'employee_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  questionId: {
    type: DataTypes.UUID,
    field: 'question_id',
    references: {
      model: Question.model,
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
