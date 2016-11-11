'use strict';
module.exports = function(sequelize, DataTypes) {
    var Articulo = sequelize.define('Articulo', {
        nombre: DataTypes.STRING,
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cantidadOrdenada: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        costoPedido: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        demandaDiaria: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        produccionDiaria: DataTypes.INTEGER,
        costoMantenimiento: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        servivioDeseado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        periodoRevicion: DataTypes.INTEGER,
        ultima_revision: DataTypes.DATE,
        desviacionEstandar: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        costoUnitario: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        plazoRepocicion: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        modelo: DataTypes.CHAR,
        unidadesXbulto: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Articulo;
};
