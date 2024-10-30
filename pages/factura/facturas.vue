<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="container-fluid py-4">
          <div class="row mt-2">
            <!--Facturacion-->
            <div class="col-6 ">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="card bg-gradient-dark text-center px-2 py-2">
                    <h6 class="text-white">Facturación</h6>                                
                  </div>            
                </div>        
                <div class="card-body p-3">                  
                  <div class="form-group">
                    <label for="">Nº Factura: <span>{{ secuenciales.codigo_establecimiento }} - {{ secuenciales.punto_emision }} - </span><span for="secuencialId">{{ secuenciales.sec_sig_fact }} </span></label>                    
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
                    <label for="">Cliente Seleccionado <span class="text-danger">*</span></label>
                    <input type="email" name="" class="form-control" id="" v-model="model.nombre" readonly>
                  </div>
                  <div class="form-group">                    
                    <input type="hidden"  name="" class="form-control" id="" v-model="model.id" readonly>                  
                  </div>             
                  <div class="form-group">
                    <label for="">Correo <span class="text-danger">*</span></label>
                    <input type="email" name="" class="form-control" id="" v-model="model.correo" readonly>
                  </div>
                  <div class="form-group">
                    <label for="">Dirección <span class="text-danger">*</span></label>
                    <input type="text"  name="" class="form-control" id="" v-model="model.direccion" readonly>                        
                  </div>
                  <div class="form-group">
                    <label for="">Detalle</label>
                    <input type="text"  name="" placeholder="Ingrese una pequeña descripcion (Max 200 Caracteres)" class="form-control" id="" v-model="model_factura.detalle_factura">                        
                  </div>
                  <div class="form-group">
                    <label for="">Forma de Pago <span class="text-danger">*</span></label>
                    <select class="form-select" aria-label="Default select example" v-model="model_factura.forma_pago" required>
                        <option value="c_u_s_f">OTROS CON UTILIZACION DEL SISTEMA FINANCIERO</option>
                        <option value="s_u_s_f">SIN UTILIZACION DEL SISTEMA FINANCIERO</option>
                        <option value="comp_deudas">COMPENSACION DE DEUDAS</option>
                        <option value="t_debito">TARJETA DE DEBITO</option>
                        <option value="dinero_electronico">DINERO ELECTRONICO</option>
                        <option value="t_credito">TARJETA DE CREDITO</option>
                        <option value="t_prepago">TARJETA PREPAGO</option>
                        <option value="endoso">ENDOSO DE TITULOS</option>                        
                    </select>
                  </div>
                </div>             
              </div>
            </div>
            <!--Datos de la Factura-->
            <div class="col-6">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="card bg-gradient-dark text-center px-2 py-2">
                    <h6 class="text-white">Detalle Factura</h6>
                  </div> 
                </div>
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Fecha de Emisión <span class="text-danger">*</span></label>
                        <input type="date" placeholder="" class="form-control"  v-model="model_factura.fecha_emision" readonly/>
                      </div>                      
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Tipo ID <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="" v-model="model.tipo_identificador" readonly/>                          
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Documento Cliente <span class="text-danger">*</span></label>
                          <input type="text" placeholder="" class="form-control" v-model="model.numero_documento" readonly/>                       
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Teléfono <span class="text-danger">*</span></label>
                        <input type="text" placeholder="" class="form-control" v-model="model.telefono" readonly/>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group has-success">
                        <label for="">Guía de Remisión (000-000-000000000)
                          solo si es requerido:</label>
                        <input type="text" placeholder="" class="form-control"/>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Plazo <span class="text-danger">*</span></label>
                        <input type="text" placeholder="0" class="form-control" v-model="model_factura.plazo"/>                       
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Unidad de Tiempo <span class="text-danger">*</span></label>                       
                        <select class="form-select" aria-label="Default select example" v-model="model_factura.unidades_tiempo">
                              <option value="days">Dias</option>
                              <option value="months">Meses</option>
                              <option value="years">Años</option>
                        </select>  
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
                <!--div class="row">
                  <div class="col-3" v-for="m in productosFilter">
                    <PosProducto :producto="m" @AddProducto="AddProducto"></PosProducto>
                  </div>
                </div-->                
                <table class="table table-hover">
                <thead class="table-secondary">
                  <tr>                    
                    <th scope="col">Elegir Prod</th>
                    <th scope="col">Cod.</th>
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
              <!--button @click="PrevisualizarFactura()" class="btn bg-gradient-success w-100 mt-4 mb-0">
                  <i class="fas fa-save mx-2"></i> Previsualización de Factura
                </button-->

              <div class="col-xl-12">
                <div class="card">                  
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
                            {{ Number(m.cantidad) <=0 ? alerta("valor de cantidad"): m.cantidad}}
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
                            {{ Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2)<0? alerta("subtotal") : Number(m.precio*m.cantidad - m.producto.descuento).toFixed(2)}}
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
                              <!--i class="fas fa-pen"></i-->
                              Cambiar
                            </button>
                            <button class="btn btn-outline-danger mb-0 btn-sm" type="button"
                            @click="EliminarItem(i)"
                            >
                            Quitar
                              <!--i class="fas fa-times"></i-->
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="container mt-5">
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Subtotal 15%</p>
                    </div>
                    <div class="col-sm-8">                      
                      <span>{{ Number(totalCarrito).toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Subtotal 0%</p>
                    </div>
                    <div class="col-sm-8">
                      <span>{{ Number(totalCarrito0).toFixed(2) }}</span>                      
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Subtotal No Obj. Iva</p>
                    </div>
                    <div class="col-sm-8">
                      <span>{{ Number(totalNoObjeto).toFixed(2) }}</span>                      
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Subtotal Sin Impuestos</p>
                    </div>
                    <div class="col-sm-8">
                      <span>{{ Number(totalSinImpuestos).toFixed(2)}}</span>                      
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Total Descuentos</p>
                    </div>
                    <div class="col-sm-8">
                      <!--input class="form-control" type="text" placeholder="0" readonly v-model.number=totales.total_descuentos /-->                                         
                      <span>{{ totalDescuento }}</span>
                      
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Impuesto 15%</p>
                    </div>
                    <div class="col-sm-8">
                      {{ totalIva }}
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <p class="font-weight-bold">Total</p>
                    </div>
                    <div class="col-sm-8">
                      <span>{{ Number(granTotal).toFixed(2) }}</span>
                    </div>
                  </div>                     
                </div>              
                <Modal :title="modalTitle" :datos="datosTabla" @cerrar="cerrarModal" ref="modalComponent" />
                <button @click="Save()" class="btn bg-gradient-dark w-100 mt-4 mb-0">
                  <i class="fas fa-save mx-2"></i> Generar Factura
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
                            <option value="15">Iva 15%</option>  
                             <!--option value="12">Iva 12%</option-->
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
import Modal from '../../components/Modal.vue';
export default {  
  head() {
    return {
      title: this.modulo,
    };
  },
  data() {
    return {
      modalTitle: 'Previsualización de Factura',
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
      return Number(this.totalSinImpuestos)+Number(this.totalIva);
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

    async Save(){           
      const operacion={
        subtotal_12:this.totalCarrito,
        subtotal_0:this.totalCarrito0,
        subtotal_no_objeto_iva:this.totalNoObjeto,
        subtotal_sin_impuesto:this.totalSinImpuestos,
        secuencial_sec:this.secuenciales.sec_sig_fact,
        total_descuento:this.totalDescuento,
        total_grabado:this.granTotal,
        carrito:this.carrito,
        adicional_factura:this.model_factura
      }             
      if(this.model_factura.fecha_emision==""||this.model.nombre==""){
        this.alertaMensaje("Error en el Ingreso de Datos","Por favor revise todos los campos antes de continuar...,","error");    
      }else if(this.carrito.length==0){
        this.alertaMensaje("Carrito Vacio","Antes de continuar seleccione algun Producto...","error");   
      }else{                                
        this.load=true;     
        try{                      
          if(this.datosUsuario.estado_firma == false){
            this.alertaMensaje("ATENCION","Primero debe habilitar el estado de su firma en la Configuración de Firma Electronica","info")
          }else{  
            //1 respuesta del servidor (xml generado)}                    
            const res = await this.$api.$post(this.apiUrl, operacion);                      
            let comprobanteFirmado=await this.firmarXML(res,this.datosUsuario.password_firma,this.datosUsuario.ruc);          
            //2 respuesta del servidor de todo el documento firmando                 
            let base64EncodedString = btoa(comprobanteFirmado);                
            const res2 = await this.$api.$post("xmlController", {base64EncodedString});                    
            this.alertaMensajeRouter(res2);            
          }                        
        } catch (e) {
        console.log(e);
        // En caso de error, muestra un mensaje de error al usuario 
          this.alertaMensaje("Error al generar la Factura","Por favor, comunicate con el Administrador.","error");
        }finally{
          this.load=false;
        }               
      }              
    },
    PrevisualizarFactura(){            
      const operacion1={
        subtotal_12:this.totalCarrito,
        subtotal_0:this.totalCarrito0,
        subtotal_no_objeto_iva:this.totalNoObjeto,
        subtotal_sin_impuesto:this.totalSinImpuestos,
        secuencial_sec:this.secuenciales.sec_sig_fact,
        total_descuento:this.totalDescuento,
        total_grabado:this.granTotal,
        carrito:this.carrito,
        adicional_factura:this.model_factura
      }                  
      let datosPrev=[];
      operacion1.carrito.forEach(element => {             
      let elemento = {cantidad:element.cantidad,codigo:element.producto.codigo_producto,descripcion:element.precio,precio:element.producto.precio_producto,descuento:element.producto.descuento,impuesto:element.impuesto,total: Number(element.cantidad * element.precio).toFixed(2)};                    
        datosPrev.push(elemento);                    
      });                
              
        this.datosTabla=datosPrev;                                                     
        this.abrirModal();  
    },

    async firmarXML(xml,clave,ruta){      
      let firmaElectronica = process.env.URL_BACK+"serve/"+this.user.id;        
      const result = await this.sign(firmaElectronica,clave,xml);
      return result;
    },
    async getP12(path){
      const Response=await fetch(path);
      if(!Response.ok){
          throw new Error(`Failed ${Response.status} ${Response.statusText}`);
      }
      const data=await Response.arrayBuffer();
      return data;
    },
    async getXML(content){    
      if (!content) {
          throw new Error('El contenido XML no puede estar vacío o nulo.');
      }
      return content;
    },
    sha1_base64(txt,encoding){

    var md = forge.md.sha1.create();
    md.update(txt);
    return new window.buffer.Buffer(md.digest().toHex(), 'hex').toString('base64');
    },
    hexToBase64(hexStr){
    var hex = ('00' + hexStr).slice(0 - hexStr.length - hexStr.length % 2);    
    return btoa(String.fromCharCode.apply(null,
        hex.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
    },
    bigIntToBase64(bigInt){
    const HexString=bigInt.toString(16);
    const HexPairs= HexString.match(/.{2}/g);
    const Bytes= HexPairs.map((pair)=>parseInt(pair,16));
    const ByteString=String.fromCharCode(...Bytes);
    const Base64 =btoa(ByteString);
    const FormateDBase64=Base64.match(/.{1,76}/g).join("\n");
    return FormateDBase64;
    },
    getRandomNumber(min=10000,max=99999){
    //return Math.floor(Math.random()*(max-min+1)+min);
    return Math.floor(Math.random() * 999000) + 990;    
    },

    async sign(p12Path,p12Password,xmlPath){    
    const arrayBuffer=await this.getP12(p12Path);
    let xml=await this.getXML(xmlPath);
    xml= xml.replace(/^s+/g," ");
    xml=xml.trim();
    xml=xml.replace(/(?<=\>)(\r?\n)|(\r?\n)(?=\<V)/g,"");
    xml=xml.trim();
    xml=xml.replace(/(?<=\>)(\s*)/g,"");
    const arrayUint8=new Uint8Array(arrayBuffer);
    const b64=forge.util.binary.base64.encode(arrayUint8);
    const der = forge.util.decode64(b64);
    const Asn1=forge.asn1.fromDer(der);

    const p12=forge.pkcs12.pkcs12FromAsn1(Asn1,p12Password);

    const Pkcs8Bags = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag,});
    const certBags = p12.getBags({bagType: forge.pki.oids.certBag,});

    const CertBag=certBags[forge.oids.certBag];
    const FriendlyName=CertBag[1].attributes.friendlyName[0];
    
    let certificate;
    let pkcs8;
    let issuerName='';

    const cert = CertBag.reduce((prev, curr)=>{
        const attributes= curr.cert.extensions;
        return attributes.length > prev.cert.extensions.length ? curr : prev;
    });

    const issuerAttrs= cert.cert.issuer.attributes;
    issuerName = issuerAttrs.reverse().map(attr =>{
        return `${attr.shortName}=${attr.value}`;
    }).join(', ');
    
    if(/BANCO CENTRAL/i.test(FriendlyName)){
        let keys = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag];
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            let friendlyName = element.attributes.friendlyName[0];
            if(/Signing Key/i.test(friendlyName)){
                pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][i];
            }            
        }       
    }
    if(/SECURITY DATA/i.test(FriendlyName)){
        pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][0];        
    }
    certificate = cert.cert;
    const notBefore= certificate.validity['notBefore'];
    const notAfter= certificate.validity['notAfter'];
    const currentDate = new Date();
    if(currentDate <notBefore ||  currentDate>notAfter){
        throw new Error("Invalid certiicate, certificate has expired");
    }

    const key = pkcs8.key ?? pkcs8.asn1; //con un ? devuelvo dos valores, con ?? devuelvo uno de los valores en la misma variable
    const certificateX509_pem= forge.pki.certificateToPem(certificate);

    let certificateX509 = certificateX509_pem.substring(
        certificateX509_pem.indexOf("\n")+1, 
        certificateX509_pem.indexOf("\n-----END CERTIFICATE-----")
    );

    certificateX509 = certificateX509.replace(/\r?\n|\r/g, '');
    certificateX509 = certificateX509.match(/.{1,76}/g).join('\n');
    

    const certificateX509_asn1 = forge.pki.certificateToAsn1(certificate);
    const certificateX509_der = forge.asn1.toDer(certificateX509_asn1).getBytes();
    const hash_certificateX509_der = this.sha1_base64(certificateX509_der);
    const certificateX509_serialNumber=parseInt(certificate.serialNumber,16);
    const exponent = this.hexToBase64(key.e.data[0].toString(16));
    const modulus=this.bigIntToBase64(key.n);
    xml = xml.replace(/^t|\r/g,"");
    const sha1_xml= this.sha1_base64(xml.replace('<?xml version="1.0" encoding="utf-8"?>',""),
            "utf8"
        );
    const namespaces='xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#"';
    //numeros aleatorios
    const Certificate_number = this.getRandomNumber();
    const Signature_number=this.getRandomNumber();
    const Signedpropierties_number=this.getRandomNumber();
    const SignedInfo_number=this.getRandomNumber();
    const ReferencID_number=this.getRandomNumber();
    const SignatureValue_number=this.getRandomNumber();
    const Object_number=this.getRandomNumber();
    const SignedPropertiesID_number=this.getRandomNumber();

    const isoDateTime=currentDate.toISOString().slice(0,19);
    let SignedPropierties='';    
    SignedPropierties+='<etsi:SignedProperties Id="Signature'+Signature_number+'-SignedProperties'+Signedpropierties_number+'">';
    SignedPropierties+='<etsi:SignedSignatureProperties>';
    SignedPropierties+='<etsi:SigningTime>'+isoDateTime+'</etsi:SigningTime>';
    SignedPropierties+='<etsi:SigningCertificate>';
    SignedPropierties+='<etsi:Cert>';
    SignedPropierties+='<etsi:CertDigest>';
    SignedPropierties+='<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
    SignedPropierties+='</ds:DigestMethod>';
    SignedPropierties+='<ds:DigestValue>';
    SignedPropierties+=hash_certificateX509_der;
    SignedPropierties+='</ds:DigestValue>'; 
    SignedPropierties+='</etsi:CertDigest>';
    SignedPropierties+='<etsi:IssuerSerial>';
    SignedPropierties+='<ds:X509IssuerName>';
    SignedPropierties+=issuerName;
    SignedPropierties+='</ds:X509IssuerName>';
    SignedPropierties+='<ds:X509SerialNumber>'
    SignedPropierties+= certificateX509_serialNumber;
    SignedPropierties+='</ds:X509SerialNumber>'
    SignedPropierties+='</etsi:IssuerSerial>';
    SignedPropierties+='</etsi:Cert>';
    SignedPropierties+='</etsi:SigningCertificate>';    
    SignedPropierties+='</etsi:SignedSignatureProperties>';
    
    SignedPropierties+='<etsi:SignedDataObjectProperties>';
    SignedPropierties+='<etsi:DataObjectFormat ObjectReference="#Reference-ID-'+ReferencID_number+'">';
    SignedPropierties+='<etsi:Description>';
    SignedPropierties+='contenido comprobante';
    SignedPropierties+='</etsi:Description>';
    SignedPropierties+='<etsi:MimeType>';
    SignedPropierties+='text/xml';
    SignedPropierties+='</etsi:MimeType>';
    SignedPropierties+='</etsi:DataObjectFormat>';
    SignedPropierties+='</etsi:SignedDataObjectProperties>';
    SignedPropierties+="</etsi:SignedProperties>"
    
    const sha1_SignedProperties = this.sha1_base64(SignedPropierties.replace('<etsi:SignedProperties','<etsi:SignedProperties '+namespaces));
    let keyInfo='';
    keyInfo+='<ds:KeyInfo Id="Certificate' + Certificate_number+'">';
    keyInfo+='\n<ds:X509Data>';
    keyInfo+='\n<ds:X509Certificate>\n';
    keyInfo+=certificateX509;
    keyInfo+='\n</ds:X509Certificate>';
    keyInfo+='\n</ds:X509Data>';
    keyInfo+='\n<ds:KeyValue>';
    keyInfo+='\n<ds:RSAKeyValue>';
    keyInfo+='\n<ds:Modulus>\n';
    keyInfo+=modulus;    
    keyInfo+='\n</ds:Modulus>'    
    keyInfo+='\n<ds:Exponent>\n'
    keyInfo+=exponent;
    keyInfo+='\n</ds:Exponent>'
    keyInfo+='\n</ds:RSAKeyValue>'
    keyInfo+='\n</ds:KeyValue>';
    keyInfo+='\n</ds:KeyInfo>';
    const sha1_KeyInfo=this.sha1_base64(keyInfo.replace("<ds:KeyInfo","<ds:KeyInfo "+namespaces));

    let SignedInfo='';
    SignedInfo+='<ds:SignedInfo Id="Signature-SignedInfo'+SignedInfo_number+'">';
    SignedInfo+='\n<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">';
    SignedInfo+='</ds:CanonicalizationMethod>';
    SignedInfo+='\n<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1">';
    SignedInfo+='</ds:SignatureMethod>';
    SignedInfo+='\n<ds:Reference Id="SignedPropertiesID'+SignedPropertiesID_number+'" Type="http://uri.etsi.org/01903#SignedProperties" URI="#Signature'+Signature_number+'-SignedProperties'+Signedpropierties_number+'">';
    SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
    SignedInfo+='</ds:DigestMethod>';
    SignedInfo+='\n<ds:DigestValue>';
    SignedInfo+=sha1_SignedProperties;
    SignedInfo+='</ds:DigestValue>';
    SignedInfo+='\n</ds:Reference>';

    SignedInfo+='\n<ds:Reference URI="#Certificate'+Certificate_number+'">';
    SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
    SignedInfo+='</ds:DigestMethod>';
    SignedInfo+='\n<ds:DigestValue>';
    SignedInfo+=sha1_KeyInfo;
    SignedInfo+='</ds:DigestValue>';
    SignedInfo+='\n</ds:Reference>';

    SignedInfo+='\n<ds:Reference Id="Reference-ID-'+ReferencID_number+'" URI="#comprobante">';    
    SignedInfo+='\n<ds:Transforms>';
    SignedInfo+='\n<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature">';
    SignedInfo+='</ds:Transform>';
    SignedInfo+='\n</ds:Transforms>';

    SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
    SignedInfo+='</ds:DigestMethod>';
    SignedInfo+='\n<ds:DigestValue>';
    SignedInfo+=sha1_xml;
    SignedInfo+='</ds:DigestValue>';

    SignedInfo+='\n</ds:Reference>';
    SignedInfo+='\n</ds:SignedInfo>';

    const canonicalized_SignedInfo=SignedInfo.replace(
        "<ds:SignedInfo","<ds:SignedInfo "+namespaces);
    
    const md= forge.md.sha1.create();
    md.update(canonicalized_SignedInfo,'utf8');

    let signature =btoa(key.sign(md)).match(/.{1,76}/g).join("\n");

    let xades_bes='';
    xades_bes+='<ds:Signature '+namespaces+' Id="Signature'+Signature_number+'">';
    xades_bes+='\n'+SignedInfo;
    xades_bes+='\n<ds:SignatureValue Id="SignatureValue'+SignatureValue_number+'">\n';
    xades_bes+=signature;
    xades_bes+='\n</ds:SignatureValue>';
    xades_bes+='\n'+keyInfo;
    xades_bes+='\n<ds:Object Id="Signature'+Signature_number+'-Object'+Object_number+'">';
    xades_bes+='<etsi:QualifyingProperties Target="#Signature'+Signature_number+'">';
    xades_bes+=SignedPropierties;
    xades_bes+='</etsi:QualifyingProperties>';
    xades_bes+='</ds:Object>';
    xades_bes+='</ds:Signature>';

    let signed=xml.replace(/(<[^<]+)$/,xades_bes+"$1");        
    return signed
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
      }else{
        const item={
        producto: producto,
        cantidad:1,
        precio:producto.precio_producto,
        impuesto:producto.impuesto_iva                           
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
      this.model_factura.cliente_id=buscarCliente[0].id;            
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
          
        }        
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  },
};
</script>

<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>
