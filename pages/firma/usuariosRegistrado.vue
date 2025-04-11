<template>
<div>
<Loader :load="load"/>
<AdminTemplate :page="page" :modulo="modulo">
  <div slot="body">
    <div class="row">
      <div class="col-2">
          <!--nuxtLink to="/usuarios/nuevoUsuario" class="btn btn-dark w-100 btn-sm">
                        <i class="fas fa-plus"></i> Agregar
                      </nuxtLink-->
        </div>
      <div class="col-12">       
        <div class="card">
          <div class="car-header text-center">
                <h3>Configuración de la Firma Electronica</h3>                          
              </div>
          <div class="card-body">
            <table class="table">
              <thead>                
                <th class="text-center">RUC</th>
                <th class="text-center">User</th>                                
                <th class="text-center">Estado Firma</th>
                <th class="text-center">Editar</th>
                <!--th class="">Eliminar</th-->
              </thead>
              <tbody>
                <tr v-for="(m,i) in list">
                  <td class="text-center">{{ m.ruc }}</td>                  
                  <td class="text-center">{{ m.user }}</td>                  
                  <td class="text-center"><span :class="{'badge badge-success':  fechaActual < fechaExpiracionFirma, 'badge badge-danger': fechaActual >= fechaExpiracionFirma}">{{ fechaActual < fechaExpiracionFirma ? 'Vigente hasta: '+fechaFinal : 'Caducada en: '+fechaFinal }}</span></td>                                    
                  <!--td class="text-center">{{ fechaExpiracionFirma }}</td-->                                                      
                  <td class="text-center">
                    <div class="btn-group">
                      <nuxtLink :to="editar_usuarios+m.id" type="button" class="btn btn-info py-1 px-2">
                        <i class="fas fa-pen"></i>
                      </nuxtLink>
                    </div>
                  </td>  
                  <td>
                    <!--div class="btn-group">
                      <button type="button" @click="Eliminar(m.id)" class="btn btn-danger py-1 px-2">
                        <i class="fas fa-trash"></i>
                      </button>
                      </div-->
                  </td>                       
                </tr>
              </tbody>
            </table>
          </div>          
        </div>
      </div>
    </div>
  </div>
</AdminTemplate>
</div>
</template>

<script>
import {getFechaExpiracionFirma} from '/utils/utils';
import {transformFecha,getFechaActual} from '/utils/fechas';
export default {
    name: 'IndexPage',
    head() {
        return {
            title: 'Sys_Facturacion'
        };
    },
    data(){
      return{
        user:{},
        load:true,
        list:[],
        fechaExpiracionFirma:"",
        fechaFinal:"",
        fechaActual:"",
        apiUrl:'usuarios',
        page:'Configuracion',
        modulo:'Firma Electrónica',
        url_nuevo:'/usuarios/nuevoVendedor',
        editar_usuarios:'/firma/editar/',
        valorFirma:"",
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
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await self.EliminarItem(id)
        }
      });
    },
    parseDate(str){
      const [day, month, year] = str.split('-').map(Number);
      return new Date(year, month - 1, day);
    }    
    },
    mounted(){
      this.$nextTick(async()=>{
        try {
          let user = localStorage.getItem('userAuth');
          this.user = JSON.parse(user);
          if(this.user == null){
            this.$router.push('/auth/login');
          }else{
            const dato={};
            await Promise.all([this.GET_DATA(this.apiUrl+"/"+this.user.id)]).then((v)=>{
            this.list=v[0];            
            this.dato = this.list[0];            
            });                
            let firmaElectronica = process.env.URL_BACK+"serve/"+this.user.id;
            this.fechaExpiracionFirma = transformFecha(await getFechaExpiracionFirma(firmaElectronica,this.dato.password_firma));                                
            this.fechaExpiracionFirma = this.parseDate(this.fechaExpiracionFirma);
            this.fechaActual = this.parseDate(transformFecha(getFechaActual()));  
            this.fechaFinal = transformFecha(this.fechaExpiracionFirma);                  
          }          
        } catch (e) {
          console.log(e);
        }finally{
          this.load=false;
        }
      })
    }
    
}
</script>
