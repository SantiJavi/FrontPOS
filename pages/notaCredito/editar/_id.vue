<template>
        <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Modificar el Tipo de Venta</h3>
                </div>
                <div class="card-body">
                  <!--CrudUpdate :model="model" :apiUrl="apiUrl"-->
                    <div class="row" slot="body">
                        <div class="col-12">
                                <div class="form-group">
                                    <label for="">Fecha de Compra</label>
                                    <input type="text" v-model="model.fecha_emision" name="" class="form-control" id="" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="">Total Comprado</label>
                                    <input type="text" v-model="model.total_grabado" name="" class="form-control" id="" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="">Cliente</label>
                                    <input type="email" v-model="model.cliente.nombre" name="" class="form-control" id="" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="">Tipo de Venta</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.tipo_pago">
                                        <option value="efectivo">Efectivo</option>
                                        <option value="credito">Credito</option>                                        
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
                  <!--/CrudUpdate-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </div>

</template>
<script>
export default {
    head(){
        return {
            title: 'Sys_Facturacion'
        }
    },
    data(){
        return{
            load: true,
            user:{},
            modulo:'Cambiar Venta',
            page:'Editar',
            apiUrl:'ventas',
            model:{
                id:'',
                fecha_emision:'',
                tipo_pago:'',
                secuencial_sec:'',                
                total_grabado:'',
                fecha_pago:'',
                secuencial_id:'',
                cliente_id:'',
                cuenta_id:'',
                cliente:''               
            }
        }
    },
    methods:{
      async Save(){
        this.load = true;
        try{
          const res = await this.$api.$put(this.apiUrl+"/"+this.model.id,this.model);                   
          if(res.code == 500) {
             this.alertaMensaje("Error al Actualizar",res.message,"error");
            }else{
              this.alertaMensajeRouter(res.message);
            }
        }catch(e){
          console.log(e);
        }finally{
          this.load =false;
        }
      },
      async GET_DATA(path){
          const res = await this.$api.$get(path);
          return res;
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
    alertaMensajeRouter(titulo){
      this.$swal.fire({
          title: titulo,          
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.back();
          }
        })
    }
    },
    mounted(){
        this.$nextTick(async () =>{
            try{
                await Promise.all([this.GET_DATA('venta/'+this.$route.params.id)]).then((v)=>{                                      
                  this.model = v[0][0];                  
                })              
            }catch(e){
                console.log(e)
            }finally{
                this.load = false;
            }
        })

    },

}
</script>