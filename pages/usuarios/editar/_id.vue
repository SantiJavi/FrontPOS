<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-4 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Cargue el Logo para sus Documentos Electronicos</h3>
              </div>
              <div class="card-body">
                <div class="form-control dropzone" id="fileDrop">
                  <div class="fallback">
                    <input name="file" type="file"/>
                  </div>
                </div>
              </div> 
              <div class="row justify-content-md-center">
                  <div class="col-4">
                    <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                  </div>                        
              </div>                                   
            </div>
          </div>

          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Actualizar</h3>
              </div>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                    <div class="avatar me-3">
                      <img :src="this.list.url" alt="imagenLogo" class="border-radius-lg shadow">
                    </div>
                    <div class="d-flex align-items-start flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">Logo Empresarial</h6>                      
                    </div>
                    <!--a 
                      class="btn btn-link pe-3 ps-0 mb-0 ms-auto" 
                      href="javascript:void(0);"
                      @click="EliminarImage()">Eliminar</a-->
                  </li>
                </ul>
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
      list:{},
      model: {
        nombre: "",
        barra: "",
        stock_minimo:0,
        compra:0,
        venta:0,
        marca_id:'',
        medida_id:'',
        categoria_id:'',
      },
      apiUrl: "usuarios",
      page: "Configuracion",
      modulo: "Usuarios",
      marcas:[],
      medidas:[],
      categorias:[],
    };
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
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
          this.GET_DATA(this.apiUrl+"/"+this.user.id)
          ]).then((v) => {
            this.list = v[0];
            this.list = this.list[0];            
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;        
        let dropzoneLogo = new Dropzone('div#fileDrop',{
          url: process.env.URL_BACK+"logo/"+this.user.id,            
          headers: {
            'Authorization': '',                        
            'Cache-Control': null,
            'X-Requested-With': null
        }
        });
        dropzoneLogo.on("complete",function(file){
          this.removeFile(file);
          alert("Logo Cargado Correctamente");
          self.$router.go(-1);
        });
        dropzoneLogo.on("error",function(file){
          alert("Error al subir el archivo. Por favor solo puede subir fotografias");
          this.removeFile(file);
        })
      }
    });
  },
};
</script>
