const CalculoStock = require('./stockModule');

global.diasHabiles = 365

var c1 = new CalculoStock('Q', 5, 7, 35, 20)

console.log( c1.cantOptimaPed() );
