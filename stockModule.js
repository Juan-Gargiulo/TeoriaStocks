'use strict'



module.exports = function(modelo, cUnidad, cManten, demandaDiaria, cPedido) {

   this.demandaAnual = function() {
      return demandaDiaria * global.diasHabiles
   }

   this.cantOptimaPed = ()=> {
      if (modelo == 'Q') {
         return Math.floor( Math.sqrt( (2 * this.demandaAnual() * cPedido) / cManten ) )
      }
   }

   this.cAnualComp = ()=> {
      return demandaAnual() * cUnidad
   }

   this.cAnualManten = ()=> {
      return cManten * global.diasHabiles
   }

   this.cAnualPed = ()=> {
      return cUnidad * demandaAnual
   }

};
