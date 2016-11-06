'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Articulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      cantidadOrdenada: {
        type: Sequelize.INTEGER
      },
      costoPedido: {
        type: Sequelize.DECIMAL
      },
      demandaDiaria: {
        type: Sequelize.INTEGER
      },
      produccionDiaria: {
        type: Sequelize.INTEGER
      },
      costoMantenimiento: {
        type: Sequelize.INTEGER
      },
      servivioDeseado: {
        type: Sequelize.INTEGER
      },
      periodoRevicion: {
        type: Sequelize.INTEGER
      },
      desviacionEstandar: {
        type: Sequelize.INTEGER
      },
      costoUnitario: {
        type: Sequelize.DECIMAL
      },
      plazoRepocicion: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Articulos');
  }
};