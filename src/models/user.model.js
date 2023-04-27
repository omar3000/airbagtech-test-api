const DataTypes = require('sequelize');
const { sequelize} = require('../database/db.js');


const User =  sequelize.define('users', {
    email: {
      type: DataTypes.STRING(46),
      allowNull: false
    },
    password: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_usuario",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  module.exports = User