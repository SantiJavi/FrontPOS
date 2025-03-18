<template>
    <div>
    <Loader :load="load"/>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">
          <div class="col-2">
              <nuxtLink :to="url_nuevo" class="btn btn-dark w-100 fs-6">
                            <i class="fas fa-plus"></i> Agregar
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
                      <td class="fs-6">{{ item.nombre }}</td>
                      <td class="fs-6">{{ item.tipo_identificador }}</td>
                      <td class="fs-6">{{ item.numero_documento }}</td>                      
                      <td class="fs-6">{{ item.correo }}</td>
                      <td class="fs-6">{{ item.telefono }}</td>
                      <td class="fs-6">{{ item.direccion }}</td>                      
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
            search: '',
            user:{},
            pagination: {},
            selected: [],
            list:[],
            apiUrl:'clientes',
            page:'Agregar',
            modulo:'Clientes',
            url_nuevo:'/cliente/nuevoCliente',
            url_editar:'/cliente/editar/',
            headers:[ { text: 'Nombres', value: 'nombre' },
                      { text: 'Tipo Documento', align: 'left', value: 'tipo_identificador' },
                      { text: 'Número de Documento', value: 'numero_documento' },                      
                      { text: 'Correo', value: 'correo' },
                      { text: 'Teléfono', value: 'telefono' },
                      { text: 'Dirección', value: 'direccion' },                      
                      { text: 'Editar', value: '' },
                      { text: 'Eliminar', value: '' },],
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
        pages() {
          if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
          ) return 0;
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
  }        
}
</script>
    