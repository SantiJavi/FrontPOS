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
                   <p class="mb-0">Ingresa tu RUC y tu Contraseña para Iniciar Sesión.</p>
                 </div>
                 <div class="card-body">
                   <div role="form" class="text-start">
                     <label>RUC </label>
                     <div class="mb-3">
                       <input
                         type="text"
                         v-model="model.user "
                         class="form-control"
                         placeholder="usuario"
                         aria-label="text"
                         @keyup.enter="Login()"
                       />
                     </div>
                     <label>Password</label>
                     <div class="mb-3">
                       <input
                         type="password"
                         v-model="model.password"
                         class="form-control"
                         placeholder="Password"
                         aria-label="Password"
                         @keyup.enter="Login()"
                       />
                     </div>
 
                     <div class="text-center">
                       <button
                         type="button"
                         class="btn bg-gradient-info w-100 mt-4 mb-0"
                        @click="Login()"
                       >
                         Ingresar
                       </button>
                     </div>
                   </div>
                 </div>
 
               </div>
             </div>
             <div class="col-md-6">
               <div
                 class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8"
               >
                 <!--div
                   class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                   style="background-image: url('/assets/img/curved-images/curved9.jpg');"
                 ></div-->
                 <div
                   class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                   style="background-image: url('/assets/img/curved-images/curved9.jpg');"
                 ></div>

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

 import {getFechaActual} from '/utils/fechas';

   export default{    
    data(){
        return{
            model:{
                user:'',
                password:''
            }
        }
    },
    methods:{
        async Login(){
            try{
                const res=await this.$api.$post('login',this.model);                
                let user = res;                
                if(user.hasOwnProperty('errors')){
                    this.$swal.fire({
                    title: "Credenciales Incorrectas",
                    showDenyButton: false,
                    showCancelButton: false,
                    icon:"error",
                    confirmButtonText: "Ok"
                    });
                }else{                    
                    if(this.vigente(user)){                      
                      localStorage.setItem('userAuth',JSON.stringify(user));
                      this.$router.push('/');                      
                    }else{
                      this.$swal.fire({
                      title: "Su cuenta Expiro. Por favor comuniquese con el administrador",
                      showDenyButton: false,
                      showCancelButton: false,
                      icon:"error",
                      confirmButtonText: "Ok"
                      });
                    }
                    
                }                
            }catch(e){                      
                this.$swal.fire({
                title: "No se pudo Iniciar Sesion",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Ok"
                });
            }
        },
        vigente(usuario){             
          var fechaExpiracion = new Date(usuario.fecha_expiracion);          
          return getFechaActual() <= fechaExpiracion ? true : false;        
        },
      
    }
 
   }
 </script>
<style>
