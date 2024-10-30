<template>
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" @click="cerrarModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Cant</th>
                        <th>Codigo</th>
                        <th>Descripción</th>
                        <th>Precio Unitario</th>
                        <th>Descuento</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in datos" :key="item.id">                                        
                        <td>{{ item.cantidad }}</td>
                        <td>{{ item.codigo }}</td>
                        <td>{{ item.descripcion }}</td>
                        <td>{{ item.precio }}</td>
                        <td>{{ item.descuento }}</td>
                        <td>{{ item.total }}</td>
                    </tr>
                    </tbody>            
                </table>
            </div>
            <br>
          <div>
            <div class="d-flex flex-row-reverse">
              <p class="">{{ calcularTotal()["total15"] }}</p>
              <p class="valoresTotales">Subtotal 15%</p>                
            </div>            
            <div class="d-flex flex-row-reverse">
              <p class="">{{ calcularTotal()["total0"] }}</p>
              <p class="valoresTotales">Subtotal 0%</p>                
            </div>            
            <div class="d-flex flex-row-reverse">
                <p class="">{{ calcularTotal()["total0"] }}</p>
                <p class="valoresTotales">Subtotal No Obj. Iva</p>
            </div>
            <div class="d-flex flex-row-reverse">
                <p class="">{{ calcularTotal()["total0"] }}</p>
                <p class="valoresTotales">Subtotal Sin Impuestos</p>
            </div>
            <div class="d-flex flex-row-reverse">
                <p class="">{{ calcularTotal()["totalDescuentos"] }}</p>
                <p class="valoresTotales">Total Descuentos</p>
            </div>
            <div class="d-flex flex-row-reverse">
                <p class="">{{ calcularTotal()["impuesto"] }}</p>
                <p class="valoresTotales">Impuesto 15%</p>
            </div>
            <div class="d-flex flex-row-reverse">
                <p class="">{{ calcularTotal()["totalFin"] }}</p>
                <p class="valoresTotales">Total</p>
            </div>                                    
          </div>          
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      datos: Array,
      //datosTotales:Object,
    },
    data(){
      return {
        //datos:[]
      }
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar'); // Emite un evento para cerrar el modal
      },
      calcularTotal(){
        var total15=0;
        var total0=0;
        var totalDescuentos=0;
        var impuesto=0;
        var totalFin=0;
        let respuestasFinales={};    
          for (const item of this.datos) {                          
              if(item.impuesto == 15){                
                total15 += Number(item.cantidad).toFixed(2) * Number(item.precio).toFixed(2);                
              }              
              if(item.impuesto == 0){                
                total0 +=  0
              }
              totalDescuentos+=parseFloat(item.descuento);              
          }
          impuesto =  process.env.IMPUESTO * Number(total15).toFixed(2);
          totalFin = (total15 + impuesto) - totalDescuentos;
          respuestasFinales["total15"] = total15.toFixed(2);  
          respuestasFinales["total0"] = total0.toFixed(2);  
          respuestasFinales["totalDescuentos"] = totalDescuentos.toFixed(2);
          respuestasFinales["impuesto"] = impuesto.toFixed(2);
          respuestasFinales["totalFin"] = totalFin.toFixed(2);
          return respuestasFinales;
      }
    }
  }
  </script>
  <style>
  .margen_derecha{
    margin-right:50px
  }
  .valoresTotales{
    margin-right: 32px;
  }
  </style>