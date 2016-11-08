'use strict';
module.exports = function(sequelize, DataTypes) {
  var Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    cantidadOrdenada: DataTypes.INTEGER,
    costoPedido: DataTypes.DECIMAL,
    demandaDiaria: DataTypes.INTEGER,
    produccionDiaria: DataTypes.INTEGER,
    costoMantenimiento: DataTypes.INTEGER,
    servivioDeseado: DataTypes.INTEGER,
    periodoRevicion: DataTypes.INTEGER,
    ultima_revision: DataTypes.DATE,
    desviacionEstandar: DataTypes.INTEGER,
    costoUnitario: DataTypes.DECIMAL,
    plazoRepocicion: DataTypes.INTEGER,
    modelo: DataTypes.CHAR

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Articulo;
};
