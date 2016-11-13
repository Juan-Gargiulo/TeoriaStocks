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

.get('/criticos', (req, res) => {
      models.Articulo.findAll().then((articulos) => {

          let artResp = []
          for (var i = 0; i < articulos.length; i++) {
             var s1 = new StockItem(articulos[i])
             if (articulos[i].dataValues.stock <= s1.puntoReorden()) {
                articulos[i].dataValues.puntoReorden = s1.puntoReorden()
                artResp.push(articulos[i].dataValues)
             }
          }
          res.render('criticos', {
              title: 'Stocks Criticos',
              articulos: artResp
          });
      });
  })


.get('/:id(\\d+)', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {
        var s1 = new StockItem(articulo.dataValues)
        res.render('editArticulo', {
           title: articulo.nombre,
           a: articulo,
           Q: s1.cantOptimaPed(),
           R: s1.puntoReorden(),
           T: s1.costoTotalAnual()
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
         SELECT A.id, A.modeloSugerido, A.nombre, costoUnitario*demandaDiaria AS "valorizado", ( (costoUnitario*demandaDiaria*100) / T.TOTAL ) AS "pValorizado"
         FROM articulos A, TOTAL_VALORIZADO T
         ORDER BY "pValorizado" DESC;`

    let sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.development.sqlite'
    })

    sequelize.query(query, {type: sequelize.QueryTypes.SELECT })
        .then(function(articulos) {
            let modelo = 'Q'
            let valorAcum = 0

            let result = []
            for (var i = 0; i < articulos.length; i++) {
               valorAcum = valorAcum + articulos[i].pValorizado
               if (valorAcum > 85) {
                  modelo = 'P'
               }
               articulos[i].modelo = modelo

               //sugiero el modelo en el modelo del articulo
               models.Articulo.update({modeloSugerido: modelo}, {where: {id: articulos[i].id}})
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
      stock: req.body.stock,
      unidadesXbulto: req.body.unidadesXbulto,
      costoUnitario: req.body.costoUnitario,
      costoPedido: req.body.costoPedido,
      costoMantenimiento: req.body.costoMantenimiento,
      demandaDiaria: req.body.demandaDiaria,
      produccionDiaria: req.body.produccionDiaria,
      plazoRepocicion: req.body.plazoRepocicion,
      periodoRevicion: req.body.periodoRevicion,
      servivioDeseado: req.body.servivioDeseado,
      desviacionEstandar: req.body.desviacionEstandar,
      codigoBarra: req.body.codigoBarra,
      modelo: req.body.modelo.toUpperCase()

    }).then((articulo) => {
        res.redirect('/articulos')
    });
})


.put('/:id(\\d+)', (req, res) => {
    models.Articulo.findById(req.params.id).then((articulo) => {

        let m = req.body.modelo
        m.toUpperCase()

        articulo.updateAttributes({
           nombre: req.body.nombre,
           stock: req.body.stock,
           unidadesXbulto: req.body.unidadesXbulto,
           costoUnitario: req.body.costoUnitario,
           costoPedido: req.body.costoPedido,
           costoMantenimiento: req.body.costoMantenimiento,
           demandaDiaria: req.body.demandaDiaria,
           produccionDiaria: req.body.produccionDiaria,
           plazoRepocicion: req.body.plazoRepocicion,
           periodoRevicion: req.body.periodoRevicion,
           servivioDeseado: req.body.servivioDeseado,
           desviacionEstandar: req.body.desviacionEstandar,
           codigoBarra: req.body.codigoBarra,
           modelo: m

        }).then((articulo) => {
            res.redirect('/articulos')
        });

    });
})


module.exports = router;
