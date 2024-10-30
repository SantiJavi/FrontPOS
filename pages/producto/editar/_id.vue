<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Actualizar Producto</h3>
                </div>
                <div class="card-body">                  
                    <div class="row" slot="body">
                      <div class="col-12">
                        <div class="form-group">
                            <label for="" class="fs-6">Código Producto</label>
                            <input type="text" v-model="model.codigo_producto" name="" class="form-control fs-6" id="" readonly>
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
                          <select class="form-select fs-6" aria-label="Default select example" v-model="model.impuesto_iva">
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
  import {datoActualizado,validacionSoloNumeros,validacionSoloLetras,validacionCorreo,alertaMensaje} from '/utils/validaciones';
  export default {
    name: 'IndexPage',
    head() {
      return {
        title: 'Sys_Facturacion'
      };
    },
    data() {
      return {
        load: true,
        model: {
          codigo_producto: '',
          nombre_producto: '',
          codigo_aux: '',
          precio_producto: '',
          impuesto_iva:'',
          descuento:'',
          impuesto_ice: ''
        },
        apiUrl: 'productos',
        page: 'Agregar',
        modulo:'Actualizar Productos'
      }
    },
    methods: {
      async Save(){
        this.load = true;
        try{
          const res = await this.$api.$put(this.apiUrl+"/"+this.model.id,this.model);
          if(res.code===500){
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
        }catch(e){
          console.log(e);
        }finally{
          this.load = false;
        }
      },
      async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      }
    },
    mounted() {
      this.$nextTick(async () => {
        try {          
          await Promise.all([this.GET_DATA('productosId/' + this.$route.params.id)]).then((v) => {
            this.model = v[0]
          })
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      })
    }
  
  }
  </script>
      