<template>
  <div>
    <Loader :load="load"/>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">
          <div class="col-2">
            <nuxt-link :to="url_nuevo" class="btn btn-dark w-100 fs-6">
              <i class="fas fa-plus"></i> Agregar
            </nuxt-link>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="search" label ="Buscar por Codigo de Producto o por Nombre  de Producto" @input="searchItems()"/>
                  </v-col>
                </v-row>
                <v-data-table :headers="headers" :items="list"
                              :search="search"                              
                              :pagination.sync="pagination"
                              class="elevation-1">
                  <template v-slot:item="{item}">
                    <tr>
                      <td class="fs-6">{{ item.codigo_producto }}</td>
                      <td class="fs-6">{{ item.nombre_producto }}</td>
                      <td class="fs-6">{{ item.codigo_aux }}</td>
                      <td class="fs-6">{{ item.precio_producto }}</td>
                      <td class="fs-6">{{ item.impuesto_iva }}</td>
                      <td class="fs-6">{{ item.descuento }}</td>
                      <td class="fs-6">{{ item.impuesto_ice }}</td>
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
  components: {
    AdminTemplate,
  },
  head() {
    return {
      title: 'Sys_Facturacion'
    };
  },
  data() {
    return {
      load: true,
      search: '',
      pagination: {},
      selected: [],
      list: [],
      productos:[],
      user:{},
      apiUrl: 'productos',
      page: 'Agregar',
      modulo: 'Productos',
      url_nuevo: '/producto/nuevoProducto',
      url_editar: '/producto/editar/',
      headers: [
        { text: 'Codigo Producto', align: 'left', value: 'codigo_producto' },
        { text: 'Nombre Producto', value: 'nombre_producto' },
        { text: 'Codigo Secundario Producto', value: 'codigo_aux' },
        { text: 'Precio', value: 'precio_producto' },
        { text: 'Iva %', value: 'impuesto_iva' },
        { text: 'Descuento', value: 'descuento' },
        { text: 'Impuesto ICE', value: 'impuesto_ice' },
        { text: 'Editar', value: '' },
        { text: 'Eliminar', value: '' },
      ],
    }
  },
  methods: {
    async GET_DATA(path) {
      try {
        const res = await this.$api.$get(path);
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async EliminarItem(id) {
      this.load = true;
      try {
        const res = await this.$api.$delete(this.apiUrl+"/"+id);        
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    searchItems(){
      if(this.search == ''){
        this.list = this.productos;
      }else{
        let buscarRegistro = this.productosFilter;
      }
    },
    Eliminar(id) {
      const self = this;
      this.$swal.fire({
        title: "Deseas Eliminar?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelarButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          await self.EliminarItem(id)
        }
      });
    },
    async actualizarListaProductos(){
      try {        
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
        this.list = v[0];      
        });        
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }

    }
  },
  mounted() {                
    this.$nextTick(async () => {      
      try {      
        let userLogin = localStorage.getItem('userAuth');
        this.user = JSON.parse(userLogin);
        if(this.user == null){
          this.$router.push('/auth/login');
        }else{
          await Promise.all([this.GET_DATA(this.apiUrl+"/"+this.user.id)]).then((v) => {
          this.list = v[0];    
          this.productos = v[0];
          });        
        }        
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    })
  },
  computed: {
    productosFilter(){
      let buscar = this.search.toLocaleLowerCase().trim();
      if(!buscar){
        return this.list;
      }
      return this.list.filter((item)=>{
          
      });
    }
  },
}
</script>