<template>
  <div>
  <Loader :load="load"/>
  <AdminTemplate :page="page" :modulo="modulo">
    <div slot="body">
      <div class="row">
        <div class="col-2">
            <nuxtLink :to="url_nuevo" class="btn btn-dark w-100 btn-sm">
                          <i class="fas fa-plus"></i> Crear Nota de Crédito
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
              <v-data-table :headers="headers" 
                            :items="list"                                                        
                            :pagination.sync="pagination"                              
                            class="elevation-1">
                <template v-slot:item="{item}">
                  <tr>
                    <td>{{ item.factura.secuencial.codigo_establecimiento }} {{item.factura.secuencial.punto_emision }}{{ item.factura.secuencial_sec }}</td>
                    <td>{{ item.factura.cliente.numero_documento }}</td>
                    <td>{{ item.factura.cliente.nombre }}</td>
                    <td>{{ item.factura.total_grabado }}</td>                      
                    <td>{{ item.factura.fecha_emision }}</td>                      
                    <td>{{ item.factura.ambiente==0? "Pruebas":"Producción"}}</td>                      
                    <td>{{ item.factura.tipo_comprobante==1 ? "FACTURA" : item.factura.tipo_comprobante==3?"LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS":item.factura.tipo_comprobante==4?"NOTA DE CRÉDITO":item.factura.tipo_comprobante==5?"NOTA DE DÉBITO":item.factura.tipo_comprobante==6?"GUÍA DE REMISIÓN":"COMPROBANTE DE RETENCIÓN"}}</td>
                    <td>
                      <a :href="url_pdf+item.factura.id" target="_blank" type="button" class="btn btn-info py-1 px-2">
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
          facturas:[],
          apiUrl:'autorizaciones',
          page:'Agregar',
          modulo:'Facturas Autorizadas',
          url_nuevo:'/factura/facturas',
          url_pdf:'http://apifacturacion.connieconito.com/APIFacturacion/apifacturacion/public/api/reportes/facturas/',
          url_xml:'http://apifacturacion.connieconito.com/APIFacturacion/apifacturacion/public/api/descargar_factura/',
          search:'',
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
          console.log(res);
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
        },
        searchItems(){                          
          if(this.search==''){
            this.list = this.facturas;
          }else{
          let buscarRegistro = this.facturasFilter;           
          if(buscarRegistro.length>0){           
            this.list = this.facturasFilter;          
          }
          }                    
        },
      },
      computed:{
        facturasFilter() {
          let buscar = this.search.toLowerCase().trim(); // Convertir a minúsculas y quitar espacios en blanco
          if (!buscar) {
            return this.list;
          }
          return this.list.filter((item) => {
            const cliente = item.factura.cliente;
            const numeroDocumento = cliente.numero_documento ? cliente.numero_documento.toLowerCase().trim() : '';
            const nombre = cliente.nombre ? cliente.nombre.toLowerCase().trim() : '';
            return numeroDocumento.includes(buscar) || nombre.includes(buscar);
            });
      }
    },        
      async mounted(){
      try {
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
        this.list = v[0];
        this.facturas = v[0];
      });  
    } catch (e) {
      console.log(e);
    } finally {
      this.load = false;
    }
      
  }
}
  </script>
  