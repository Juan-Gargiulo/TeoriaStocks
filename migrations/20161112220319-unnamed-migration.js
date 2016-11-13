'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn(
      'articulos',
      'codigoBarra',
      {
         type: Sequelize.STRING,
         max: 12
      }
     )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
