<template>
<div>
<Loader :load="load"/>
<AdminTemplate :page="page" :modulo="modulo">
  <div slot="body">
    <div class="row">
      <div class="col-2">
          <nuxtLink  v-if="mostrarBoton" :to="url_nuevo" class="btn btn-dark w-100 btn-sm">
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
                      <td>{{ item.usuarios.ruc }}</td>
                      <td>{{ item.nombre_comercial }}</td>
                      <td>{{ item.razon_social }}</td>
                      <td>{{ item.direccion }}</td>
                      <td>{{ item.email }}</td>
                      <td class="text-center"><span :class="{'badge badge-success': item.lleva_contabilidad == 1, 'badge badge-danger': item.lleva_contabilidad == 0}">{{ item.lleva_contabilidad == 1 ? 'SI' : 'NO' }}</span></td>
                      <td class="text-center"><span :class="{'badge badge-success': item.ambiente == 1, 'badge badge-danger': item.ambiente == 0}">{{ item.ambiente == 1 ? 'Producción' : 'Prueba' }}</span></td>
                      <td class="text-center"><span :class="{'badge badge-success': item.contribuyente_retencion == 1, 'badge badge-danger': item.contribuyente_retencion == 0}">{{ item.contribuyente_retencion == 1 ? 'SI' : 'NO' }}</span></td>
                      <td class="text-center"><span :class="{'badge badge-success': item.agente_retencion == 1, 'badge badge-danger': item.agente_retencion == 0}">{{ item.agente_retencion == 1 ? 'SI' : 'NO' }}</span></td>                                                          
                      <td>
                        <nuxt-link :to="editar_emisores + item.id" class="btn btn-info py-1 px-2">
                          <i class="fas fa-pen"></i>
                        </nuxt-link>
                      </td>
                      <!--td>
                        <button @click="Eliminar(item.id)" class="btn btn-danger py-1 px-2">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td-->
                    </tr>
                  </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                  <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>


            <!--table class="table">
              <thead>                
                <th>RUC</th>
                <th>Nombre Comercial</th>
                <th>Razón Social</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Obligado a llevar Contabilidad</th>
                <th>Ambiente</th>
                <th>Contribuyente Especial</th>
                <th>Agente de Retención</th>
                <th>Editar</th>
                <th>Eliminar</th>                             
              </thead>
              <tbody>
                <tr v-for="(m,i) in list">
                  <td class="text-center">{{m.usuarios.ruc}}</td>                  
                  <td class="text-center">{{m.nombre_comercial}}</td>                  
                  <td class="text-center">{{m.razon_social}}</td>
                  <td class="text-center">{{m.direccion}}</td>
                  <td class="text-center">{{m.email}}</td>                                                    
                  <td class="text-center"><span :class="{'badge badge-success': m.lleva_contabilidad == 1, 'badge badge-danger': m.lleva_contabilidad === 0}">{{ m.lleva_contabilidad === 1 ? 'SI' : 'NO' }}</span></td>
                  <td class="text-center"><span :class="{'badge badge-success': m.ambiente === 1, 'badge badge-danger': m.ambiente === 0}">{{ m.ambiente === 1 ? 'Producción' : 'Prueba' }}</span></td>
                  <td class="text-center"><span :class="{'badge badge-success': m.contribuyente_retencion === 1, 'badge badge-danger': m.contribuyente_retencion === 0}">{{ m.contribuyente_retencion === 1 ? 'SI' : 'NO' }}</span></td>
                  <td class="text-center"><span :class="{'badge badge-success': m.agente_retencion === 1, 'badge badge-danger': m.agente_retencion === 0}">{{ m.agente_retencion === 1 ? 'SI' : 'NO' }}</span></td>                  
                  <td class="text-center">
                    <div class="btn-group">
                      <nuxtLink :to="editar_emisores+m.id" type="button" class="btn btn-info py-1 px-2">
                        <i class="fas fa-pen"></i>
                      </nuxtLink>
                    </div>
                  </td>  
                  <td class="text-center">
                    <div class="btn-group">
                      <button type="button" @click="Eliminar(m.id)" class="btn btn-danger py-1 px-2">
                        <i class="fas fa-trash "></i>
                      </button>
                      </div>
                  </td>                       
                </tr>
              </tbody>
            </table-->
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
        user:{},
        list:[],
        mostrarBoton:true,
        search: '',
        pagination: {},
        selected: [],
        apiUrl:'datos_emisors',
        page:'Configuracion',
        modulo:'Datos Emisor',
        url_nuevo:'/emisores/nuevoEmisor',
        editar_emisores :'/emisores/editar/',
        headers:[{ text: 'RUC', align: 'left', value: 'ruc' },
                      { text: 'Nombre Comercial', value: 'nombre_producto' },
                      { text: 'Razón Social', value: 'razon_social' },
                      { text: 'Dirección', value: 'direccion' },
                      { text: 'Email', value: 'email' },
                      { text: 'Obligado a llevar Contabilidad', value: 'lleva_contabilidad' },                      
                      { text: 'Ambiente', value: 'ambiente' },                      
                      { text: 'Contribuyente Especial', value: 'contribuyente_retencion' },
                      { text: 'Agente de Retención', value: 'agente_retencion' },
                      { text: 'Editar', value: '' },                      
                    ],
                      
      }
    },
    methods:{
      async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async EliminarItem(id) {
      this.load=true;
      try {
        const res = await this.$api.$delete(this.apiUrl+"/"+id);      
        console.log(res);
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v)=>{
          this.list=v[0]
        })
      } catch (e) {
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
            if(this.list.length == 1){
              this.mostrarBoton = false;
            }
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