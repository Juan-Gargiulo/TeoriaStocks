'use strict'

const moment = require('moment');

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

      let cantOptima

      if (articulo.modelo.toUpperCase() == 'Q') {
         //si produccion diaria es mayor a 0, es un articulo que se produce
         console.log(this.demandaAnual());
         console.log(S);
         console.log(H);
         if (p > 0) {
            cantOptima = Math.sqrt( (2 * this.demandaAnual() * S * p) / (H * (p - d)) )
         }else{
            cantOptima = Math.sqrt( (2 * this.demandaAnual() * S) / H )
         }
      }
      else if (articulo.modelo.toUpperCase() == 'P') {
         console.log(d);
         console.log(T);
         console.log(L);
         console.log(Z);
         console.log(Otl);
         console.log(I);
         cantOptima = d * ( T+L ) + ( Z * Otl ) - I
      }

      return Math.floor( cantOptima / articulo.unidadesXbulto )
   }

   this.puntoReorden = ()=> {
      let p
      if (p > 0) {
         p = (d * L) +  (Z * Od)
      }else{
         p = (d * L)
      }
      return Math.floor( p )
   }

   this.costoTotalAnual = ()=> {
      let total
      if (p > 0) {
         total = (this.demandaAnual() * C) + ((this.demandaAnual()/this.cantOptimaPed()) * S) +
                 ((p-d) * this.cantOptimaPed() * H / (2*p));
      }else {
         total = (this.demandaAnual() * C) + ((this.demandaAnual()/this.cantOptimaPed()) * S) +
                 ((this.cantOptimaPed()/2) * H);
      }
      return Math.floor( total )
   }

   this.calcularZ = (edz) => {

      //let tabla = new Map()
      let tabla = [
         {ed: 2.502, z: -2.5},
         {ed: 2.403, z: -2.4},
         {ed: 2.303, z: -2.3},
         {ed: 2.205, z: -2.2},
         {ed: 2.106, z: -2.1},
         {ed: 2.008, z: -2.0},
         {ed: 1.911, z: -1.9},
         {ed: 1.814, z: -1.8},
         {ed: 1.718, z: -1.7},
         {ed: 1.623, z: -1.6},
         {ed: 1.529, z: -1.5},
         {ed: 1.437, z: -1.4},
         {ed: 1.346, z: -1.3},
         {ed: 1.256, z: -1.2},
         {ed: 1.169, z: -1.1},
         {ed: 1.083, z: -1.0},
         {ed: 1.000, z: -0.9},
         {ed: 0.920, z: -0.8},
         {ed: 0.843, z: -0.7},
         {ed: 0.769, z: -0.6},
         {ed: 0.698, z: -0.5},
         {ed: 0.630, z: -0.4},
         {ed: 0.567, z: -0.3},
         {ed: 0.507, z: -0.2},
         {ed: 0.451, z: -0.1},
         {ed: 0.000, z: 4.5},
         {ed: 0.000, z: 4.4},
         {ed: 0.000, z: 4.3},
         {ed: 0.000, z: 4.2},
         {ed: 0.000, z: 4.1},
         {ed: 0.000, z: 4.0},
         {ed: 0.000, z: 3.9},
         {ed: 0.000, z: 3.8},
         {ed: 0.000, z: 3.7},
         {ed: 0.000, z: 3.6},
         {ed: 0.000, z: 3.5},
         {ed: 0.000, z: 3.4},
         {ed: 0.000, z: 3.3},
         {ed: 0.000, z: 3.2},
         {ed: 0.000, z: 3.1},
         {ed: 0.000, z: 3.0},
         {ed: 0.001, z: 2.9},
         {ed: 0.001, z: 2.8},
         {ed: 0.001, z: 2.7},
         {ed: 0.001, z: 2.6},
         {ed: 0.002, z: 2.5},
         {ed: 0.003, z: 2.4},
         {ed: 0.004, z: 2.3},
         {ed: 0.005, z: 2.2},
         {ed: 0.006, z: 2.1},
         {ed: 0.008, z: 2.0},
         {ed: 0.011, z: 1.9},
         {ed: 0.014, z: 1.8},
         {ed: 0.018, z: 1.7},
         {ed: 0.023, z: 1.6},
         {ed: 0.029, z: 1.5},
         {ed: 0.037, z: 1.4},
         {ed: 0.046, z: 1.3},
         {ed: 0.056, z: 1.2},
         {ed: 0.069, z: 1.1},
         {ed: 0.083, z: 1.0},
         {ed: 0.100, z: 0.9},
         {ed: 0.120, z: 0.8},
         {ed: 0.143, z: 0.7},
         {ed: 0.169, z: 0.6},
         {ed: 0.198, z: 0.5},
         {ed: 0.230, z: 0.4},
         {ed: 0.267, z: 0.3},
         {ed: 0.307, z: 0.2},
         {ed: 0.351, z: 0.1},
         {ed: 0.399, z: 0.0}
      ]

      //edz viene como param
      let z
      tabla.sort( (a,b)=> a.ed-b.ed )
      for (var i = 0; i < tabla.length; i++) {
         if (tabla[i].ed > edz) {
            z = tabla[i-1].z
            break;
         }
      }
      return z
   }

   //variables de calculo
   let C = articulo.costoUnitario
   let d  = articulo.demandaDiaria
   let p  = articulo.produccionDiaria
   let S  = articulo.costoPedido
   let H  = articulo.costoMantenimiento
   let T  = articulo.periodoRevicion
   let L  = articulo.plazoRepocicion
   let P  = articulo.servivioDeseado/100
   let I = articulo.stock + articulo.cantidadOrdenada
   let Od = articulo.desviacionEstandar
   let Ol = Math.sqrt(L) * Od
   let Otl
   let edZ
   if (articulo.modelo == 'P') {
      Otl = Math.sqrt( T + L) * Od
      edZ = (d * T * (1 - P)) / Otl
   }else{
      edZ = (1 - P) * Od
   }
   let Z = this.calcularZ(edZ)

};
