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
                    <h6 class="text-white">Generar Nota de Crédito</h6>                    
                  </div>            
                </div>        
                <div class="card-body p-3">                  
                  <div class="form-group">
                    <label for="">Nº Nota de Crédito: <span>{{ secuenciales.codigo_establecimiento }} - {{ secuenciales.punto_emision }} - </span><span for="secuencialId">{{ secuenciales.sec_sig_not_cred }} </span></label>
                  </div>      
                  <div class="form-group">
                    <i class="fas fa-search"></i>
                    <label for="">Busca el Cliente Aquí</label>
                    <!--input type="text"  name="" class="form-control" id="" placeholder="Busca el Cliente...." 
                    v-model="buscarCliente"
                    @keyup.enter="searchCliente()"-->                  
                    <select class="form-control" v-model="model" @change="updateFields">                      
                      <option class="form-control" v-for="item in clientes" :key="item.id" :value="item.id">{{ item.nombre }}</option>                      
                    </select>                    
                  </div>
                  <div class="form-group">
                    <label for="">Cliente Seleccionado</label>
                    <input type="email" name="" class="form-control" id="" v-model="model.nombre" readonly>
                  </div>
                  <div class="form-group">                    
                    <input type="hidden"  name="" class="form-control" id="" v-model="model.id" readonly>                  
                  </div>             
                  <div class="form-group">
                    <label for="">Correo</label>
                    <input type="email" name="" class="form-control" id="" v-model="model.correo" readonly>
                  </div>
                  <div class="form-group">
                    <label for="">Dirección</label>
                    <input type="text"  name="" class="form-control" id="" v-model="model.direccion" readonly>                        
                  </div>
                  <div class="form-group">
                    <label for="">Identificación</label>
                    <input type="text" placeholder="" class="form-control" v-model="model.numero_documento" readonly/>                       
                  </div>
                  <div class="card-body p-3">
                    <div class="row">
                      <div class="col-6">
                          <div class="form-group has-success">
                            <label for="">Teléfono</label>
                            <input type="text" placeholder="" class="form-control" v-model="model.telefono" readonly/>
                          </div>
                      </div> 
                      <div class="col-6">
                          <div class="form-group has-success">
                            <label for="">Tipo ID</label>
                            <input type="text" class="form-control" placeholder="" v-model="model.tipo_identificador" readonly/>                          
                          </div>
                      </div>
                    </div>
                </div>
                </div>             
              </div>
            </div>
            <!--Datos de la Factura-->
            <div class="col-6">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="card bg-gradient-dark text-center px-2 py-2">
                    <h6 class="text-white">Factura Modificada</h6>
                  </div> 
                </div>
                <div class="card-body p-3">
                  <div class="form-group">
                    <label for="">Documento que Modifica</label>
                    <select class="form-select" aria-label="Default select example" v-model="model_factura.documentoModifica">
                              <option value="factura">Factura</option> 
                              <option value="factura">Nota de Venta</option>                                                           
                    </select>  
                  </div>
                  <div class="row">
                    <label for="">Número de Documento que Modifica</label>
                    <div class="col-4">
                      <div class="form-group has-success">                        
                        <input type="text" placeholder="001" class="form-control" v-model="model_factura.codigoEstablecimientoM" required/>
                      </div> 
                    </div>
                    <div class="col-4">
                      <div class="form-group has-success">                        
                        <input type="text" placeholder="002" class="form-control" v-model="model_factura.puntoEmisionM" required/>
                      </div> 
                    </div>
                    <div class="col-4">
                      <div class="form-group has-success">                        
                        <input type="text" placeholder="0000000xx" class="form-control" v-model="model_factura.secuencialM" required/>
                      </div> 
                    </div>
                  </div>                  
                  <div class="form-group">
                    <label for="">Motivo</label>
                    <input type="text"  name="" class="form-control" v-model="model_factura.motivoM" id="">                                    
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Fecha Doc. Modificado</label>
                        <input type="date" placeholder="" class="form-control" v-model="model_factura.fechaDocModifica" required/>
                      </div>                      
                    </div>              
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Fecha Emisión</label>
                          <input type="date" placeholder="" class="form-control" v-model="model_factura.fechaEmision"/>                       
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
          <div class="col-12 col-sm-5">
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
                          <input type="text" class="form-control bg-transparent border-0 text-white"
                            placeholder="Buscar..."
                            v-model="buscar"
                            @keyup.enter="CodeBar()" />
                            <span class="mt-2 text-white px-2">
                              <i type="button" class="fa fa-times-circle" aria-hidden="true" @click="Borrar()"></i>                           
                            </span>
                        </div>
                      </div>
                      <!--div class="col-lg-6 col-md-6 col-12 my-auto ms-auto">
                        <div class="input-group input-group-lg">
                          <span class="input-group-text text-white bg-transparent border-0">
                            <i class="ni ni-box-2 text-lg" aria-hidden="true"></i>
                          </span>
                          <select name="" id="" class="form-control bg-transparent border-0 text-white">
                            <option value="all" class="text-dark">
                              Todas las marcas
                            </option>
                            <option class="text-dark">marcas</option>
                          </select>
                        </div>
                      </div-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 py-2" style="min-height: 60vh;max-height: 60vh;overflow-y: scroll;overflow-x: none;">
                <div class="row">
                  <div class="col-3" v-for="m in productosFilter">
                   <PosProducto :producto="m" @AddProducto="AddProducto"></PosProducto>
                  </div>
                </div>
              </div>
              <div class="col-xl-12">
                <div class="card">
                  <!--div class="card-body d-flex p-3">
                    <h6 class="my-auto">Categoría</h6>
                    <div class="nav-wrapper position-relative ms-auto w-50">
                      <ul class="nav nav-pills nav-fill p-1" role="tablist">
                        <li class="nav-item active" role="presentation">
                          <a class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#cam1" role="tab"
                            aria-controls="cam1" aria-selected="true">
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="dropdown pt-2">
                      <a href="javascript:;" class="text-secondary ps-4" id="dropdownCam" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3" aria-labelledby="dropdownCam"
                        style="">
                        <li>
                          <a class="dropdown-item border-radius-md" href="javascript:;">Todo</a>
                        </li>
                        <li>
                          <a class="dropdown-item border-radius-md" href="javascript:;">All categ</a>
                        </li>
                      </ul>
                    </div>
                  </div-->
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-7">
            <div class="card card-pricing">
              <div class="card-header bg-gradient-dark text-center pt-4 pb-5 position-relative">
                <div class="z-index-1 position-relative">
                  <h1 class="text-white mt-2 mb-0"><small></small>{{ Number(granTotal).toFixed(2) }}</h1>
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
                <div class="table-responsive p-0" style="min-height: 30vh">
                  <table class="table align-items-center justify-content-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          Producto
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          Cantidad
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          Precio Unit.
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          Descuento
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          SubTotal
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                          Impuesto %
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(m,i) in carrito">
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ m.producto.nombre_producto }}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ Number(m.cantidad)<=0?alerta("valor de cantidad"): m.cantidad}}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ Number(m.precio).toFixed(4) }}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ Number(m.producto.descuento).toFixed(2) }}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2)<0? alerta("subtotal") :Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2)}}
                          </p>
                        </td>
                        <td class="text-start">
                          <p class="text-xxs font-weight-bold mb-0 text-start">
                            {{ Number(m.producto.impuesto_iva) }}
                          </p>
                        </td>
                        <td>
                          <div class="input-group input-group-sm">
                            <button class="btn btn-outline-primary mb-0 btn-sm mb-1" type="button"
                            @click="[modalEdit=true,item=m]"
                            >
                              <i class="fas fa-pen"></i>
                            </button>
                            <button class="btn btn-outline-danger mb-0 btn-sm" type="button"
                            @click="EliminarItem(i)"
                            >
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="container mt-5">
                  <div class="row justify-content-md-center mb-2">
                    <div class="col-sm-8">
                      <p class="font-weight-bold">Subtotal Sin Impuesto 12%</p>
                    </div>
                    <div class="col-sm-4">
                      <!--input class="form-control" type="text" placeholder="0" readonly v-model.number=totales.sub_sin_impuesto_12-->                      
                      <span>{{ Number(totalCarrito).toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="row justify-content-md-center mb-2">
                    <div class="col-sm-8">
                      <p class="font-weight-bold">Subtotal Sin Impuesto 0%</p>
                    </div>
                    <div class="col-sm-4">
                      <span>{{ Number(totalCarrito).toFixed(2) }}</span>                      
                    </div>
                  </div>  
                  <div class="row justify-content-md-center mb-2">
                    <div class="col-sm-8">
                      <p class="font-weight-bold">Total Descuentos</p>
                    </div>
                    <div class="col-sm-4">
                      <!--input class="form-control" type="text" placeholder="0" readonly v-model.number=totales.total_descuentos /-->                                         
                      <span>{{ totalDescuento }}</span>
                      
                    </div>
                  </div>
                  <div class="row justify-content-md-center mb-2">
                    <div class="col-sm-8">
                      <p class="font-weight-bold">Impuesto 12%</p>
                    </div>
                    <div class="col-sm-4">
                      {{ totalIva }}
                    </div>
                  </div>
                  <div class="row justify-content-md-center mb-2">
                    <div class="col-sm-8">
                      <p class="font-weight-bold">Total</p>
                    </div>
                    <div class="col-sm-4">
                      <span>{{ Number(granTotal).toFixed(2) }}</span>
                    </div>
                  </div>                     
                </div>
                <button @click="Save()" class="btn bg-gradient-dark w-100 mt-4 mb-0">
                  <i class="fas fa-save mx-2"></i> Generar Nota de Crédito
                </button>                
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalEdit ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
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
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Iva</label>
                          <select class="form-select" aria-label="Default select example" v-model.number="item.producto.impuesto_iva">
                              <option value="12">Iva 12%</option>
                              <option value="0">Iva 0%</option>
                              <option value="0">No aplica Iva</option>
                          </select>                        
                      </div>
                    </div>
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
                  <button type="button" @click="modalEdit = false" class="btn bg-gradient-secondary w-100"
                    data-bs-dismiss="modal">
                    Cerrar
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
      modulo: "Facturación",
      page: "Nueva Nota de Crédito",
      load: true,
      modalEdit: false,
      productos: [],
      clientes:[],
      secuenciales: [],
      carrito: [],
      descuentos:[],
      buscar:"",
      buscarCliente:"",
      apiUrl: 'facturas',           
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
          forma_pago: ' ',
          fecha: '',
          tipo_identificador: '',
          numero_documento: '',          
          telefono: '',
        },        
      model_factura:{                    
          ambiente:'',
          tipo_comprobante:1, //si es factura o nota de venta y demas
          detalle_factura:'',
          fecha_emision:'',          
          cliente_id:'',          
          secuencial_id:'',
          
          documentoModifica:'',
          codigoEstablecimientoM:'',
          puntoEmisionM:'',
          secuencialM:'',
          motivoM:'',
          fechaDocModifica:'',
          fechaEmision:''
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
        return this.carrito.reduce((a,b)=>a+(b.cantidad*b.precio),0);            
    },
    totalDescuento(){
      return Number(this.carrito.reduce((acumulado, m) =>acumulado + (Number(m.producto.descuento)), 0)).toFixed(2);
    },
    totalIva(){
        return Number(this.carrito.reduce((acumulado, m) => acumulado + ((m.precio * m.cantidad) * m.producto.impuesto_iva/100 ), 0)).toFixed(2);    
    },
    granTotal(){
      return Number((this.totalCarrito-this.totalDescuento))+Number(this.totalIva);
    }
    
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Save(){
      this.load=true;
      setTimeout(() => {
        this.load=false;
      console.log('Han pasado 5 segundos');
    }, 5000);
    

      

      
      /*
      const operacion={
        subtotal_12:this.totalCarrito,
        subtotal_0:"",
        subtotal_no_objeto_iva:"",
        subtotal_sin_impuesto:this.totalCarrito,
        secuencial_sec:this.secuenciales.sec_sig_fact,
        total_descuento:this.totalDescuento,
        total_grabado:this.granTotal,
        carrito:this.carrito,
        adicional_factura:this.model_factura
      }      
      if(this.model_factura.fecha_emision==""||this.model.nombre==""){
        this.$swal.fire({
          icon:"error",
          title: "Error en el Ingreso de Datos",
          text: "Por favor revise todos los campos antes de continuar...",
          //title: responseGenerado,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {            
          }
        })
      }else if(this.carrito.length==0){
        this.$swal.fire({
          icon:"error",
          title: "Carrito Vacio",
          text: "Antes de continuar seleccione algun Producto...",
          //title: responseGenerado,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {            
          }
        })
      }else{
        try{      
        const res = await this.$api.$post(this.apiUrl, operacion);        
        const responseGenerado= res[0]=="RECIBIDA" && res[3]=="AUTORIZADO"? "Factura Generada Correctamente":"Factura Generada pero no Recibida o Autorizada.";        
        this.$swal.fire({
          title: responseGenerado+" \n Recepción: "+res[0] +". \n Estado: "+res[3],
          //title: responseGenerado,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.back();
          }
        })
      } catch (e) {            
      this.$swal.fire({
      title: "Error al generar la Factura",
      text: "Por favor, comunicate con el Administrador.",
      icon: "error",
      confirmButtonText: "Ok"
      }).then((result)=>{
        if (result.isConfirmed) {            
          }
      });
      }      
      } 
      */             
    },
    downloadXML(xmlData){
      const blob = new Blob([xmlData], { type: 'text/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Respuesta.xml';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 
    async Datos() {
      try {
        await Promise.all([this.GET_DATA('productos')]).then((v) => {
          this.productos = v[0];
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Clientes(){
      try {
        await Promise.all([this.GET_DATA('clientes')]).then((v) => {
          this.clientes = v[0];          
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Secuenciales(){
      try {
        await Promise.all([this.GET_DATA('secuencials/1')]).then((v) => {
          this.secuenciales = v[0];          
          this.model_factura.ambiente=this.secuenciales.datos_emisores.ambiente;
          this.model_factura.secuencial_id=this.secuenciales.id;
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
      }else{
        const item={
        producto: producto,
        cantidad:1,
        precio:producto.precio_producto                      
      }            
      this.carrito.push(item);      
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
    searchCliente(){
      let search=this.buscarCliente.toLowerCase();      
      let buscarCliente=this.clientesFilter.filter((i)=>i.nombre.toLowerCase()==search);      
      this.model=buscarCliente[0];
      //const etiquetaNombre = document.querySelector('span[for="secuencialId"]');            
      //this.model_factura.secuencial_id=etiquetaNombre.textContent.trim();
      this.model_factura.cliente_id=buscarCliente[0].id;            
      /*
      if(buscarCliente.length>0){
        this.AddProducto(buscarRegistro[0]);
        this.buscar='';
      }
      */
    },
    updateFields() {
      this.model = this.clientes.find(option => option.id === this.model);
      this.model_factura.cliente_id=this.model.id;  
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
    Borrar(){
      this.buscar="";
    },
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = ''; // Necesario para mostrar el mensaje personalizado en algunos navegadores
      return '¿Estás seguro de que quieres recargar la página? Se perderán los cambios no guardados.';
    },    
  },

  mounted() {
    this.$nextTick(async () => {
      try {
        await this.Datos();
        await this.Clientes();
        await this.Secuenciales();        
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }
};
</script>
<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>
