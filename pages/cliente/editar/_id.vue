<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Actualizar Cliente</h3>
                </div>
                <div class="card-body">
                  <!--CrudUpdate :model="model" :apiUrl="apiUrl"-->
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
                                    <input type="text" v-model="model.numero_documento" name="" class="form-control" id="">
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
                  <!--/CrudUpdate-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </div>
  </template>    
  <script>
  import {datoActualizado,validacionSoloNumeros,validacionSoloLetras,validacionCorreo,alertaMensaje} from '/utils/validaciones';
  export default {
    name: 'IndexPage',
    head() {
      return {
        title: 'Sys_Facturacion'
      };
    },
    data() {
      return {
        load: true,
        user:{},
        model: {
          tipo_identificador: '',
          numero_documento: '',
          nombre: '',
          correo: '',
          telefono: '',
          direccion: '',
          user_id:''
        },
        apiUrl: 'clientes',
        page: 'Agregar',
        modulo:'Actualizar Cliente'
      }
    },
    methods: {
      async Save(){
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
          const res = await this.$api.$put(this.apiUrl+"/"+this.model.id, this.model);          
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
          });
          }       
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false;
        } 
        }
      },
      async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      },
      validacionNulos(){
        if(this.model.numero_documento.trim().length == 0 || this.model.tipo_identificador.trim().length==0
        || this.model.correo.trim().length==0 ){
          return false;
        }else{
          return true;
        }
      },
      validacionDocumento(tipoIdentificador,numeroDocumento){
        if(tipoIdentificador=='RUC'){                      
          return numeroDocumento.length!=13 ? false : true;            
        }
        if(tipoIdentificador=='CEDULA'){
          return numeroDocumento.length!=10 ? false : true;
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
    },
    mounted() {
      this.$nextTick(async () => {
        try {
          let userLogin = localStorage.getItem('userAuth');
          this.user = JSON.parse(userLogin);
          this.model.user_id = this.user.id;
          await Promise.all([this.GET_DATA('clientesId/' + this.$route.params.id)]).then((v) => {
            this.model = v[0]
          })
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      })
    }
  
  }
  </script>
      