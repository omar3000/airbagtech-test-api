const DataTypes = require('sequelize');
const { sequelize} = require('../database/db.js');
const User = require( './user.model.js');


const History =  sequelize.define('history', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userid: {
    type: DataTypes.STRING,
    references: { model: 'users', key: 'id' },
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  input: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inputExtra: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  output: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'history',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: 'pk_history',
      unique: true,
      fields: [
        { name: 'id' },
      ]
    },
  ]
});

User.belongsTo(History, {foreignKey: 'id'});

History.hasOne(User, {foreignKey: 'id',sourceKey: 'userid'});

module.exports = History;