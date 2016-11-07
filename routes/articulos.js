var express = require('express');
var router = express.Router();
const models = require('../models');
const StockItem = require('../stockModule2');


/* GET users listing. */
router

.get('/', (req, res) => {
   models.Articulo.findAll().then( (articulos) => {
      console.log( articulos )
      res.render('articulos', {
         title: 'Administrar articulos',
         articulos: articulos
      });
   });
})

.get('/:id', (req, res)=> {
   models.Articulo.findById(req.params.id).then( (articulo)=> {
      var s1 = new StockItem(articulo.dataValues)
      console.log(s1.cantOptimaPed())
   });
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
        plazoRepocicion: req.body.plazoRepocicion

    }).then( (articulo) => {
      res.redidect('/')
    });
});

module.exports = router;


// nombre: DataTypes.STRING,
// cantidadOrdenada: DataTypes.INTEGER,
// costoPedido: DataTypes.DECIMAL,
// demandaDiaria: DataTypes.INTEGER,
// produccionDiaria: DataTypes.INTEGER,
// costoMantenimiento: DataTypes.INTEGER,
// servivioDeseado: DataTypes.INTEGER,
// periodoRevicion: DataTypes.INTEGER,
// desviacionEstandar: DataTypes.INTEGER,
// costoUnitario: DataTypes.DECIMAL,
// plazoRepocicion: DataTypes.INTEGER
