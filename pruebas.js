"use strict"

const StockItem = require('./stockModule2');
const models = require('./models');
const gaussian = require('gaussian');
const normDist = require('norm-dist');

global.diasHabiles = 365

models.Articulo.findById(1).then( (articulo)=> {

   var s1 = new StockItem(articulo.dataValues)
   console.log("la cantidad optima del pedido para id 1 es: " + s1.cantOptimaPed())

})

var quartile = normDist.icdf(0.2)
console.log(quartile);
