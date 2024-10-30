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
          <div class="card-body">
            <table class="table">
              <thead>                
                <th class="text-center">RUC</th>
                <th class="text-center">User</th>                
                <th class="text-center">Permite Transacciones</th>
                <th class="text-center">Estado</th>
                <th class="text-center">Logo</th>
                <th class="text-center">Editar Logo</th>

                <!--th class="text-center">Editar</th-->
                <!--th class="">Eliminar</th-->
              </thead>
              <tbody>
                <tr v-for="(m,i) in list">
                  <td class="text-center">{{ m.ruc }}</td>                  
                  <td class="text-center">{{ m.user }}</td>       
                  <td class="text-center"><span :class="{'badge badge-success': m.permite_transacciones == 1, 'badge badge-danger': m.permite_transacciones == 0}">{{ m.permite_transacciones == 1 ? 'Activo' : 'Inactivo' }}</span></td>                             
                  <td class="text-center"><span :class="{'badge badge-success': m.estado == 1, 'badge badge-danger': m.estado == 0}">{{ m.estado == 1 ? 'Activo' : 'Inactivo' }}</span></td>                                                         
                  <!--td class="text-center"><span :class="{'badge badge-success': m.logo !== null, 'badge badge-danger': m.logo === null}">{{ m.logo !==null ? 'Logo Ingresado' : 'No hay Logo' }}</span></td-->
                  
                  <td class="text-center"><img :src="m.url" alt="imagenLogo" class="img-fluid"></td>                                                                           
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
        user:{},
        load:true,
        list:[],
        apiUrl:'usuarios',
        page:'Configuracion',
        modulo:'Usuarios',
        url_nuevo:'/usuarios/nuevoVendedor',
        editar_usuarios:'/usuarios/editar/'
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
            console.log(this.user.id);
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
    }
    
}
</script>
