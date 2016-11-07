'use strict'



module.exports = function(articulo) {

   this.imprimir = ()=> {
      return articulo
   }

   this.demandaAnual = ()=> {
      return articulo.demandaDiaria * global.diasHabiles
   }

   this.cantOptimaPed = ()=> {
      if (articulo.modelo.toUpperCase() == 'Q') {
         console.log(articulo.demandaDiaria)
         return Math.floor( Math.sqrt( (2 * this.demandaAnual() * articulo.costoPedido) / articulo.costoMantenimiento ) )
      }
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

};
