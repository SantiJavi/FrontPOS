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
              <div class="container"> 
                <div class="row">
                  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="efectivo" v-model="tipoPago" autocomplete="off" checked>
                    <label class="btn btn-outline-dark" for="btnradio1">Efectivo</label>                
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="credito" v-model="tipoPago" autocomplete="off">
                    <label class="btn btn-outline-dark" for="btnradio2">Crédito</label>
                  </div>
                </div>                             
                <div class="row">
                  <div class="col">
                    <h3>Cliente:</h3>
                  </div>
                  <div class="col">
                    <h3>{{ cliente }}</h3>
                  </div>
                </div>
                  <div class="row">
                    <div class="col">
                      <h3>Total a Cobrar: </h3>
                    </div>
                    <div class="col">
                      <h3>$ {{ Number(total).toFixed(2) }}</h3></div>
                  </div>
                  <div class="row">
                      <h3 class="col">Pagado: </h3>                      
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <input type="text" class="form-control fs-4" v-model="model.pago" @keyup.enter="Save()">
                          </div>
                          <div class="col">
                            <button type="button" class="btn btn-primary text-white" @click="pagoJusto()">Pago Justo</button>
                          </div>
                        </div>                        
                      </div>
                  </div>
                  <div class="row">
                    <h3 class="col">Cambio: </h3>
                    <div class="col"><h3>$ {{ calcularCambio }}</h3></div>
                  </div>                                            
                </div>                
                <button type="button" class="btn bg-gradient-dark w-100 mb-0" @click="Save()">Guardar Venta</button>                
            </div>                                
            <div class="modal-footer">
              <button type="button" class="btn btn-primary text-white" @click="cerrarModal">Cerrar</button>
            </div>
          </div>            
        </div>    
    </div>
  </template>
  
  <script>
import { computed } from 'vue';

  export default {
    props: {
      title: String,
      datos: Array,
      total: Number,
      cliente:String,
      secuenciales:Object,      
      datos_adicionales: Object
      //datosTotales:Object,
    },
    data(){
      return {
        model :{
          pago:null
        },
        totalCampo : this.total,
        totalCambio:0,
        tipoPago: 'efectivo',
        apiUrl: 'venta',
      }
    },
    methods: {     
      Emision(){
        console.log("Funciona");
      },      
      cerrarModal() {
        this.$emit('cerrar'); // Emite un evento para cerrar el modal
      },
      alertaMensajeRouter(titulo){
      this.$swal.fire({
          title: titulo,          
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.go(0);
          }
        })
    },
      pagoJusto(){
          this.model.pago = this.total          
      },      
      alertaMensaje(titulo,mensaje,tipo){
      this.$swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonText: "Ok"
      }).then((result)=>{
        if (result.isConfirmed) {                      
        }
      });
    },
      async Save(){
        const operacion = {
          fecha_emision: this.datos_adicionales.fecha_emision,
          tipo_pago:this.tipoPago,          
          secuencial_sec:this.secuenciales.sec_sig_not_cred,
          total_grabado:Number(this.total).toFixed(2),
          secuencial_id:this.datos_adicionales.secuencial_id,
          cliente_id:this.datos_adicionales.cliente_id,
          carrito:this.datos,
          fecha_pago: null,                    
        }
        console.log(operacion);                               
        if( operacion.cliente_id=="" || operacion.total_grabado=="" || operacion.cliente_id === undefined || operacion.total_grabado === undefined){
          this.alertaMensaje("ERROR","Por favor elija el cliente o seleccione productos para procesar la compra","error");
        }else if(operacion.total_grabado == 0){
          this.alertaMensaje("ATENCION","El valor de la Venta no puede ser Cero. No se puede Registrar la Venta","info");
        }else if(operacion.cliente_id == '2' && operacion.tipo_pago == 'credito'){                    
          this.alertaMensaje("ATENCION","El Cliente Consumidor Final no puede tener Crédito","error");
        }else{
            if(operacion.tipo_pago == "efectivo") {
                operacion.fecha_pago = operacion.fecha_emision
            }
            const res = await this.$api.$post(this.apiUrl,operacion);
            this.alertaMensajeRouter(res);            
        }          
      }
    },
    computed:{
      calcularCambio(){        
        this.totalCambio = this.total - this.model.pago;
        if(this.totalCambio < 0){
          this.totalCambio = Math.abs(this.totalCambio);
          return  Number(this.totalCambio).toFixed(2);     
        }
        return  Number(this.totalCambio * (-1) ).toFixed(2);                    
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