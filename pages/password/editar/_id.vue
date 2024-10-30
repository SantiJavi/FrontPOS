<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Actualizar Contraseña</h3>
                </div>
                <div class="card-body">
                  <!--CrudUpdate :model="model" :apiUrl="apiUrl"-->
                    <div class="row" slot="body">
                        <div class="col-12">
                                <div class="form-group">
                                    <label for="">RUC</label>
                                    <input type="text" v-model="model.ruc" name="" class="form-control" id="" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="">User</label>
                                    <input type="text" v-model="model.user" name="" class="form-control" id="" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" v-model="model.password" name="" class="form-control" id="">
                                </div>
                                <div class="row">
                                <div class="col-6">
                                  <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                                </div>
                                <div class="col-6">
                                  <button class="btn btn-info w-100" @click="Save()">Guardar</button>
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
        clave:'',
        model: {
          ruc: '',
          user: '',          
          user_id:''
        },
        apiUrl: 'usuarios',
        page: 'Agregar',
        modulo:'Actualizar Cliente'
      }
    },
    methods: {
      async Save(){
        this.load = true;
        if(!this.validacionNulos()){
          this.alertaMensaje("ERROR","Campo contraseña No puede estar vacio","error");
          this.load=false;
        }else{
          try {          
          const res = await this.$api.$put("/changepassword"+"/"+this.model.id, this.model);          
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
        if(this.model.password.trim().length == 0 ){
          return false;
        }else{
          return true;
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
          await Promise.all([this.GET_DATA('usuarios/' + this.$route.params.id)]).then((v) => {
            this.model = v[0];
            this.model = this.model[0];
            this.model.password='';
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
      