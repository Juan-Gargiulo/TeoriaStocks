'use strict'

const moment = require('moment');
const ztable = require('ztable');

module.exports = function(articulo) {

   this.imprimir = ()=> {
      return articulo
   }

   this.demandaAnual = ()=> {
      return articulo.demandaDiaria * global.diasHabiles
   }


   this.cAnualComp = ()=> {
      return demandaAnual() * articulo.costoUnitario
   }

   this.cAnualManten = ()=> {
      return articulo.costoMantenimiento * global.diasHabiles
   }

   this.cAnualPed = ()=> {
      return articulo.costoUnitario * demandaAnual()
   }

   this.cantOptimaPed = ()=> {
      if (articulo.modelo.toUpperCase() == 'Q') {

         console.log('q')
         let cantOptima = Math.floor( Math.sqrt( (2 * this.demandaAnual() * articulo.costoPedido) / articulo.costoMantenimiento ) )

         return cantOptima
      }

      else if (articulo.modelo.toUpperCase() == 'P') {

         let T  = articulo.periodoRevicion
         console.log(T);
         let L  = articulo.plazoRepocicion
         console.log(L);
         let d  = articulo.demandaDiaria
         console.log(d);
         let dE = articulo.desviacionEstandar
         console.log(dE);
         let P  = articulo.servivioDeseado/100
         console.log('P: ' + P);
         let I = articulo.stock + articulo.cantidadOrdenada

         let Otl = Math.sqrt( T + L) * dE
         console.log(Otl);

         let z = (d * T * (1 - P)) / Otl
         console.log(z);

         let cantOptima = d * ( T+L ) + ( z* Otl ) + I

         return cantOptima
      }

   }
};
