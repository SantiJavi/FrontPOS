<template>
    <AdminTemplate>
       <div slot="body">
        <h4 class="text-center">Administra / Dashboard</h4>
        <div class="text-center">
          <h6 class="badge rounded-pill text-bg-warning">Usuario Logeado: {{ user.user }}</h6>
        </div>                
        <br>
         <div class="row">
             <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">              
               <div class="card">
                 <div class="card-body p-3">                  
                   <div class="row">                    
                     <div class="col-8">
                       <div class="numbers">
                         <p class="text-sm mb-0 text-capitalize font-weight-bold text-center">
                           Número de Facturas Generadas                         
                         </p>
                         <h5 class="font-weight-bolder text-success mb-0 text-center">
                           {{ this.list.numFacturas }}                       
                         </h5>
                       </div>
                     </div>
                     <div class="col-4 text-end">                        
                       <div class="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                         <nuxtLink :to="url_nueva_factura">
                        <i
                           class="fa fa-file-text text-lg opacity-10"
                           aria-hidden="true"
                           title="Generar Nueva Factura"
                         ></i>
                        </nuxtLink>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
               <div class="card">
                 <div class="card-body p-3">
                   <div class="row">
                     <div class="col-8">
                       <div class="numbers">
                         <p class="text-sm mb-0 text-capitalize font-weight-bold text-center">
                            Monto Total Facturado
                         </p>
                         <h5 class="font-weight-bolder text-success mb-0 text-center">
                           $ {{ Number(this.list.totalFacturado).toFixed(2) }}
                         </h5>
                       </div>
                     </div>
                     <div class="col-4 text-end">   
                       <div
                         class="icon icon-shape bg-gradient-success shadow text-center border-radius-md"
                       >
                         <i
                           class="fa fa-usd text-lg opacity-10"
                           aria-hidden="true"
                         ></i>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
               <div class="card">
                 <div class="card-body p-3">
                   <div class="row">
                     <div class="col-8">
                       <div class="numbers">
                         <p class="text-sm mb-0 text-capitalize font-weight-bold text-center">
                            Número Productos Registrados
                         </p>
                         <h5 class="font-weight-bolder text-success mb-0 text-center">
                           {{ this.list.numProductos }}
                         </h5>
                       </div>
                     </div>
                     <div class="col-4 text-end">
                       <div
                         class="icon icon-shape bg-gradient-success shadow text-center border-radius-md"
                       >
                       <nuxtLink :to="url_nuevo_producto">                       
                         <i
                           class="fas fa-shopping-basket text-lg opacity-10"
                           aria-hidden="true"
                           title="Agregar Nuevo Producto"
                         ></i>
                        </nuxtLink>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="col-xl-3 col-sm-6">
               <div class="card">
                 <div class="card-body p-3">
                   <div class="row">
                     <div class="col-8">
                       <div class="numbers">
                         <p class="text-sm mb-0 text-capitalize font-weight-bold text-center">
                            Número de Clientes Registrados
                         </p>
                         <h5 class="font-weight-bolder mb-0 text-success text-center">
                           {{this.list.numClientes}}                           
                         </h5>
                       </div>                       
                     </div>
                     <div class="col-4 text-end">
                       <div
                         class="icon icon-shape bg-gradient-success shadow text-center border-radius-md"
                       >
                       <nuxtLink :to="url_nuevo_cliente">
                         <i
                           class="fas fa-user-circle text-lg opacity-10"
                           aria-hidden="true"
                           title="Agregar Nuevo Cliente"
                         ></i>
                        </nuxtLink>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>                
       </div>
    </AdminTemplate>
   </template>
   
   <script>
   import AdminTemplate from '../components/AdminTemplate.vue';
   export default {
     name: "IndexPage",
     head() {
       return {
         title:'Sys_Facturacion',
       };
     },
     comments :{AdminTemplate },
     data(){
       return {
         user:{},
         apiUrl:'infoDashboard',
         list:[],  
         url_nueva_factura:'/factura/facturas',
         url_nuevo_producto:'/producto/nuevoProducto',
         url_nuevo_cliente:'/cliente/nuevoCliente',

       }
     },
     methods:{
            async GET_DATA(path){
            const res = await this.$api.$get(path);
            return res;
        }
     },
     async mounted(){
      try{
         let userLogin = localStorage.getItem('userAuth');
         this.user = JSON.parse(userLogin);
         if(this.user == null){
            this.$router.push('/auth/login');
         }else{
              await Promise.all([this.GET_DATA(this.apiUrl+'/'+this.user.id)]).then((v)=>{
             this.list = v[0];
             this.numFacturas = this.list.numFacturas
            });
         }            
         }catch(e){
            console.log(e);
         }finally{
            this.load = false; 
         }
     }
   };
   </script>
   