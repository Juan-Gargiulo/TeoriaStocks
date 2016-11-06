'use strict';
module.exports = function(sequelize, DataTypes) {
  var Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING,
    cantidadOrdenada: DataTypes.INTEGER,
    costoPedido: DataTypes.DECIMAL,
    demandaDiaria: DataTypes.INTEGER,
    produccionDiaria: DataTypes.INTEGER,
    costoMantenimiento: DataTypes.INTEGER,
    servivioDeseado: DataTypes.INTEGER,
    periodoRevicion: DataTypes.INTEGER,
    desviacionEstandar: DataTypes.INTEGER,
    costoUnitario: DataTypes.DECIMAL,
    plazoRepocicion: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Articulo;
};