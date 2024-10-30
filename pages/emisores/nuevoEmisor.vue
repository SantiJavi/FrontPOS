<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Agregar Datos del Emisor</h3>
                </div>
                <div class="card-body">
                    <CrudCreate :model="model" :apiUrl="apiUrl">
                        <div class="row" slot="body">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Nombre Comercial</label>
                                    <input type="text" v-model="model.nombre_comercial" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Razón Social</label>
                                    <input type="text" v-model="model.razon_social" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Dirección Matriz</label>
                                    <input type="text" v-model="model.direccion" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="email" v-model="model.email" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Obligado a llevar Contabilidad</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.lleva_contabilidad">
                                        <option value="1">SI</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Ambiente</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.ambiente">
                                        <option value="1">Producción</option>
                                        <option value="0">Pruebas</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Contribuyente Especial</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.contribuyente_retencion">
                                        <option value="1">SI</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Agente de Retención</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.agente_retencion">
                                        <option value="1">SI</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div> 
                                <!--div class="form-group">
                                    <label for="">Activar Regimén</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.activar_regimen">
                                        <option value="1">SI</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div-->                                                                
                            </div>
                        </div>
                    </CrudCreate>
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
        user:{},
        id:'',
        model: {          
          nombre_comercial: '',
          razon_social: '',
          direccion: '',
          email: '',
          lleva_contabilidad: '',
          ambiente: '',
          contribuyente_retencion: '',
          agente_retencion: '',
          activar_regimen:'',
          usuarios_id:'',
        },
        apiUrl:'datos_emisors',
        page:'Configuracion',
        modulo:'Emisor'
        
      }
    },
    methods: {
      async Save() {
        this.load = true;        
        try {          
          const res = await this.$api.$post(this.apiUrl, this.model);          
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
            this.model.usuarios_id = this.user.id;
          }                    
        } catch (e) {
          console.log(e);
        }
      })
    },
  }
  </script>
  