<template>
    <div>
      <Loader :load="load" />        
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center mt-3">
                  <h3>Actualizar Usuario Registrado</h3>
                </div>
                <div class="card-body">                  
                    <div class="row" slot="body">
                      <div class="col-12">
                        <div class="form-group">
                            <label for="">RUC</label>
                            <input type="text" v-model="model.ruc" name="" class="form-control" id="">
                        </div>
                        <div class="form-group">
                            <label for="">USER</label>
                            <input type="text" v-model="model.user" name="" class="form-control" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Correo</label>
                            <input type="email" v-model="model.correo" name="" class="form-control" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Fecha de Registro</label>
                            <input type="date" v-model="model.fecha_registro" name="" class="form-control" id="">                        
                        </div>
                        <div class="form-group">
                            <label for="">Fecha de Expiración</label>
                            <input type="date" v-model="model.fecha_expiracion" name="" class="form-control" id="">                        
                        </div>
                        <div class="form-group">
                            <label for="">Contraseña</label>
                            <input type="password" v-model="model.pass" name="" class="form-control" id="">                        
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
                </div>
              </div>
            </div>
          </div>              
    </div>
  </template>    
  <script>  
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
          ruc: '',
          user: '',
          correo: '',
          fecha_registro: '',
          fecha_expiracion:'',
          pass:''          
        },
        apiUrl: 'user'
      }
    },
    methods: {
      async Save(){
        this.load = true;        
        try{          
        if(!typeof this.model.pass === "undefined"){                    
          if(this.model.pass.length < 8){
            this.$swal.fire({
                title: "La contraseña debee ser minima de 8 caracteres",
                showDenyButton: false,
                showCancelButton: false,
                icon:"error",
                confirmButtonText: "Ok"
            }).then((result)=>{
              
            });            
          }          
        }else{          
          const res = await this.$api.$put(this.apiUrl+"/"+this.model.id,this.model);
          if(res.code==500){
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
        } 
        }catch(e){
          console.log(e);
        }finally{
          this.load = false;
        }
      },
      async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      }
    },
    mounted() {
      this.$nextTick(async () => {
        try {          
          await Promise.all([this.GET_DATA('user/' + this.$route.params.id)]).then((v) => {
            this.model = v[0];            
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
      