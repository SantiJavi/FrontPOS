<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="car-header text-center">
                <h3>Agregar Producto</h3>
              </div>
              <div class="card-body">
                  <div class="row" slot="body">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="" class="fs-6">Código Producto</label>
                        <div class="row">
                          <div class="col-9">
                            <input type="text" v-model="model.codigo_producto" name="" class="form-control fs-6" id="">
                          </div>
                          <div class="col">
                            <button type="button" class="btn btn-info text-white" @click="generarSKU()">Codigo Automatico</button>
                          </div>                                                    
                        </div>                        
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">Nombre Producto</label>
                        <input type="text" v-model="model.nombre_producto" name="" class="form-control fs-6" id="">
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">Código Auxiliar Producto</label>
                        <input type="email" v-model="model.codigo_aux" name="" class="form-control fs-6" id="">
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">Precio</label>
                        <input type="number" v-model="model.precio_producto" name="" class="form-control fs-6" id="">
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">IVA</label>
                        <select class="form-select" aria-label="Default select example" v-model="model.impuesto_iva">
                          <option value="15">Iva 15%</option>
                          <!--option value="12">Iva 12%</option-->
                          <option value="0">Iva 0%</option>
                          <option value="-">No aplica Iva</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">Descuento</label>
                        <input type="number" v-model="model.descuento" name="" class="form-control fs-6">
                      </div>
                      <div class="form-group">
                        <label for="" class="fs-6">Impuesto ICE</label>
                        <select class="form-select" aria-label="Default select example" v-model="model.impuesto_ice">
                          <option value="1">Aplica</option>
                          <option value="0">No Aplica</option>
                        </select>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <button class="btn btn-dark w-100 fs-6" @click="$router.back()">Regresar</button>
                        </div>
                        <div class="col-6">
                          <button class="btn btn-info w-100 fs-6" @click="Save()">Guardar</button>
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
      user:{},
      model: {
        codigo_producto: '',
        nombre_producto: '',
        codigo_aux: '',
        precio_producto: '',
        impuesto_iva: '15',
        descuento: '0.00',
        impuesto_ice: '0',
        user_id:''
      },
      apiUrl: 'productos',
      page: 'Agregar',
      modulo: 'Nuevo Producto'
    }
  },
  methods: {
    async Save() {
      this.load = true;      
      try {
        const res = await this.$api.$post(this.apiUrl, this.model);        
        if(res.code === 500){
          this.alertaMensaje("ERROR",res.message,"error");
        }else{
          this.$swal.fire({
          title: "Dato Guardado",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.back();
          }
        });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },      
    alertaMensaje(titulo,mensaje,tipo){
        this.$swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        confirmButtonText: "Ok"
        }).then((result)=>{
          if (result.isConfirmed) {                      
          }
        });
      },
    generarSKU(){
      const timestamp = Date.now();
      const sku = `SKU-VS-${timestamp}`;
      this.model.codigo_producto = sku;
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
          this.model.user_id = this.user.id;
        }        
      } catch (e) {
        console.log(e);
      }
    })
  }

}
</script>
  