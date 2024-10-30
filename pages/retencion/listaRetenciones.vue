<template>
    <div>
    <Loader :load="load"/>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">
          <div class="col-2">
              <nuxtLink :to="url_nuevo" class="btn btn-dark w-100 btn-sm">
                            <i class="fas fa-plus"></i> Crear Retención
                          </nuxtLink>
            </div>
          <div class="col-12">       
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
                      <td>{{ item.retencion.secuencial.codigo_establecimiento }} {{item.retencion.secuencial.punto_emision }} {{ item.retencion.secuencial_sig }}</td>
                      <td>{{ item.retencion.vendedor.numero_documento }}</td>
                      <td>{{ item.retencion.vendedor.razon_social }}</td>                      
                      <td>{{ item.retencion.fecha_emision }}</td>                      
                      <td>{{ item.retencion.secuencial.datos_emisores.ambiente==0? "Pruebas":"Producción"}}</td>                      
                      <td>{{ item.retencion.tipo_comprobante==1 ? "FACTURA" : item.retencion.tipo_comprobante==3?"LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS":item.retencion.tipo_comprobante==4?"NOTA DE CRÉDITO":item.retencion.tipo_comprobante==5?"NOTA DE DÉBITO":item.retencion.tipo_comprobante==6?"GUÍA DE REMISIÓN":"COMPROBANTE DE RETENCIÓN"}}</td>
                      <td>{{ item.estado }}</td>
                      <td>
                        <a :href="url_pdf+item.retencion.id" target="_blank" type="button" class="btn btn-info py-1 px-2">
                            <i class="fas fa-file-pdf"></i>
                          </a>
                      </td>
                      <td>
                        <a :href="url_xml+item.num_autorizacion_sri" type="button"  class="btn btn-danger py-1 px-2">
                            <i class="fas fa-file"></i>
                          </a>
                      </td>                      
                    </tr>
                  </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                  <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
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
            retenciones:[],
            search: '',
            user:{},
            pagination: {},
            selected: [],
            apiUrl:'allRetenciones',
            page:'Agregar',
            modulo:'Retenciones Autorizadas',
            currentPage:1,
            url_nuevo:'/retencion/generarRetencion',            
            url_pdf: process.env.URL_PDF +"/retenciones/",
            url_xml: process.env.URL_XML +"/descargar_retencion/",
            headers:[
                      
                      { text: 'ID', align: 'left', value: '',sortable:false },
                      { text: 'Documento', value: 'retencion.vendedor.numero_documento' },
                      { text: 'Proveedor', value: 'retencion.vendedor.razon_social' },                                            
                      { text: 'Fecha Emisión', value: 'retencion.fecha_emision', sortable: true  },
                      { text: 'Ambiente', value: 'retencion.ambiente' },                      
                      { text: 'Tipo Documento', value: 'retencion.tipo_comprobante' },                      
                      { text: 'Estado',align: 'left', value: 'estado' },                      
                      { text: 'RIDE', value: '' },
                      { text: 'XML', value: '' }],
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
            cancelarButtonText: 'Cancelar'
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              await self.EliminarItem(id)
            }
          });
          },
          searchItems(){
            if(this.search==''){
            this.list = this.retenciones;
          }else{
          let buscarRegistro = this.facturasFilter;           
          if(buscarRegistro.length>0){           
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
              await Promise.all([this.GET_DATA('sriAutorizacionesRetIdUser/'+this.user.id)]).then((v) => {
              this.list = v[0];                              
              this.retenciones = v[0];
              });            
          }
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
            const vendedor = item.retencion.vendedor;            
            const numeroDocumento = vendedor.numero_documento ? vendedor.numero_documento.toLowerCase().trim() : '';
            const nombre = vendedor.razon_social ? vendedor.razon_social.toLowerCase().trim() : '';
            return numeroDocumento.includes(buscar) || nombre.includes(buscar);
            });
      },
      pages() {
          if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
          ) return 0;
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        totalPages(){
          return Math.ceil(21 / 10);
        }
        
    }

  }
    </script>
    