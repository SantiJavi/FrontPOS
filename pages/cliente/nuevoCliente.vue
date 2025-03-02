<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Agregar Clientes</h3>
                </div>
                <div class="card-body">                    
                        <div class="row" slot="body">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="" class="fs-6">Tipo de Identificación</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.tipo_identificador">
                                        <option value="RUC">RUC</option>
                                        <option value="CEDULA">Cedula</option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                        <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                                        <option value="IDENTIFICACION_EXTERIOR">Identificación del Exterior</option>                                        
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="" class="fs-6">Número de Identificación</label>
                                    <input type="text" v-model="model.numero_documento" name="" class="form-control" id="" maxlength="10">
                                </div>
                                <div class="form-group">
                                    <label for="" class="fs-6">Nombre</label>
                                    <input type="text" v-model="model.nombre" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="" class="fs-6">Correo</label>
                                    <input type="email" v-model="model.correo" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="" class="fs-6">Teléfono</label>
                                    <input type="text" v-model="model.telefono" name="" class="form-control" id="" maxlength="10">                        
                                </div>
                                <div class="form-group">
                                    <label for="" class="fs-6">Dirección</label>
                                    <input type="text" v-model="model.direccion" name="" class="form-control" id="">                        
                                </div>
                            </div>
                        </div>                        
                      <div class="row">
                        <div class="col-6">
                          <button class="btn btn-dark w-100 fs-6" @click="$router.back()">Regresar</button>
                        </div>
                        <div class="col-6">
                          <button class="btn btn-info w-100 fs-6" @click="Save()">Guardar</button>
                        </div>
                      </div>                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </div>
  </template>
  
  <script>  
  import AdminTemplate from '../../components/AdminTemplate.vue';
  import {validacionSoloNumeros,validacionSoloLetras,validacionCorreo} from '/utils/validaciones';

  export default {
    name: 'IndexPage',
    head() {
      return {
        title: 'Sys_Facturacion'
        
      };
    },
    data() {
      return {
        load: false,
        user:{},      
        model: {
          tipo_identificador: '',
          numero_documento: '',
          nombre: '',
          correo: '',
          telefono: '',
          direccion: '',
          id_usuario:'',
        },
        apiUrl:'clientes',
        page:'Agregar',
        modulo:'Nuevo Cliente'
      }
    },
    methods: {
      async Save() {        
        this.load = true;            
        if(!this.validacionNulos()){
          this.alertaMensaje("CAMPOS INCOMPLENTOS","Por favor complete los campos obligatorios","error");
          this.load=false;
        }else if(!this.validacionDocumento(this.model.tipo_identificador,this.model.numero_documento)){
          this.alertaMensaje("ATENCION","Tiene un error en el Tipo de Identificación y el Número de Documento","info");
          this.load=false;
        }else if(!validacionSoloNumeros(this.model.numero_documento)){
          this.alertaMensaje("ATENCION","Solo se permiten números en el campo Número de Identificación","info");
          this.load=false;
        }else if(!validacionCorreo(this.model.correo)){
          this.alertaMensaje("ATENCION","El correo ingresado no sigue un formato valido","info");
          this.load=false;
        }else if(!validacionSoloLetras(this.model.nombre)){
          this.alertaMensaje("ATENCION","Solo se permiten letras en el campo Nombre","info");
          this.load=false;
        }else{                    
          try {
          const res = await this.$api.$post(this.apiUrl, this.model);            
          if(res.code === 500){
            this.alertaMensaje("ERROR",res.message,"error");
          }else{
            this.$swal.fire({
            title: "Dato Guardado",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok"
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.back();
            }
          })
          } 
        } catch (e) {          
        } finally {
          this.load = false;
        } 
        }
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
      validacionDocumento(tipoIdentificador,numeroDocumento){
        if(tipoIdentificador=='RUC'){                      
          return numeroDocumento.length!=13 ? false : true;            
        }
        if(tipoIdentificador=='CEDULA'){
          return numeroDocumento.length!=10 ? false : true;
        }
      },
      validacionNulos(){
        if(this.model.numero_documento.trim().length == 0 || this.model.tipo_identificador.trim().length==0
        || this.model.correo.trim().length==0 ){
          return false;
        }else{
          return true;
        }
      },      
    },
    mounted() {
      this.$nextTick(async () => {
        try {
          let userLogin = localStorage.getItem('userAuth');
          this.user = JSON.parse(userLogin);
          if(this.user == null){
            this.$router.push('/auth/login');
          }else{
            this.model.id_usuario = this.user.id;
          }          
        } catch (e) {
          console.log(e);
        }
      })
    }
  
  }
  </script>
  