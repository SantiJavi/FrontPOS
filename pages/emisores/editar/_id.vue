<template>
    <div>
    <Loader :load="load"/>
    <AdminTemplate>
      <div slot="body">
          <div class="row justify-content-center">      
          <div class="col-sm-8 col-12">       
            <div class="card">
              <div class="car-header text-center">
                <h3>Actualizar Datos Emisor</h3>
              </div>
              <div class="card-body">
                <CrudUpdate :model="model" :apiUrl="apiUrl">
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
                </CrudUpdate>                     
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
        name: 'IndexPage',
        head() {
            return {
                title: 'Sys_Facturacion'
            };
        },
        data(){
          return{
            load:true,            
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
            usuarios_id:'1'
        },
            apiUrl:'datos_emisors',
            page: 'Configuracion',
            modulo: 'Emisor'
          }
        },
        methods:{
          async GET_DATA(path){
            const res=await this.$api.$get(path);
            return res;
          }
        },
        mounted(){
          this.$nextTick(async()=>{
            try {        
                await Promise.all([this.GET_DATA('emisorId/'+this.$route.params.id)]).then((v)=>{
                    this.model=v[0]
                })
            } catch (e) {
              console.log(e);
            }finally{
                this.load=false
            }
          })
        }
        
    }
    </script>
    