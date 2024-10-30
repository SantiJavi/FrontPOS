<template>
  <main class="main-content main-content-bg mt-0 ps">
   <section>
     <div class="page-header min-vh-75">
       <div class="container">
         <div class="row">
           <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
             <div class="card card-plain mt-8">
               <div class="card-header pb-0 text-start">
                 <h3 class="font-weight-bolder text-info text-gradient">
                  Sistema de Facturación
                 </h3>
                 <p class="mb-0">Ingrese al nuevo Usuario</p>
               </div>
               <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <label>RUC </label>
                      <div class="mb-1">
                        <input
                          type="text"
                          v-model="model.ruc"
                          class="form-control"
                          placeholder="RUC"
                          aria-label="RUC"
                          
                        />
                      </div>
                    </div>
                    <div class="col">
                      <label>Password</label>
                      <div class="mb-1">
                          <input
                            type="password"
                            v-model="model.password"
                            class="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            
                          />
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <label>Correo</label>
                      <div class="mb-1">
                        <input
                          type="email"
                          v-model="model.correo"
                          class="form-control"
                          placeholder="Correo"
                          aria-label="Password"
                          
                        />
                      </div>
                    </div>
                    <!--div class="col">
                      <label>Autorización</label>
                      <div class="mb-1">
                        <input
                          type="password"            
                          v-model="model.autorizacion"           
                          class="form-control"
                          placeholder="# Autorizacion"
                          aria-label="Password"
                          @keyup.enter="Register()"
                        />
                      </div>
                    </div-->
                 </div>
                  <div class="row">
                    <div class="col">
                      <label>Fecha de Registro</label>
                      <div class="mb-1">
                        <input
                          type="date"            
                          v-model="model.fecha_registro"           
                          class="form-control"
                          placeholder="# Autorizacion"
                          aria-label="Password"
                          
                        />
                      </div>
                    </div>
                    <div class="col">
                      <label>Fecha de Expiración</label>
                      <div class="mb-1">
                        <input
                          type="date"            
                          v-model="model.fecha_expiracion"           
                          class="form-control"
                          placeholder="# Autorizacion"
                          aria-label="Password"
                          
                        />
                      </div>
                    </div>                     
                  </div>
                </div>
                   <div class="text-center">
                     <button
                       type="button"
                       class="btn bg-gradient-info w-100 mt-4 mb-0"
                      @click="Register()"
                     >
                       Registrar
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>           
         </div>
       </div>     
   </section>
   <div class="ps__rail-x" style="left: 0px; bottom: 0px">
     <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px"></div>
   </div>
   <div class="ps__rail-y" style="top: 0px; right: 0px">
     <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px"></div>
   </div>
 </main>
</template>
<script>
 export default{
  data(){
      return{
          model:{
              ruc:'',
              password:'',
              correo:'',
              fecha_registro:'',
              fecha_expiracion:'',
              autorizacion:'',
              user:''
          }
      }
  },
  methods:{
    async Register(){
            try{              
              if(this.model.ruc.trim().length != 13){
                this.alertaMensaje("RUC invalido","El RUC debe tener 13 digitos","info");
              }else{
                if(!this.validacionNulos(this.model.ruc,this.model.password,this.model.correo,this.model.fecha_registro,this.model.fecha_expiracion)){
                this.alertaMensaje("ERROR","Todos los campos deben estar llenos","error");
              }
              else{
                const res=await this.$api.$post('user',this.model);
                this.$swal.fire({
                title: "Dato Guardado",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Ok"
                }).then((result)=>{
                  if (result.isConfirmed) {
                    this.$router.push('/auth/login');
                    localStorage.removeItem('userAuth');
                  }
                })
              }
              }              
            }catch(e){
              console.log(e);            
            } finally{
              this.load= false;
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
        validacionNulos(ruc,password,correo,fechaRegistro,fechaExpiracion){
            if(ruc.trim() == "" || ruc.trim() == null || password.trim() == null || 
              password.trim() == "" || correo.trim() == null || correo.trim() == "" ||
              fechaRegistro.trim() == null || fechaRegistro.trim() == "" ||
              fechaExpiracion.trim() == null || fechaExpiracion.trim() ==""){
                return false;
            }
            return true;
        }
  },
  mounted(){
    try{
      let userLogin = localStorage.getItem('userAuth');
      this.user = JSON.parse(userLogin);
      if(this.user == null){
        this.$router.push('/auth/login');
      }
    }catch(error){
      console.log(error);
    }
  }

 }
</script>
