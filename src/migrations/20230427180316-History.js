'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('history',{
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      userid: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'id' },
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      input: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      inputExtra: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      output: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('history');
  }
};
