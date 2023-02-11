const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Employee = require('./employee.model');
const Role = require('./role.model');

const modelName = 'EmployeeRole';
const tableName = 'employees_roles';
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
  employeeId: {
    type: DataTypes.UUID,
    field: 'employee_id',
    references: {
      model: Employee.model,
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.UUID,
    field: 'role_id',
    references: {
      model: Role.model,
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
