<template>
    <div>
    <Loader :load="load"/>          
        <div class="row container-fluid">
          <div class="col-12">
            <div class="text-center mt-3">
                <h2>Administracion de usuarios y contraseñas</h2>
            </div>
            <div class="card">
              <div class="card-body">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="search" label="Buscar por RUC o por Nombre de Cliente" @input="searchItems()" />
                </v-col>
              </v-row>
                <v-data-table :headers="headers" :items="list"
                              :search="search"                                                            
                              :pagination.sync="pagination"                              
                              class="elevation-1">
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{ item.ruc }}</td>
                      <td>{{ item.user }}</td>
                      <td>{{ item.correo }}</td>
                      <td>{{ item.fecha_registro }}</td>                      
                      <td>{{ item.fecha_expiracion }}</td>
                      <td>
                        <nuxt-link :to="url_editar+ item.id" type="button" class="btn btn-info py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </nuxt-link>
                      </td>                                                                                                          
                    </tr>
                  </template>
                </v-data-table>                
              </div>          
            </div>
            <div class="container text-center col-3">
                <div>
                    <button @click="LogOut()" class="btn btn-primary w-100 btn-sm">
                                    <i class="fas fa-exit"></i> Salir
                    </button>
                </div>
            </div>         
          </div>
        </div>
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
            //user:{},
            facturas:[],
            search: '',
            pagination: {},            
            selected: [],
            currentPage:1,
            apiUrl:'autorizaciones',
            page:'Agregar',
            url_editar: '/auth/editar/',            
            url_nuevo:'/auth/login',            
            url_pdf: process.env.URL_PDF +"/facturas/",
            url_xml: process.env.URL_XML+"/descargar_factura/",
            headers:[
                      
                      { text: 'RUC', align: 'left', value: '',sortable:false },
                      { text: 'User', value: 'user.user' },
                      { text: 'Correo', value: 'user.correo' },                      
                      { text: 'Fecha Registro', value: 'user.fecha_registro',sortable: true  },
                      { text: 'Fecha Expiración', value: 'user.fecha_expiracion', sortable: true  },                      
                      { text: 'Editar', value: '' }],
          }
        },
        methods:{
          async GET_DATA(path) {
          const res = await this.$api.$get(path);
          return res;
        },
        LogOut(){
        localStorage.removeItem('userAuth');
        this.$router.push('/auth/login');
      },      
        searchItems(){                          
          if(this.search==''){
            this.list = this.facturas;
          }else{
            let buscarRegistro = this.facturasFilter;                    
            if(buscarRegistro.length>0)
            {                              
              this.list = this.facturasFilter;                                 
            }
          }                    
        },
        },
        async mounted(){
        try {
          let loginUser = localStorage.getItem('userAuth');
          this.user = JSON.parse(loginUser);          
          if(this.user == null){
            this.$router.push('/auth/login');
          }else{
                if(this.user.ruc == "1792106052001"){
                    this.$router.push('/auth/UsersAdmin');
                        await Promise.all([this.GET_DATA('showAllUsersIdentifier')]).then((v)=>{
                            this.list = v[0];
                        });                                                                    
                }else{
                    this.$router.push('/auth/login');
                }           
            };                                
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }        
      },
      computed: {
        facturasFilter() {
          let buscar = this.search.toLowerCase().trim(); // Convertir a minúsculas y quitar espacios en blanco
          if (!buscar) {
            return this.list;
          }          
          return this.list.filter((item) => {            
            const cliente = item.factura.cliente;            
            const numeroDocumento = cliente.numero_documento ? cliente.numero_documento.trim() : '';
            const nombre = cliente.nombre ? cliente.nombre.toLowerCase().trim() : '';             
            return numeroDocumento.includes(buscar) || nombre.includes(buscar);
            });
      },        
    }
  }
    </script>
    