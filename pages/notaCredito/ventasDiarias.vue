<template>
  <div>
  <Loader :load="load"/>
  <AdminTemplate :page="page" :modulo="modulo">
    <div slot="body">
      <div class="row">
        <div class="col-2">    
          </div>
        <div class="col-12">       
          <div class="card">
            <div class="car-header text-center">
                <h3>Consulta de Ventas Diarias</h3>
              </div>
            <div class="card-body">
            <div class="text-center">
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <input class="form-control form-control-lg fs-5" v-model="model.fecha_emision" type="date">
                  </div>
                  <div class="col-md-auto">
                    <button class="btn btn-primary" @click="Consultar()" >Consultar</button>
                  </div>
                </div>   
              </div> 
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <label for="" class="fs-5">Fecha Consultada: </label>
                  </div>
                  <div class="col-md-auto">
                    <p class="fs-5">{{ this.model.fecha_emision }}</p>
                  </div>
                </div>   
              </div>                        
            </div>
            <div class="container">
            <v-row>              
              <v-col cols="12">
                <v-text-field v-model="search" label="Buscar por RUC o por Nombre de Cliente" @input="searchItems()" />
              </v-col>
            </v-row>                        
              <v-data-table :headers="headers" :items="list"
                            :search="search"                                                                                 
                            class="elevation-1">
                <template v-slot:item="{item}">
                  <tr>                    
                    <td class="fs-6">{{ item.id }}</td>
                    <td class="fs-6">{{ item.fecha_emision }}</td>
                    <td class="fs-6">{{ item.total_grabado }}</td>
                    <td class="fs-6">{{ item.cliente.nombre }}</td>
                    <td class="fs-6">{{ item.tipo_pago}}</td>  
                    <td class="">
                      <button @click="modalAuth()" class="btn btn-info py-1 px-2">
                        <i class="fas fa-pen"></i>
                      </button>
                      <!--
                      <nuxt-link :to="url_editar + item.id" class="btn btn-info py-1 px-2">
                          <i class="fas fa-pen"></i>
                      </nuxt-link>
                      -->
                    </td>


                  </tr>
                </template>
              </v-data-table> 
            </div>
            </div>            
                                      
            <div class="container">              
              <div class="row justify-content-md-center">
                <div class="col-md-auto">
                  <h4><span class="badge badge-secondary">Total Vendido:</span></h4>
                </div>
                <div class="col-md-auto">
                  <h4><span class="badge badge-secondary">$ {{ Number(totalVendido).toFixed(2) }}</span></h4>
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
  
  export default {
      name: 'IndexPage',
      head() {          
          return {                
              title: 'Sys_Facturacion'
          };
      },
      data(){
        return{
          load:true,
          list:[],
          user:{},          
          search: '',          
          apiUrl:'ventasDiarias',
          page:'Agregar',
          modulo:'Ventas Realizadas',
          url_nuevo:'/notaCredito/nota',
          url_editar:'/notaCredito/editar/',
          model:{
            fecha_emision:''
          },
          headers:[
                    
                    { text: 'ID', align: 'left', value: '',sortable:false },
                    { text: 'Fecha de Compra', value: '' },
                    { text: 'Total Comprado', value: '' },                      
                    { text: 'Cliente', value: '',sortable: true  },
                    { text: 'Tipo de Venta', value: '', sortable: true  },
                    { text: 'Editar', value: ''}],

        }
      },
      methods:{
        async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      },
      async Consultar(){            
        if(this.model.fecha_emision == ""){
            this.alertaMensaje("Error","La fecha de Consulta no puede estar vacia","error");
        }else{
          const response = await this.$api.$post(this.apiUrl,this.model);        
          this.list = response;
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
      modalAuth(){
        this.$swal.fire({
          title: "Ingrese la clave para realizar el cambio",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Ingresar",
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
            try {
              const githubUrl = `
                https://api.github.com/users/${login}
              `;
              const response = await fetch(githubUrl);
              if (!response.ok) {
                return this.$swal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
              }
              return response.json();
            } catch (error) {
              this.$swal.showValidationMessage(`
                Request failed: ${error}
              `);
            }
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              title: `${result.value.login}'s avatar`,
              imageUrl: result.value.avatar_url
            });
          }
        });   
      }
    },
      computed:{
        totalVendido(){
          return this.list.reduce((total,m)=>{            
            const subtotal = parseFloat(m.total_grabado);
            return total + subtotal;
          },0);
        }        
      },
      async mounted(){
      try {
        let loginUser = localStorage.getItem('userAuth');
        this.user = JSON.parse(loginUser);
        if(this.user == null){
          this.$router.push('/auth/login');
        }else{
        }       
    } catch (e) {
      console.log(e);
    } finally {
      this.load = false;
    }        
    }
}
  </script>
  