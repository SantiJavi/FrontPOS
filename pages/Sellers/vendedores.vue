<template>
  <div>
  <Loader :load="load"/>
  <AdminTemplate :page="page" :modulo="modulo">
    <div slot="body">
      <div class="row">
        <div class="col-2">
            <nuxtLink :to="url_nuevo" class="btn btn-dark w-100 btn-sm">
                          <i class="fas fa-plus"></i> Agregar Provedor
                        </nuxtLink>
          </div>
        <div class="col-12">       
          <div class="card">
            <div class="card-body">
              <v-data-table :headers="headers" :items="list"
                :search="search"                
                :pagination.sync="pagination"
                class="elevation-1">
                <template v-slot:item="{item}">
                  <tr>
                    <td>{{item.razon_social }}</td>
                    <td>{{item.tipo_identificador }}</td>
                    <td>{{item.numero_documento }}</td>                    
                    <td>{{item.celular }}</td>
                    <td>{{item.correo }}</td>
                    <td>{{item.codigo_vendedor }}</td>                    
                    <td>
                        <nuxt-link :to="url_editar + item.id" class="btn btn-info py-1 px-2">
                          <i class="fas fa-pen"></i>
                        </nuxt-link>
                      </td>
                      <td>
                        <button @click="Eliminar(item.id)" class="btn btn-danger py-1 px-2">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                  </tr>            
                
              </template>
              </v-data-table>
              <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
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
          search:'',
          user:{},
          pagination: {},
          selected: [],
          list:[],
          apiUrl:'vendedors',
          page:'Configuracion',
          modulo:'Vendedores',
          url_nuevo:'/Sellers/nuevoVendedor',
          url_editar:'/Sellers/editar/',
          headers:[
          { text: 'Razón Social', align: 'left', value: 'razon_social' },
          { text: 'Tipo Documento', align: 'left', value: 'tipo_identificador' },
          { text: 'Número de Documento', align: 'left', value: 'numero_documento' },          
          { text: 'Teléfono', align: 'left', value: 'razon_social' },
          { text: 'Correo', align: 'left', value: 'correo' },
          { text: 'Cod. Vendedor', align: 'left', value: 'codigo_vendedor ' },          
          { text: 'Editar', value: '' },
          { text: 'Eliminar', value: '' }
          ]
          
                 
        }
      },
      methods:{
        async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      },
      async EliminarItem(id){
        this.load=true;
        try{
          const res = await this.$api.$delete(this.apiUrl+"/"+id);          
          await Promise.all([this.GET_DATA(this.apiUrl)]).then((v)=>{
            this.list=v[0]
          }) 
        }catch(e){
          console.log(e);
        }finally{
          this.load=false;
        }
        },
        Eliminar(id){
        let self=this;
        this.$swal.fire({        
          title: "Deseas Eliminar?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelarButtonText: `Cancelar`
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await self.EliminarItem(id)
          }
        });
        }
      },
      mounted(){
        this.$nextTick(async()=>{
          try {
            let userLogin = localStorage.getItem('userAuth');
            this.user = JSON.parse(userLogin);
            if(this.user == null){
              this.$router.push('/auth/login');
            }else{
              await Promise.all([this.GET_DATA(this.apiUrl+"/"+this.user.id)]).then((v)=>{
              this.list=v[0]
              });        
            }          
          } catch (e) {
            console.log(e);
          }finally{
            this.load=false;
          }
        })
      },
      computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) 
        return 0;
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
      }
    }
      
  }
  </script>