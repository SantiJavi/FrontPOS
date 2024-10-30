<template>
    <div>
    <Loader :load="load"/>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">
          <div class="col-2">
              <nuxt-link :to="url_nuevo" class="btn btn-dark w-100 btn-sm">
                            <i class="fas fa-plus"></i> Agregar
                          </nuxt-link>
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
                      <td>{{ item.datos_emisores.usuarios.ruc }}</td>
                      <td>{{ item.direccion_sucursal }}</td>                      
                      <td>{{ item.codigo_establecimiento }}</td>
                      <td>{{ item.punto_emision }}</td>
                      <td>{{ item.sec_ini_fact }}</td>
                      <td>{{ item.sec_sig_fact }}</td>
                      <td>{{ item.sec_ini_com_ret }}</td>
                      <td>{{ item.sec_sig_com_ret }}</td>
                      <td>{{ item.sec_ini_not_cred }}</td>
                      <td>{{ item.sec_sig_not_cred }}</td>
                      <td>{{ item.sec_ini_guia_rem }}</td>
                      <td>{{ item.sec_sig_guia_rem }}</td>
                      <td>{{ item.sec_sig_not_deb }}</td>
                      <td>{{ item.sec_ini_not_deb }}</td>
                      <td>{{ item.sec_ini_liq_comp }}</td>  
                      <td>{{ item.sec_sig_liq_comp }}</td> 
                      <td class="text-center"><span :class="{'badge badge-success': item.estado == 1, 'badge badge-danger': item.estado == 0}">{{ item.estado == 1 ? 'Activo' : 'InActivo' }}</span></td>                    
                      <td>
                        <nuxt-link :to="editar_emisores + item.id" class="btn btn-info py-1 px-2">
                          <i class="fas fa-pen"></i>
                        </nuxt-link>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                  <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>


                <!--table class="table">
                  <thead>                
                    <th>RUC</th>
                    <th>Dirección Sucursal</th>
                    <th>Cod. Estable.</th>
                    <th>Pto.Emision</th>
                    <th>Sec.Ini.Fact</th>
                    <th>Sec.Sig.Fact</th>
                    <th>Sec.Ini.Ret</th>
                    <th>Sec.Sig.Ret</th>
                    <th>Sec.Ini.N/C</th>
                    <th>Sec.Sig.N/C</th>
                    <th>Sec.Ini.G/R</th>
                    <th>Sec.Sig.G/R</th>
                    <th>Sec.Ini.N/D</th>
                    <th>Sec.Sig.N/D</th>
                    <th>Sec.Ini.L/C</th>
                    <th>Sec.Sig.L/C</th>
                    <th>Estado</th>                    
                    <th>Editar</th>                                 
                  </thead>
                  <tbody>
                    <tr v-for="(m,i) in list">
                      <td class="text-center">{{m.datos_emisores.usuarios.ruc}}</td>                  
                      <td class="text-center">{{m.direccion_sucursal}}</td>                  
                      <td class="text-center">{{m.punto_emision}}</td>
                      <td class="text-center">{{m.codigo_establecimiento}}</td>
                      <td class="text-center">{{m.sec_ini_fact}}</td>
                      <td class="text-center">{{m.sec_sig_fact}}</td>
                      <td class="text-center">{{m.sec_ini_com_ret}}</td>
                      <td class="text-center">{{m.sec_sig_com_ret}}</td>
                      <td class="text-center">{{m.sec_ini_not_cred}}</td>
                      <td class="text-center">{{m.sec_sig_not_cred}}</td>
                      <td class="text-center">{{m.sec_ini_guia_rem}}</td>
                      <td class="text-center">{{m.sec_sig_guia_rem}}</td>
                      <td class="text-center">{{m.sec_sig_not_deb}}</td>
                      <td class="text-center">{{m.sec_ini_not_deb}}</td>
                      <td class="text-center">{{m.sec_ini_liq_comp}}</td>
                      <td class="text-center">{{m.sec_sig_liq_comp}}</td>                      
                      <td class="text-center"><span :class="{'badge badge-success': m.estado == 1, 'badge badge-danger': m.estado == 0}">{{ m.estado === 1 ? 'Activo' : 'InActivo' }}</span></td>                                            
                      <td class="text-center">
                        <div class="btn-group">
                          <nuxtLink :to="editar_emisores+m.id" type="button" class="btn btn-info py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </nuxtLink>
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
        list:[],
        user:{},
        datoEmisorId:'',
        search: '',
        pagination: {},
        selected: [],
        apiUrl:'secuencials',
        page:'Configuracion',
        modulo:'Secuencial',
        url_nuevo:'/secuencia/nuevoSecuencial',
        editar_emisores :'/secuencia/editar/',
        headers:[{ text: 'RUC', align: 'left', value: 'ruc' },
                  { text: 'Dirección Sucursal', value: 'direccion_sucursal' },
                  { text: 'Cod. Estable.', value: 'codigo_establecimiento' },
                  { text: 'Pto.Emision', value: 'punto_emision' },
                  { text: 'Sec.Ini.Fact', value: 'sec_ini_fact' },
                  { text: 'Sec.Sig.Fact', value: 'sec_sig_fact' },                      
                  { text: 'Sec.Ini.Ret', value: 'sec_ini_com_ret' },                      
                  { text: 'Sec.Sig.Ret', value: 'sec_sig_com_ret' },
                  { text: 'Sec.Ini.N/C', value: 'sec_ini_not_cred' },
                  { text: 'Sec.Sig.N/C', value: 'sec_sig_not_cred' },   
                  { text: 'Sec.Ini.G/R', value: 'sec_ini_guia_rem' },
                  { text: 'Sec.Sig.G/R', value: 'sec_sig_guia_rem' },
                  { text: 'Sec.Ini.N/D', value: 'sec_sig_not_deb' },
                  { text: 'Sec.Sig.N/D', value: 'sec_ini_not_deb' },
                  { text: 'Sec.Ini.L/C', value: 'sec_ini_liq_comp' },                      
                  { text: 'Sec.Sig.L/C', value: 'sec_sig_liq_comp' },                      
                  { text: 'Estado', value: 'estado' },
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
            const datos=[];
            await Promise.all([this.GET_DATA(this.apiUrl)]).then((v)=>{
              v[0].forEach((item)=>{              
                this.datos = item.datos_emisores.usuarios_id == this.user.id ? datos.push(item) :[];                                                    
                this.datoEmisorId=item.datos_emisores_id;              
              });            
              this.list = datos;
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