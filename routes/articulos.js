'use strict'

var express = require('express');
var router = express.Router();
const models = require('../models');
const StockItem = require('../stockModule');
const moment = require('moment');
const Sequelize = require('sequelize');


router

.get('/', (req, res) => {
        models.Articulo.findAll().then((articulos) => {
            res.render('articulos', {
                title: 'Listado de Articulos',
                articulos: articulos
            });
        });
    })


.get('/:id(\\d+)', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {
        console.log(articulo.dataValues);
        var s1 = new StockItem(articulo.dataValues)
        res.render('editArticulo', {
           title: articulo.nombre,
           a: articulo,
           Q: s1.cantOptimaPed()
        });
    });
})


.get('/new', (req, res) => {
    res.render('newArticulo', {title: 'Alta / Baja / Modificacion'});
})

//ruta para calcula abc de los articulos segun su valoricacion anual
.get('/abc', (req, res) => {

    //esta query trae los articulos con su porcentaje de valorizacion anual
    let query = `WITH TOTAL_VALORIZADO AS
         (SELECT SUM(costoUnitario*demandaDiaria) AS TOTAL FROM articulos)
         SELECT A.id, A.nombre, costoUnitario*demandaDiaria AS "valorizado", ( (costoUnitario*demandaDiaria*100) / T.TOTAL ) AS "pValorizado"
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
            let modelo = 'Q'
            let valorAcum = 0

            let result = []
            for (var i = 0; i < articulos.length; i++) {
               valorAcum = valorAcum + articulos[i].pValorizado
               if (valorAcum > 85) {
                  modelo = 'P'
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
        plazoRepocicion: req.body.plazoRepocicion,

    }).then((articulo) => {
        res.redirect('/articulos')
    });
})


.put('/:id(\\d+)', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {
        articulo.updateAttributes({

           nombre: req.body.nombre,
           costoUnitario: req.body.costoUnitario,
           costoPedido: req.body.costoPedido,
           demandaDiaria: req.body.demandaDiaria,
           produccionDiaria: req.body.produccionDiaria,
           costoMantenimiento: req.body.costoMantenimiento,
           servicioDeseado: req.body.servicioDeseado,
           periodoRevicion: req.body.periodoRevicion,
           desviacionEstandar: req.body.desviacionEstandar,
           plazoRepocicion: req.body.plazoRepocicion,
           modelo: req.body.modelo

        }).then((articulo) => {
            res.redirect('/articulos')
        });

    });
})


module.exports = router;
