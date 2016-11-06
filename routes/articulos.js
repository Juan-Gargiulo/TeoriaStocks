var express = require('express');
var router = express.Router();
const models = require('../models');


/* GET users listing. */
router.get('/', (req, res) => {
   models.Articulo.findAll().then( (articulos) => {
      console.log(articulos)
      res.render('index', {articulos: articulos} )
   });
});

router.post('/', (req, res) => {
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
