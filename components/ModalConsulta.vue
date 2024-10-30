<template>
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }} {{ nombreCliente }}</h5>              
              <button type="button" class="close" @click="cerrarModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">      
              <div class="container">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">Fecha</th>
                      <th scope="col" class="text-center">Cantidad</th>
                      <th scope="col" class="text-center">Producto</th>
                      <th scope="col" class="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for = "item in datos"
                    :key="item.id">                    
                    <td class="text-center">{{ item.fecha_emision }} </td>
                    <td class="text-center">{{ item.cantidad }} </td>
                    <td class="text-center">{{ item.nombre_producto }} </td>
                    <td class="text-center">{{ item.subtotal }} </td>
                    </tr>                                                       
                  </tbody>                  
                </table>         
              </div>                
                <button type="button" class="btn bg-gradient-dark w-100 mb-0">Imprimir Detalle</button>
            </div>                                
            <div class="modal-footer">
              <button type="button" class="btn btn-primary text-white" @click="cerrarModal">Cerrar</button>
            </div>
          </div>            
        </div>    
    </div>
  </template>
  
  <script>

  export default {
    props: {
      title: String,
      nombreCliente:String,
      datos: {
        type: Array,
        default: () => [] // Inicializa `datos` como un array vacío
      }
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
        headers:[                                            
                      { text: 'Fecha', value: '' },
                      { text: 'Cantidad', value: '' },                      
                      { text: 'Producto', value: '',sortable: true  },
                      { text: 'Precio', value: '', sortable: true  }                      
          ],
      }
    },
    methods: {      
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
    }    
    },
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