<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="car-header text-center">
                <h3>Actualizar Vendedor</h3>
              </div>
              <div class="card-body">
                <!--CrudUpdate :model="model" :apiUrl="apiUrl"-->
                  <div class="row" slot="body">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Tipo de Identificación</label>
                          <select class="form-select" aria-label="Default select example" v-model="model.tipo_identificador">
                                          <option value="RUC">RUC</option>
                                          <option value="CEDULA">Cedula</option>
                                          <option value="PASAPORTE">Pasaporte</option>
                                          <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                                          <option value="IDENTIFICACION_EXTERIOR">Identificación del Exterior</option>                                        
                          </select>
                      </div>                      
                      <div class="form-group">
                        <label for="">Número de Documento</label>
                        <input type="text" v-model="model.numero_documento" name="" class="form-control" id="">
                      </div>
                      <div class="form-group">
                        <label for="">Razon Social</label>
                        <input type="text" v-model="model.razon_social" name="" class="form-control" id="">
                      </div>           
                      <div class="form-group">
                        <label for="">Teléfono</label>
                        <input type="text" v-model="model.celular" name="" class="form-control" id="" maxlength="10">
                      </div>
                      <div class="form-group">
                        <label for="">Correo</label>
                        <input type="email" v-model="model.correo" name="" class="form-control" id="">
                      </div>
                      <div class="form-group">
                        <label for="">Código Vendedor</label>
                        <input type="text" v-model="model.codigo_vendedor" name="" class="form-control" id="" readonly>
                      </div>
                      <!--div class="form-group">
                        <label for="">Empresa</label>
                        <input type="text" v-model="model.empresa" name="" class="form-control" id="">
                      </div-->
                    </div>
                  </div>
                  <div class="row">
                        <div class="col-6">
                          <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                        </div>
                        <div class="col-6">
                          <button class="btn btn-info w-100" @click="Save()">Guardar</button>
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
      load: true,
      model: {
        tipo_identificador:'',
        numero_documento: '',
        razon_social:'',
        codigo_vendedor: '',
        celular: '',
        empresa: '',
        correo:''
      },
      apiUrl: 'vendedors',
      page: 'Configuracion',
      modulo:'Vendedores'
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Save (){
      this.load = false;      
      if(!this.validacionNulos()){
        this.alertaMensaje("CAMPOS INCOMPLENTOS","Por favor complete los campos obligatorios","error");
        this.load=false;
      }else if(!this.validacionDocumento(this.model.tipo_identificador,this.model.numero_documento)){
        this.alertaMensaje("ATENCION","Tiene un error en el Tipo de Identificación y el Número de Documento","info");
        this.load=false;
      }else if(!validacionSoloNumeros(this.model.numero_documento)){
        this.alertaMensaje("ATENCION","Solo se permiten números en el campo Número de Identificación","info");
        this.load = false;
      }else if(!validacionSoloNumeros(this.model.celular)){
        this.alertaMensaje("ATENCION","Solo se permiten números en el campo Número de Identificación","info");
        this.load = false;
      }else if(!validacionCorreo(this.model.correo)){
        this.alertaMensaje("ATENCION","El correo ingresado no sigue un formato valido","info");
        this.load=false;
      }else if(!validacionSoloLetras(this.model.razon_social)){
          this.alertaMensaje("ATENCION","Solo se permiten letras en el campo Razon Social","info");
          this.load=false;
      }else{
        try{
          const res = await this.$api.$put(this.apiUrl+"/"+this.model.id,this.model);
          if(res.code===500){
            this.alertaMensaje("ERROR",res.message,"error");
          }else{
            this.$swal.fire({
            title: "Dato Guardado",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok"            
          }).then((result) =>{
            if(result.isConfirmed){
              this.$router.back();
            }
          })
          }

        }catch(e){          
        }finally{
          this.load= false;
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
      if(this.model.numero_documento.trim().length == 0 || this.model.tipo_identificador.trim().length == 0 
        || this.model.razon_social.trim().length == 0 || this.model.correo.trim().length == 0 
        || this.model.codigo_vendedor.trim().length == 0
      ){
        return false;
      }else{
        return true;
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('proveedor/' + this.$route.params.id)]).then((v) => {
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
    