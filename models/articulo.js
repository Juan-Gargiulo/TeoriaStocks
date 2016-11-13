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
        produccionDiaria: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
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
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        modelo: DataTypes.CHAR,
        modeloSugerido: {
            type: DataTypes.CHAR,
            defaultValue: 'Q'
        },
        unidadesXbulto: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        codigoBarra: {
            type: DataTypes.STRING,
            max: 12
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
