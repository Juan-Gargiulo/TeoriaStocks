'use strict'

var express = require('express');
var router = express.Router();
const models = require('../models');
const StockItem = require('../stockModule2');
const moment = require('moment');
const Sequelize = require('sequelize');


router

.get('/', (req, res) => {
        models.Articulo.findAll().then((articulos) => {
            console.log(articulos)
            res.render('articulos', {
                title: 'Administrar articulos',
                articulos: articulos
            });
        });
    })


.get('/:id(\\d+)/', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {

        var s1 = new StockItem(articulo.dataValues)
        console.log("la cantidad optima del pedido es: " + s1.cantOptimaPed())

        res.json(articulo);
    });
})

//ruta para calcula abc de los articulos segun su valoricacion anual
.get('/abc', (req, res) => {

    //esta query trae los articulos con su porcentaje de valorizacion anual
    let query = `WITH TOTAL_VALORIZADO AS
         (SELECT SUM(costoUnitario*demandaDiaria) AS TOTAL FROM articulos)
         SELECT A.nombre, costoUnitario*demandaDiaria AS "valorizado", ( (costoUnitario*demandaDiaria*100) / T.TOTAL ) AS "pValorizado"
         FROM articulos A, TOTAL_VALORIZADO T
         ORDER BY "pValorizado" DESC;`

    let sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.development.sqlite'
    })

    sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(function(articulos) {
            let modelo = 'q'
            let valorAcum = 0

            let result = []
            for (var i = 0; i < articulos.length; i++) {
               valorAcum = valorAcum + articulos[i].pValorizado
               if (valorAcum > 79) {
                  modelo = 'p'
               }
               console.log(valorAcum);
               articulos[i].modelo = modelo
            }

            res.render('abc', {
                title: 'Tabla ABC articulos',
                articulos: articulos
            });

        })
})


.post('/', (req, res) => {
    models.Articulo.create({

        nombre: req.body.nombre,
        costoUnitario: req.body.costoUnitario,
        costoPedido: req.body.costoPedido,
        demandaDiaria: req.body.demandaDiaria,
        produccionDiaria: req.body.produccionDiaria,
        costoMantenimiento: req.body.costoMantenimiento,
        servicioDeseado: req.body.servicioDeseado,
        periodoRevicion: req.body.periodoRevicion,
        desviacionEstandar: req.body.desviacionEstandar,
        plazoRepocicion: req.body.plazoRepocicion7u

    }).then((articulo) => {
        res.redirect('/articulos')
    });
})


.put('/:id', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {

        articulo.updateAttributes({
            nombre: 'caramelo sugus',
            ultima_revision: new Date()
        }).then((articulo) => {
            res.json(articulo)
        });

    });
})


module.exports = router;
