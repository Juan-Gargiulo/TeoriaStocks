'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn(
     'Articulos',
     'unidadesXbulto',
     {
         type: Sequelize.INTEGER,
         allowNull: false,
         defaultValue: 1
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
