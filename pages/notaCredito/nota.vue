<template>
  <div>
    <Loader :load="load"></Loader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="container-fluid py-4">
          <div class="row mt-2">
            <!--Facturacion-->
            <div class="col-6 ">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="card bg-gradient-dark text-center px-2 py-2">
                    <h6 class="text-white fs-4">Registro de Ventas</h6>                                
                  </div>              
                </div>        
                <div class="card-body p-3">                  
                  <div class="form-group">
                    <label for="" class="fs-5">Nº Factura: <span>{{ secuenciales.codigo_establecimiento }} - {{ secuenciales.punto_emision }} - </span><span for="secuencialId">{{ secuenciales.sec_sig_not_cred }} </span></label>                    
                  </div>      
                  <div class="form-group autocomplete">
                    <i class="fas fa-search"></i>
                    <label for="" class="fs-5">Busca el Cliente Aquí</label>
                    <input type="text"  name="" class="form-control fs-6" id="" placeholder="Busca el Cliente...." 
                    v-model="searchQuery"
                    @input="filterClientes">
                    <ul v-if="searchQuery && filteredClientes.length > 0" class="autocomplete-list">
                      <li
                        v-for="item in filteredClientes"
                        :key="item.id"
                        @click="selectCliente(item)"
                        class="autocomplete-item"
                        style="cursor: pointer;"
                      >
                        {{ item.nombre }}
                      </li>
                    </ul>                                 
                      <!--select class="form-control" v-model="model" @change="updateFields">                      
                        <option class="form-control" v-for="item in clientes" :key="item.id" :value="item.id">{{ item.nombre }}</option>                      
                      </select-->                    
                  </div>
                  <div class="form-group">
                    <label for="" class="fs-5">Cliente Seleccionado <span class="text-danger">*</span></label>
                    <input type="text" name="" class="form-control fs-6" id="" v-model="model.nombre" readonly>
                  </div>
                  <div class="form-group">                    
                    <input type="hidden"  name="" class="form-control" id="" v-model="model.id" readonly>                  
                  </div>             
                </div>             
              </div>
            </div>
            <!--Datos de la Factura-->
            <div class="col-6">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="card bg-gradient-dark text-center px-2 py-2">
                    <h6 class="text-white fs-4">Detalle Compra</h6>
                  </div> 
                </div>
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="" class="fs-5">Fecha de Emisión <span class="text-danger">*</span></label>
                        <input type="date" placeholder="" class="form-control fs-6"  v-model="model_factura.fecha_emision" readonly/>
                      </div>                      
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="" class="fs-5">Tipo ID <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="" v-model="model.tipo_identificador" readonly/>                          
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="" class="fs-5">Documento Cliente <span class="text-danger">*</span></label>
                          <input type="text" placeholder="" class="form-control" v-model="model.numero_documento" readonly/>                       
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="" class="fs-5">Teléfono <span class="text-danger">*</span></label>
                        <input type="text" placeholder="" class="form-control" v-model="model.telefono" readonly/>
                      </div>
                    </div>                                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Cuerpo Principal-->
        <div class="row justify-content-end">
          <div class="col-12 col-sm-3">
            <div class="row">
              <div class="col-12">
                <div class="card bg-gradient-dark">
                  <div class="card-header bg-transparent py-2 px-3">
                    <div class="row">
                      <div class="col-md-12 col-12">
                        <div class="input-group input-group-lg">
                          <span class="input-group-text text-white bg-transparent border-0">
                            <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                          </span>
                          <input ref="campoBuscar" type="text" class="form-control bg-transparent border-0 text-white"
                            placeholder="Buscar..."
                            v-model="buscar"
                            @keyup.enter="CodeBar()" />
                            <span class="ml-2  px-2 py-3">
                              <!--div class="container">
                                <div class="row">
                                  <div class="col">
                                    <button type="button" class="btn btn-danger text-white" @click="limpiarCampo()">Borrar</button>                                  
                                    <button type="button" class="btn btn-danger text-white" @click="limpiarCampo()">Borrar</button>
                                  </div>                                                                                    
                                </div>                 
                              </!--div-->
                              <div class="d-flex align-items-start flex-column">                                
                                <div><button type="button" class="badge badge-primary text-white" @click="limpiarCampo()">Borrar</button></div>  
                              </div>                                           
                            </span>
                        </div>
                      </div>                
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 py-2" style="min-height: 60vh;max-height: 60vh;overflow-y: scroll;overflow-x: none;">                             
                <table class="table table-hover">
                <thead class="table-secondary">
                  <tr>                                                      
                    <th scope="col" class="text-center">Producto</th>
                    <th scope="col">Precio</th>
                  </tr>
                </thead>
                <tbody v-for="m in productosFilter">
                  <PosProducto :producto="m" @AddProducto="AddProducto"></PosProducto>             
                </tbody>
                </table>                
              </div>
              <br/>
              <br/>
              <div class="col-xl-12">
                <div class="card">
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="card card-pricing">
              <div class="card-header bg-gradient-dark text-center pt-2 pb-3 position-relative">
                <div class="z-index-1 position-relative">
                  <h3 class="text-white mt-2 mb-0"><small></small>{{ Number(granTotal).toFixed(2) }}</h3>
                  <h6 class="text-white">Total</h6>
                </div>
              </div>
              <div class="position-relative mt-n5" style="height: 50px">
                <div class="position-absolute w-100">
                  <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none"
                    shape-rendering="auto">
                    <defs>
                      <path id="card-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                      </path>
                    </defs>
                    <g class="moving-waves">
                      <use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30"></use>
                      <use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
                      <use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
                      <use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
                      <use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
                      <use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)"></use>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card-body text-center p-3">
                <div class="d-flex align-items-center px-2">
                  <h6>CARRITO</h6>
                  <button type="button"
                    class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-auto"
                    data-bs-toggle="tooltip" data-bs-placement="bottom">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="table-responsive p-0" style="min-height: 40vh;max-height: 40vh;overflow-y: scroll;overflow-x: none;" >
                  <table class="table align-items-center justify-content-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase font-weight-bolder ps-2 text-start">
                          Producto
                        </th>
                        <th class="text-uppercase font-weight-bolder ps-2 text-start">
                          Cantidad
                        </th>
                        <th class="text-uppercase font-weight-bolder ps-2 text-start">
                          Precio Unit.
                        </th>
                        <th class="text-uppercase font-weight-bolder ps-2 text-start">
                          SubTotal
                        </th>                               
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(m,i) in carrito">
                        <td class="text-start">
                          <p class="font-weight-bold mb-0 text-start">
                            {{ m.producto.nombre_producto }}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="font-weight-bold mb-0 text-start">
                            {{ m.cantidad == null ? alerta("valor de cantidad"): m.cantidad}}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="font-weight-bold mb-0 text-start">
                            {{ Number(m.precio).toFixed(4) }}
                          </p>
                        </td>      
                        <td class="text-start">
                          <p class="font-weight-bold mb-0 text-start">
                            {{ Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2) < 0 ? alerta("subtotal") : Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2)}}
                          </p>
                        </td>
                        <td>
                          <div class="input-group input-group-sm">
                            <button class="btn btn-outline-primary mb-0" type="button"
                            @click="[modalEdit=true,item=m]"
                            >                              
                              CAMBIAR
                            </button>
                            <button class="btn btn-outline-danger mb-0" type="button"
                            @click="EliminarItem(i)"
                            >
                            ELIMINAR
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>                
                <div class="container">
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold fs-2">Total</p>
                    </div>
                    <div class="col-sm-8">
                      <span class="fs-2 font-weight-bold">{{ Number(granTotal).toFixed(2) }}</span>
                    </div>
                  </div>                     
                </div>              
                <ModalVerificacion :title="modalTitle" :total="this.granTotal" :cliente="this.model.nombre" :datos="this.carrito" :datos_adicionales="this.model_factura" :secuenciales="this.secuenciales"  @cerrar="cerrarModal" ref="modalComponent" />                
                <button @click="PrevisualizarFinal()" @keyup.enter="handlerEnterRegistro" class="btn bg-gradient-dark w-100 mb-0 fs-5">
                  <i class="fas fa-save mx-2"></i> Registrar Venta
                </button>                
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalEdit ? 'showModal' : ''" id="AjusteModal" tabindex="0" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Editar artículo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalEdit = false" data-bs-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group has-success">
                        <label for="">Producto</label>
                        <input type="text" placeholder="" disabled class="form-control" 
                        :value="item.producto.nombre_producto"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Cantidad</label>
                        <input type="text" placeholder="" class="form-control" 
                        v-model.number="item.cantidad"/>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Precio Unit.</label>
                        <input type="text" placeholder="" class="form-control" 
                        v-model.number="item.precio"/>
                      </div>
                    </div>
                    <!--div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Iva</label>
                          <select class="form-select" aria-label="Default select example" v-model.number="item.producto.impuesto_iva">
                            <option value="15">Iva 15%</option>  
                             <option value="12">Iva 12%</option>
                              <option value="0">Iva 0%</option>
                              <option value="0">No aplica Iva</option>
                          </select>                        
                      </div>
                    </div-->
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Descuento</label>
                        <input type="text" placeholder="" class="form-control" 
                        v-model.number="item.producto.descuento"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="modalEdit = false" class="btn btn-info w-100 text-white"
                    data-bs-dismiss="modal">
                    Hecho
                  </button>
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
export default {  
  head() {
    return {
      title: this.modulo,
    };
  },
  data() {
    return {
      modalTitle: 'Resumen Final',
      datosTabla:[],
      datosTotales:{},
      datosUsuario:{},      
      modulo: "Facturacion",
      page: "Nueva Factura",
      load: true,
      modalEdit: false,
      productos: [],
      clientes:[],
      usuarios:[],
      secuenciales: [],
      carrito: [],
      descuentos:[],
      buscar:"",
      buscarCliente:"",
      apiUrl: 'facturas',
      fechaActual:"",
      user:{},
      searchQuery: '', 
      filteredClientes:'',
      clienteSeleccionado:'',                
      item:{
        producto:{
          nombre:''
        },
        cantidad:0,
        precio:0        
      },
      model: {
          nombre:'',
          correo:'',
          direccion: '',
          detalle:'',
          forma_pago: '',
          fecha: '',
          tipo_identificador: '',
          numero_documento: '',          
          telefono: ''                  
        },        
      model_factura:{                    
          ambiente:'',
          tipo_comprobante:1, //si es factura o nota de venta y demas
          detalle_factura:'',
          fecha_emision:'',
          forma_pago:'c_u_s_f',          
          plazo:'0',
          unidades_tiempo:'days',
          cliente_id:'',          
          secuencial_id:''  
      },     
    };
  },
  computed: {
    productosFilter(){
      let buscar= this.buscar;
      if(buscar!=''){
        return this.productos.filter((a)=>{
          let nombre=a.nombre_producto!=null? a.nombre_producto:'';
          let codigo=a.codigo_producto!=null? a.codigo_producto:'';
          return nombre.toLowerCase().indexOf(buscar.toLowerCase())!=-1 || codigo.toLowerCase().indexOf(buscar.toLowerCase())!=-1;          
        })
      }
      return this.productos;
    },
    clientesFilter(){
      let buscarCliente=this.buscarCliente;
      if(buscarCliente!=''){
        return this.clientes.filter((a)=>{
          let nombre=a.nombre!=null?a.nombre:'';
          return nombre.toLowerCase().indexOf(buscarCliente.toLowerCase())!=-1;
        })
      }
    },
    totalCarrito(){        
      return this.carrito.reduce((total,m)=>{
          if(m.impuesto==='12' || m.impuesto === '15'){
            return total + (m.precio * m.cantidad) - m.producto.descuento;
          }else{
            return total;
          }
      },0);
    },
    totalCarrito0(){
      return this.carrito.reduce((total,m)=>{
          if(m.impuesto==='0'){
            return total + (m.precio * m.cantidad)- m.producto.descuento;
          }else{
            return total;
          }
      },0);
    },
    totalNoObjeto(){
      return this.carrito.reduce((total,m)=>{
          if(m.impuesto==='-'){
            return total + (m.precio * m.cantidad) - m.producto.descuento;
          }else{
            return total;
          }
      },0);
    },
    totalSinImpuestos(){
      return this.totalCarrito+this.totalCarrito0+this.totalNoObjeto;
    },
    totalDescuento(){
      return Number(this.carrito.reduce((acumulado, m) =>acumulado + (Number(m.producto.descuento)), 0)).toFixed(2);
    },
    totalIva(){
        return Number(this.carrito.reduce((acumulado, m) => acumulado + ((m.precio * m.cantidad) * m.producto.impuesto_iva/100 ), 0)).toFixed(2);    
    },
    granTotal(){
      return Number(this.totalSinImpuestos);
    }
    
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },    
    abrirModal() {      
      this.$refs.modalComponent.$el.classList.add('show'); // Agrega la clase 'show' para mostrar el modal
      this.$refs.modalComponent.$el.style.display = 'block'; // Establece el estilo 'display: block' para mostrar el modal
      //document.body.classList.add('modal-open'); // Agrega la clase 'modal-open' al cuerpo para evitar el desplazamiento      
    },
    cerrarModal() {
      this.$refs.modalComponent.$el.classList.remove('show'); // Remueve la clase 'show' para ocultar el modal
      this.$refs.modalComponent.$el.style.display = 'none'; // Establece el estilo 'display: none' para ocultar el modal
      //document.body.classList.remove('modal-open'); // Remueve la clase 'modal-open' del cuerpo
    },
    filterClientes() {      
      if (this.searchQuery) {
        this.filteredClientes = this.clientes.filter((item) =>
          item.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );                
      } else {
        this.filteredClientes = [];
      }
    },
    selectCliente(cliente) {
      this.searchQuery = cliente.nombre;      
      this.model = cliente;
      this.model_factura.cliente_id=this.model.id;       
      this.filteredClientes = [];
    },
    PrevisualizarFinal(){                     
      this.abrirModal();  
    },
    playSound() {    
      const audio = new Audio('/assets/sounds/TonoAdd.mp3');
      audio.play()
    },
    async Datos(idUser) {
      try {        
        await Promise.all([this.GET_DATA('productos/'+idUser)]).then((v) => {
          this.productos = v[0];          
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Clientes(idUser){
      try {
        await Promise.all([this.GET_DATA('clientes/'+idUser)]).then((v) => {
          this.clientes = v[0];          
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Usuario(idUser){
      try {
        await Promise.all([this.GET_DATA('usuarios/'+idUser)]).then((v) => {
          this.usuarios = v[0];
          this.datosUsuario = this.usuarios[0];
                            
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Secuenciales(idUser){
      try {
        await Promise.all([this.GET_DATA('secuencialesUser/'+idUser)]).then((v) => {          
          v[0].forEach((item)=>{            
            this.secuenciales = item;
            this.model_factura.ambiente=item.datos_emisores.ambiente;
            this.model_factura.secuencial_id=item.id;
            this.datosUsuario = item.datos_emisores.usuarios;
          });                            
        });
      } catch (e) {
        console.log(e);
      }
    },
    AddProducto(producto){
      let id=producto.id;
      let buscarRegistro=this.carrito.filter((i)=>i.producto.id===id);
      if(buscarRegistro.length>0){
        let indice=this.carrito.findIndex((i)=>i.producto.id===id);
        let item=this.carrito[indice];
        this.carrito[indice].cantidad+=1;
        this.playSound();    
        this.limpiarCampo();
        this.$refs.campoBuscar.focus();    
      }else{
        const item={
        producto: producto,
        cantidad:1,
        precio:producto.precio_producto,
        impuesto:producto.impuesto_iva                           
      }            
      this.carrito.push(item);
      this.playSound();      
      this.limpiarCampo();
      this.$refs.campoBuscar.focus();
      }
    },
    EliminarItem(id){
    this.carrito.splice(id,1);
    },
    CodeBar(){
      let code=this.buscar.toLowerCase();      
      let buscarRegistro=this.productosFilter.filter((i)=>i.codigo_producto.toLowerCase()==code);      
      if(buscarRegistro.length>0){
        this.AddProducto(buscarRegistro[0]);
        this.buscar='';
      }
    },
    limpiarCampo(){
      this.buscar ='';
    },
    searchCliente(){
      let search=this.buscarCliente.toLowerCase();      
      let buscarCliente=this.clientesFilter.filter((i)=>i.nombre.toLowerCase()==search);      
      this.model=buscarCliente[0];      
      this.model_factura.cliente_id=buscarCliente[0].id;            
    },    
    alerta(text){
      this.$swal.fire({
            title: "Atencion! \n El "+text+" no puede ser cero",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok"
          }).then((result) => {
            if (result.isConfirmed) {
              this.carrito.producto.descuento=0;
            }
          })      
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
    },
    getFechaActual(){
      const fecha =  new Date();
      const year = fecha.getFullYear();
      var month = fecha.getMonth();
      month = month + 1;
      var day = fecha.getDate();
      if(month >=1 && month < 10){
        month = "0".concat(month);
      }
      if(day >=1 && day<10){
        day="0".concat(day);
      }      
      return year+"-"+month+"-"+day;
    },    
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        let loginUser = localStorage.getItem('userAuth');
        this.user = JSON.parse(loginUser);
        if(this.user == null){
          this.$router.push('/auth/login');
        }else{
          await this.Datos(this.user.id);
          await this.Clientes(this.user.id);
          await this.Secuenciales(this.user.id); 
          await this.Usuario(this.user.id);                              
          this.fechaActual=this.getFechaActual();               
          this.model_factura.fecha_emision = this.fechaActual;
          this.filteredClientes = this.clientes;             
          this.model = this.clientes[1]; // id del consumidor final
          this.model_factura.cliente_id=this.model.id;               
          window.addEventListener("keyup", this.handleKeyUp);
          this.$refs.campoBuscar.focus();                      
        }        
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleKeyUp);
  },

};
</script>

<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
.autocomplete {
  position: relative;
}

.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000;
  list-style-type: none;
  padding: 0;
  margin: 0;  
}

.autocomplete-item {
  padding: 8px;
  cursor: pointer;
}

.autocomplete-item:hover {
  background-color: #f0f0f0;
}
</style>
