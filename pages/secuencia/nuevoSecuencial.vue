<template>
    <div>
      <Loader :load="load" />
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="car-header text-center">
                  <h3>Configurar Nuevo Secuencial</h3>
                </div>
                <div class="card-body">                    
                        <div class="row" slot="body">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Dirección Secursal</label>
                                    <input type="text" v-model="model.direccion_sucursal" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Código Establecimiento</label>
                                    <input type="text" maxlength="3" placeholder="001" v-model="model.codigo_establecimiento" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Punto de Emisión</label>
                                    <input type="text" placeholder="100" maxlength="3" v-model="model.punto_emision" name="" class="form-control" id="">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Factura</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_fact" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Factura</label>
                                    <input type="text" maxlength="9" v-model="model.sec_sig_fact" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Comprobante de Retención</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_com_ret" name="" class="form-control" id="" placeholder="000000001" v-bind:readonly="isDisabled">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Comprobante de Retención</label>
                                    <input type="text" maxlength="9" v-model="model.sec_sig_com_ret" name="" class="form-control" id="" placeholder="000000001" v-bind:readonly="isDisabled">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Nota de Crédito</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_not_cred" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Nota de Crédito</label>
                                    <input type="text" maxlength="9" v-model="model.sec_sig_not_cred" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Guía de Remisión</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_guia_rem" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Guía de Remisión</label>
                                    <input type="text" maxlength="9" v-model="model.sec_sig_guia_rem" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Nota de Débito</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_not_deb" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Nota de Débito</label>
                                    <input type="text" maxlength="9"v-model="model.sec_sig_not_deb" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Inicial Liquidación de Compra</label>
                                    <input type="text" maxlength="9" v-model="model.sec_ini_liq_comp" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="form-group">
                                    <label for="">Sec. Siguiente Liquidación de Compra</label>
                                    <input type="text" maxlength="9" v-model="model.sec_sig_liq_comp" name="" class="form-control" id="" placeholder="000000001">
                                </div>
                                <div class="row">
                                  <div class="col-6">
                                    <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                                  </div>
                                  <div class="col-6">
                                    <button class="btn btn-info w-100" @click="Save()">Guardar</button>
                                  </div>
                                </div>                                
                                <!--div class="form-group">
                                    <label for="">Estado</label>
                                    <select class="form-select" aria-label="Default select example" v-model="model.estado">
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div-->
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
  import {validacionSoloNumeros} from '/utils/validaciones';
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
        datoEmisorId:'',
        isDisabled:false,
        model: {
          direccion_sucursal: '',
          codigo_establecimiento: '',
          punto_emision: '',
          sec_ini_fact: '000000001',
          sec_sig_fact: '000000001',
          sec_ini_com_ret: '000000001',
          sec_sig_com_ret: '000000001',
          sec_ini_not_cred: '000000001',
          sec_sig_not_cred:'000000001',
          sec_ini_guia_rem:'000000001',
          sec_sig_guia_rem:'000000001',
          sec_ini_not_deb:'000000001',
          sec_sig_not_deb:'000000001',
          sec_ini_liq_comp:'000000001',
          sec_sig_liq_comp:'000000001',
          estado:1,
          datos_emisores_id:''
        },
        apiUrl:'secuencials',
        page:'Configuracion',
        modulo:'Nuevo Secuencial'
      }
    },
    methods: {
      async Save() {
        if(!validacionSoloNumeros(this.model.codigo_establecimiento) || !validacionSoloNumeros(this.model.punto_emision ||
          !validacionSoloNumeros(this.model.sec_ini_fact) || !validacionSoloNumeros(this.model.sec_sig_fact) || 
          !validacionSoloNumeros(this.model.sec_ini_com_ret) || !validacionSoloNumeros(this.model.sec_sig_com_ret))
          || !validacionSoloNumeros(this.model.sec_ini_not_cred) || !validacionSoloNumeros(this.model.sec_sig_not_cred) ||
          !validacionSoloNumeros(this.model.sec_ini_guia_rem) || !validacionSoloNumeros(this.model.sec_sig_guia_rem) ||
          !validacionSoloNumeros(this.model.sec_ini_not_deb) || !validacionSoloNumeros(this.model.sec_sig_not_deb) ||
          !validacionSoloNumeros(this.model.sec_ini_liq_comp) || !validacionSoloNumeros(this.model.sec_sig_liq_comp)        
        ){
          this.alertaMensaje("ATENCION","Solo se permiten numeros en esta sección","info");
        }else if(this.model.codigo_establecimiento.trim().length!=3 || this.model.punto_emision.trim().length!=3){
          this.alertaMensaje("ATENCION","Revisa los campos de Código de Establecimiento y Punto de Emisión. La Longitud debe ser de 3 digitos.","info");
        }else if( this.model.sec_ini_fact.trim().length!=9 || this.model.sec_sig_fact.trim().length!=9 || 
          this.model.sec_ini_com_ret.trim().length!=9 || this.model.sec_sig_com_ret.trim().length!=9
          || this.model.sec_ini_not_cred.trim().length!=9 || this.model.sec_sig_not_cred.trim().length!=9 ||
          this.model.sec_ini_guia_rem.trim().length!=9 || this.model.sec_sig_guia_rem.trim().length!=9 ||
          this.model.sec_ini_not_deb.trim().length!=9 || this.model.sec_sig_not_deb.trim().length!=9 ||
          this.model.sec_ini_liq_comp.trim().length!=9 || this.model.sec_sig_liq_comp.trim().length!=9)
          {
            this.alertaMensaje("ATENCION","Revisa los campos de Secuenciales. La Longitud debe ser de 9 digitos.","info");
          }else{
            this.load = true;                
            try {
              const res = await this.$api.$post(this.apiUrl, this.model);
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
              } catch (e) {
                console.log(e);
              } finally {
                this.load = false;
              }        
          }
      },
      async GET_DATA(path) {
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
      }
    },
    mounted() {
      this.$nextTick(async()=>{
        try {
          let userLogin = localStorage.getItem('userAuth');
          this.user = JSON.parse(userLogin);
          if(this.user == null){
            this.$router.push('/auth/login');
          }else{
            let dato='';
            await Promise.all([this.GET_DATA('datos_emisors')]).then((v)=>{
              v[0].forEach((item)=>{                 
                this.isDisabled = item.agente_retencion == 1 ? false : true;                
                if(item.usuarios_id == this.user.id){
                  dato = item.id;                  
                  return dato;
                }                                
              });            
              this.model.datos_emisores_id=dato;                          
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
  