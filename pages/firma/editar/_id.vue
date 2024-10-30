<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-4 col-12">            
            <div class="card">              
              <div class="card-header">
                <h3>Cargue la firma electronica</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                        <label for="">Documento</label>
                        <input type="text" v-model="model.ruc" name="" class="form-control" id="" readonly />
                </div>
                <div class="form-group">
                        <label for="">Password Firma Electronica</label>
                        <div class="input-group">
                          <input type="password" v-model="model.password_firma" name="" class="form-control" id=""/>
                        </div>
                  </div>

                <label for="">Cargue su firma electronica</label>                
                <div class="form-control dropzone" id="fileDrop">                
                  <div class="fallback">
                    <input name="file" type="file"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                        <label for="">Fecha de Vigencia Firma Electronica: {{ fechaExpiracionFirma }}</label>                                                
                  </div>

              <div class="row justify-content-md-center">
                  <div class="col-4">
                    <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                  </div>
                  <div class="col-4">
                      <button class="btn btn-info w-100" @click="Save()">Guardar</button>
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
import {getFechaExpiracionFirma} from '/utils/utils';
import {transformFecha,getFechaActual} from '/utils/fechas';
export default {
  name: "IndexPage",
  head() {
    return {
      title: this.modulo,
    };
  },
  data() {
    return {
      load: true,
      user:{}, 
      fechaExpiracionFirma:"",     
      model: {
        ruc:'',
        password_firma:''

      },
      apiUrl: "usuarios",
      page: "Configuracion",
      modulo: "Usuarios",      
    };
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Save(){
      this.load = true;        
      try{            
      if(!transformFecha(getFechaActual())>=this.fechaExpiracionFirma){          
          const res = await this.$api.$put('singpassword/' + this.model.id, this.model);
          if (res.code === 500) {
            this.alertaMensaje("ERROR", res.message, "error");
          } else {
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
        }else{
          this.alertaMensaje("FIRMA CADUCADA","Su firma electronica ha caducado. Por favor renuevela","error");
        }
      }catch(error){
        console.log(error);
      }

    },
    alertaMensaje(titulo,mensaje,tipo){
      this.$swal.fire({
        title: titulo,
        text:mensaje,
        icon: tipo,
        confirmButtonText: "Ok"
        }).then((result)=>{
        if (result.isConfirmed) {                      
        }
      });
    }
  },
  mounted() {        
    this.$nextTick(async () => {
      Dropzone.autoDiscover = false;
      let self = this
      try {
          let user = localStorage.getItem('userAuth');
          this.user = JSON.parse(user);            
        await Promise.all([ 
          this.GET_DATA(this.apiUrl+"/"+this.$route.params.id)
          ]).then((v) => {
            this.model = v[0];
            this.model = this.model[0];                        
        });
        this.fechaExpiracionFirma = transformFecha(await getFechaExpiracionFirma(this.model.url_firma,this.model.password_firma));                    
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;        
        let dropzoneFirma = new Dropzone('div#fileDrop',{
          url: process.env.URL_BACK+"uploadSing/"+this.user.id,            
          headers: {
            'Authorization': '',            
            'Cache-Control': null,
            'X-Requested-With': null
        }
        });
        dropzoneFirma.on("complete",function(file){                           
        });        
        dropzoneFirma.on("error",function (file){
          alert("Error al subir el archivo. Solo estan permitidos archivos con extension .p12");
          this.removeFile(file);
        })

      }
    });
  },
};
</script>
