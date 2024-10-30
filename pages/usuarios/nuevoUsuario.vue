<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="car-header text-center">
                <h3>Agregar Usuario</h3>          
                
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="">User</label>
                      <input type="text" v-model="model.user" name="" class="form-control" id="">
                    </div>
                    <div class="form-group">
                      <label for="">Password</label>
                      <input type="password" v-model="model.password" name="" class="form-control" id="">
                    </div>
                    <div class="form-group">
                      <label for="">Correo</label>
                      <input type="email" v-model="model.correo" name="" class="form-control" id="">
                    </div>
                    <div class="form-group">
                      <label for="">Permite Transacciones</label>
                      <select class="form-select" aria-label="Default select example"
                        v-model="model.permite_transacciones">
                        <option value="0">Inactivo</option>
                        <option value="1">Activo</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="">Estado</label>
                      <select class="form-select" aria-label="Default select example" v-model="model.estado">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                      </div>
                      <div class="col-6">
                        <button class="btn btn-info w-100" @click="Save()">Guardar</button>
                      </div>
                    </div>
                  </div>
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
  data() {
    return {
      load: false,
      users:[],      
      model: {                        
        user: '',
        password: '',
        logo: '',        
        correo: '',
        permite_transacciones: '',
        estado: ''           
      },
      apiUrl:'usuarios',
      page:'Configuracion',
      modulo:'Usuarios'
    }
  },
  methods: {
    async GET_DATA(path) {      
      const res = await this.$api.$get(path);
      return res;
    },
    async Save() {
      this.load = true;
      console.log(this.model);
      
      const operacion={
        modelo:this.model,
        ruc_root:this.users.ruc,
        fecha_registro:this.users.fecha_registro,
        fecha_expiracion:this.users.fecha_expiracion        
      }
      try {
        const res = await this.$api.$post(this.apiUrl,operacion);        
        this.$swal.fire({
          title: "Dato Guardado",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.back();
          }
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async UserRegister(){
      try{
        await Promise.all([this.GET_DATA('user')]).then((v)=>{
        this.users=v[0];
      });
      }catch(e){
        console.log(e);
      }      
    }
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await this.UserRegister();
      } catch (e) {
        console.log(e);
      } finally {
      }
    })
  }

}
</script>
