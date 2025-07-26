<template>
    <div class="modal" tabindex="0" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}{{ usuario }}</h5>
              <button type="button" class="close" @click="cerrarModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">      
              <div class="container">                 
                  <div class="row">
                      <h3 class="col">Cod Producto: </h3>                      
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <input type="text" class="form-control fs-4" v-model="model.codigo_producto">
                          </div>
                          <div class="col">
                            <button type="button" class="btn btn-primary text-white" @click="generarCodigo()">Generar Codigo</button>
                          </div>
                        </div>                        
                      </div>
                  </div>
                  <div class="row">
                    <h3 class="col">Nombre Producto: </h3>
                    <div class="col">
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control fs-4" v-model="model.nombre_producto">
                        </div>
                      </div>
                    </div>                    
                  </div>
                  <div class="row">
                    <h3 class="col">Precio Producto:</h3>
                    <div class="col">
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control fs-4" v-model="model.precio_producto">
                        </div>
                      </div>
                    </div>
                  </div>                                          
                </div>                
                <button type="button" class="btn bg-gradient-dark w-100 mb-0" @click="Save()" :disabled="estadoBoton">Guardar Producto</button>                
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
      usuario: Number,
      codigoProducto: String     
    },
    data(){
      return {
        model :{
          codigo_producto: '',
          nombre_producto: '',
          precio_producto: '',
          codigo_aux: '',
          impuesto_ice: '0',
          impuesto_iva: '15',
          descuento: '0.00',
          user_id: ''
        },        
        apiUrl: 'productos',
        estadoBoton:false,
      }
    },
    methods: {     
      handleKeyUp(event) {
        if (event.key === "Escape") {
            this.cerrarModal();
          }
      },        
      cerrarModal() {
        this.$emit('cerrar'); // Emite un evento para cerrar el modal
      },      
      generarCodigo(){          
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
        this.estadoBoton=true;
        this.model.user_id=this.usuario;    
        if(this.model.codigo_producto=='' || this.model.nombre_producto=='' || this.model.precio_producto==''){
          this.alertaMensaje("Error","Todos los campos son obligatorios","error");
          this.estadoBoton=false;          
        }else{                      
        const res = await this.$api.$post(this.apiUrl,this.model);        
        if(res.code == 500) {          
          this.alertaMensaje("Error al Guardar",res.message,"error");
          this.estadoBoton=false; 
        }else if(res.code == 200){
          this.alertaMensaje("Guardado","Producto Guardado Correctamente","success");
          this.estadoBoton=false;          
          this.limpiarCampos();
          this.$emit('guardar', true);
          // emitir una bandera que indique la creacion y en el padre actualizar la API de productos                             
        }       
      }        
    },
    limpiarCampos(){
        this.model.codigo_producto='';
        this.model.nombre_producto='';
        this.model.precio_producto='';
        this.$emit('cerrar');                  
    },
    trimModelo(objeto){
      objeto.codigoProducto = objeto.codigo_producto.trim();
      objeto.nombreProducto = objeto.nombre_producto.trim();
      objeto.precioProducto = objeto.precio_producto.trim(); 
    },
    },
    mounted(){      
      window.addEventListener("keyup", this.handleKeyUp);      
    },
    beforeDestroy() {
      window.removeEventListener("keyup", this.handleKeyUp);
    },
    watch: {
      codigoProducto:{
        immediate: true,
        handler(value) {
          this.model.codigo_producto = value
        }
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