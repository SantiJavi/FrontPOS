<template>
    <div>
        <Loader :load="load"></Loader>
            <AdminTemplate :page="page" :modulo="modulo">
                <div slot="body">
                    <div class="container-fluid py-4">
                        <div class="row mt-2">
                            <div class="card-header pb-0 p-3">
                                <div class="card bg-gradient-dark text-center px-2 py-2">
                                    <h6 class="text-white">Comprobante de Retención</h6>                                
                                </div>
                            </div>
                            <div class="col-6 ">
                                <div class="card h-100">                                  
                                    <div class="card-body p-3">
                                        <div class="form-group">
                                            <label for="">Nº Retencion: <span>{{ oneSecuencialData.codigo_establecimiento }} - {{ oneSecuencialData.punto_emision }} - </span><span for="secuencialId">{{ oneSecuencialData.sec_sig_com_ret }} </span></label>                                            
                                        </div> 
                                        <div class="row">
                                            <div class="form-group">                                  
                                                <i class="fas fa-search"></i>                                
                                                    <label for="">Seleccione el Establecimiento</label>                                                                                                   
                                                <select class="form-control" v-model="model_establecimiento" @change="updateFields">                                                                          
                                                    <option class="form-control" v-for="item in secuenciales" :key="item.id" :value="item.id">{{ item.direccion_sucursal }}</option>                      
                                                </select>
                                            </div>                                            
                                            <input type="hidden" name="" class="form-control" v-model="model_establecimiento.id" readonly>                                            
                                            <div class="form-group">                                                
                                                <label for="" title="Campo Obligatorio">Establecimiento <span class="text-danger">*</span></label>
                                                <input type="text" name="" class="form-control" v-model="model_establecimiento.direccion_sucursal" readonly>
                                            </div>

                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio" >Nombre Comercial <span class="text-danger">*</span></label>                                                                                
                                                <input type="text" name="" class="form-control" v-model="this.nombre_comercial" readonly>
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Fecha de Emisión <span class="text-danger">*</span></label>
                                                <input type="date" name="" class="form-control" id="" v-model="model.fecha_emision" @change="cargarEjercicio">
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio" >Punto de Emisión <span class="text-danger">*</span></label>
                                                <select class="form-select"  aria-label="Default select example" v-model="model_establecimiento.puntoEmision">
                                                    <option class="form-control" v-for="item in secuenciales" :key="item.id" :value="item.id">{{ item.punto_emision }}</option>                                                    
                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group has-success">
                                                    <label for="" title="Campo Obligatorio">Periodo Fiscal Año <span class="text-danger">*</span></label>
                                                    <input type="text" name="" class="form-control" id="" v-model="model.year_establecimiento" readonly>
                                                    <!--select class="form-select" v-model="model.year_establecimiento" aria-label="Default select example">
                                                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                                                    </select-->
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group has-success">
                                                    <label for="" title="Campo Obligatorio">Periodo Mes Año <span class="text-danger">*</span></label>
                                                    <input type="text" name="" class="form-control" id="" v-model="model.month_establecimiento" readonly>
                                                    <!--select class="form-select" v-model="model.month_establecimiento" aria-label="Default select example">
                                                        <option v-for="month in months" :key="month.value" :value="month.label">{{ month.label }}</option>
                                                    </select-->
                                                </div>
                                            </div>
                                        </div>                             
                                    </div>                            
                                </div>
                            </div>                            
                        </div>
                        <!-- Sujeto Retenido -->
                        <div class="row mt-2">                            
                            <div class="col-6 ">
                                <div class="card h-100">                                  
                                    <div class="card-body p-3">                                        
                                        <div class="row">
                                            <div class="card-header pb-0 p-3">
                                                <div class="text-center">
                                                <h6 class="text-dark font-weight-bold">Sujeto Retenido</h6>                                
                                                </div>
                                            </div>
                                            <div class="form-group">        
                                                <i class="fas fa-search"></i>                                        
                                                <label for="">Buscar Provedor</label>                                                
                                                <select class="form-control" v-model="model_vendedores" @change="updateVendedores">                                                                          
                                                    <option class="form-control"  v-for="vendedor in vendedores" :key="vendedor.id" :value="vendedor.id">RUC: {{ vendedor.numero_documento }} - {{ vendedor.razon_social }}</option>                                                                      
                                                </select>
                                            </div>
                                            <input type="hidden" name="" class="form-control" v-model="model_vendedores.id" readonly>
                                            <div class="form-group">                                                
                                                <label for="" title="Campo Obligatorio">Identificación <span class="text-danger">*</span></label>                                                
                                                <input type="text" name="" class="form-control" v-model="model_vendedores.numero_documento" readonly>                                                
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Tipo Identificación <span class="text-danger">*</span></label>
                                                <input type="text" name="" class="form-control" v-model="model_vendedores.tipo_identificador" readonly>
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Razon Social <span class="text-danger">*</span></label>
                                                <input type="text" name="" class="form-control"  v-model="model_vendedores.razon_social" readonly>
                                            </div>
                                            <div class="form-group">
                                                <label for="" >Dirección</label>
                                                <input type="text" name="" class="form-control" v-model="model_sujetoRetenido.direccion">
                                            </div>
                                            <div class="form-group">
                                                <label for="">Teléfono</label>
                                                <input type="text" name="" class="form-control" v-model="model_sujetoRetenido.telefono">
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Correo electrónico <span class="text-danger">*</span></label>
                                                <input type="email" name="" class="form-control" v-model="model_vendedores.correo" readonly>
                                            </div>             
                                        </div>                             
                                    </div>                            
                                </div>
                            </div>                                                             
                            <div class="col-6 ">
                                <div class="card h-100">                                  
                                    <div class="card-body p-3">                                        
                                        <div class="row">
                                            <div class="card-header pb-0 p-3">
                                                <div class="text-center">
                                                <h6 class="text-dark font-weight-bold">Documento de Sustento</h6>                                
                                                </div>
                                            </div>
                                            <!--div class="form-group">
                                                <label for="">Comprobante</label>
                                                <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.comprobante">
                                                        <option value="factura">Factura</option>
                                                        <option value="nota_debito">Nota de Debito - No funciona</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Emisión</label>
                                                <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.emision">
                                                        <option value="fisica">Física</option>
                                                        <option value="electronica">Electrónica</option>
                                                </select>
                                            </div-->
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Fecha Emisión <span class="text-danger">*</span></label>
                                                <input type="date" name="" class="form-control" id="" v-model="model_doc_ret.fecha_emision_dor">
                                            </div>
                                            <div class="row">
                                                <label for="" title="Campo Obligatorio">Número de Documento que Modifica <span class="text-danger">*</span></label>
                                                <div class="col-4">
                                                <div class="form-group has-success">                        
                                                    <input type="text" placeholder="001" class="form-control" v-model="model_doc_ret.codigo_establecimiento" maxlength="3" required/>
                                                </div> 
                                                </div>
                                                <div class="col-4">
                                                <div class="form-group has-success">                        
                                                    <input type="text" placeholder="002" class="form-control"  v-model="model_doc_ret.punto_emision" maxlength="3" required/>
                                                </div> 
                                                </div>
                                                <div class="col-4">
                                                <div class="form-group has-success">                        
                                                    <input type="text" placeholder="0000000xx" class="form-control" v-model="model_doc_ret.secuencial" maxlength="9" required/>
                                                </div> 
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Identificacion del sustento tributario <span class="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.idSustentoTributario" @change="cargarDataSustentoTribu">
                                                    <option v-for="data in data_sustento_tributario" :key="data.id" :value="data.id">{{ data.id}} - {{data.detalle}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="" title="Campo Obligatorio">Tipo de Documento de Sustento <span class="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.tipoDocSustento">
                                                    <option v-for="data in tipoDocumentoSustento" :key="data.id" :value="data.cod">{{ data.id}} - {{data.detalle}}</option>                                                                                                            
                                                </select>
                                            </div>
                                            <div class="row">                                                                                                                                                              
                                                <div class="col-6">
                                                    <label for="" title="Campo Obligatorio">Forma de Pago <span class="text-danger">*</span></label>
                                                    <div class="form-group has-success">                        
                                                        <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.forma_pago">
                                                            <option v-for="data in this.data_formas_pago" :key="data.id" :value="data.cod">{{ data.detalle }}</option>                                                            
                                                        </select>
                                                    </div> 
                                                </div>
                                                <div class="col-6">
                                                    <label for="" title="Campo Obligatorio">Tipo de Pago <span class="text-danger">*</span></label>
                                                    <div class="form-group has-success">                        
                                                        <select class="form-select" aria-label="Default select example" v-model="model_doc_ret.tipo_pago">
                                                            <option value="01">Pago a Residente</option>                                                        
                                                        </select>
                                                    </div> 
                                                </div>                        
                                            </div>
                                        </div>                             
                                    </div>                            
                                </div>
                            </div>
                            <!-- Detalles Valores Retenidos-->
                            <div class="col-6 ">
                                <div class="card h-100">                                  
                                    <div class="card-body p-3">                                        
                                        <div class="row">
                                            <div class="card-header pb-0 p-3">
                                                <div class="text-center">
                                                <h6 class="text-dark font-weight-bold">Detalle Valores Retenidos</h6>                                
                                                </div>
                                            </div>
                                            <div class="form-group">                                                
                                                <label for="">Impuesto <span class="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" v-model="detalles_retenciones.selectedImpuesto" @change="cargarCodigos">                                                        
                                                        <option value="iva">I.V.A</option>
                                                        <option value="renta">Impuesto a la Renta</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Cod. Impuesto <span class="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" v-model="detalles_retenciones.selectedCodigo" @change="cargarPorcentajes">                                                                                                                    
                                                    <option v-for="codigo in codigos_retencion" :key="codigo.id" :value="codigo.codigo_retencion">{{ codigo.codigo_retencion }} - {{ codigo.descripcion_retencion }}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Base Imponible</label>
                                                <input type="text" name="" class="form-control" placeholder="0.00" v-model="detalles_retenciones.valorBaseImponible">
                                            </div>
                                            <div class="form-group">
                                                <label for="">% de Retención</label>
                                                <input type="text" name="" class="form-control" v-model="detalles_retenciones.porcentaje_retencion" v-bind:readonly="readonly">
                                            </div>
                                            <div class="form-group">
                                                <label for="">Valor Retenido: </label>                                                
                                                {{ Number(calculorTotalValorRetenido).toFixed(2) }}
                                            </div>
                                            <button @click="AddRetencion()" class="btn bg-gradient-dark w-50 mt-4 mb-4">
                                                <i class="fas fa-save mx-2"></i> Añadir Retención
                                            </button>  
                                        </div>                             
                                    </div>                            
                                </div>
                            </div>                            
                        </div>
                        <br>
                        <div class="col-12">
                            <h6 class="text-black">Detalle de Comprobante de Retencion</h6>                                       
                                <div class="card">
                                    <div class="card-body">
                                    <table class="table">
                                        <thead>                
                                        <th class="text-center">Impuesto</th>
                                        <th class="text-center">Codigo</th>                                                        
                                        <th class="text-center">Base Imponible</th>
                                        <th class="text-center">% de Retención</th>
                                        <th class="text-center">Valor Retenido</th>                                        
                                        <th class="text-center">Eliminar</th>
                                        <!--th class="">Eliminar</th-->
                                        </thead>
                                        <tbody>
                                        <tr v-for="(m,i) in acumulado_retenciones">
                                            <td class="text-center">{{ m.selectedImpuesto }}</td>                  
                                            <td class="text-center">{{ m.selectedCodigo }}</td>                  
                                            <td class="text-center">{{ m.valorBaseImponible }}</td>
                                            <td class="text-center">{{ m.porcentaje_retencion  }}</td>         
                                            <td class="text-center">{{ Number(m.valorTotal).toFixed(2) }}</td>                        
                                            <td class="text-center">
                                                <button @click="EliminarItem(i)" class="btn btn-danger py-1 px-2">
                                                <i class="fas fa-trash"></i>
                                                </button>
                                            </td>                                                                                         
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>          
                                </div>
                        </div>
                        <!--div class="col-6">
                            <div class="row">
                            <h6 class="text-black text-center">Campos Adicionales</h6>                                                                                              
                                <div class="card">
                                    <div class="card-body">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <input type="text" name="" class="form-control" placeholder="Nombre"/>
                                                </div>
                                                <div class="col-sm">
                                                    <input type="text" name="" class="form-control" placeholder="Descripcion"/>
                                                </div>                                                
                                            </div>                                            
                                        </div>
                                        <div class="text-center mt-2">
                                            <nuxtLink to="/usuarios/nuevoUsuario" class="btn bg-gradient-danger w-25"><i class="fas fa-plus"></i> Agregar</nuxtLink>
                                        </div>                                        
                                    </div>                                    
                                </div>                                
                                <div class="card">
                                    <div class="card-body">
                                    <table class="table">
                                        <thead>                
                                        <th class="text-center">Nombre</th>
                                        <th class="text-center">Descripcion</th>                
                                        <th class="text-center">Acción</th>                                        
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center"></td>                  
                                            <td class="text-center"></td>                  
                                            <td class="text-center"></td>                                            
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>          
                                </div>
                            </div>                            
                        </div --> 
                        <div class="text-center mt-2">
                            <button @click="Save()" class="btn bg-gradient-info w-50 mt-4 mb-4"><i class="fas fa-save mx-2"></i> Generar Retención</button>
                        </div>                                                                       
                    </div>                    
                    
                </div>                            
            </AdminTemplate>
    </div>

</template>

<script>
import {firmarXML} from '/utils/utils';
import {obtenerArchivoP12} from '/utils/utils';
import {formasPago} from '/utils/utils';

export default{
    head() {
    return {
      title: this.modulo,
    };
  },
  data (){
    return{        
        modulo: "Retenciones",
        page: "Nueva Retención", 
        load: true,
        user:{},
        datosUsuario:{},
        modalEdit: false,   
        respuesta:[],     
        secuenciales: [],
        oneSecuencialData:'',
        vendedores:[],
        codigos_generales:[],
        codigos_retencion:[],
        valorPredetCodigo:"",        
        nombre_comercial:'',        
        totalValorRetenido:'',
        model_vendedores:{},
        model_establecimiento:{},
        acumulado_retenciones:[],
        selectedYear:new Date().getFullYear(),
        years: [new Date().getFullYear(), new Date().getFullYear() - 1],
        selectMonth: new Date().getMonth()+1,
        months:this.generateMonths(),
        tipoDocumentoSustento:'',
        apiUrl: 'retenciones',
        data_formas_pago:formasPago,           
        detalles_retenciones:{
            selectedImpuesto:'',
            selectedCodigo:'',
            valorBaseImponible:'',
            porcentaje_retencion:'',
            valorTotal:this.totalValorRetenido
        },        
        model:{                       
            tipo_comprobante:7,
            year_establecimiento:'',
            month_establecimiento:'',
            fecha_emision:'',
            secuencial_id:''           
        },
        model_sujetoRetenido:{
            vendedor_id:'',
            telefono:'',
            direccion:''
        },
        model_doc_ret:{
            comprobante:'factura',
            emision:'electronica',
            fecha_emision_dor:'',
            codigo_establecimiento:'',
            punto_emision:'',
            secuencial:'',
            idSustentoTributario:'',
            tipoDocSustento:'',
            forma_pago:'',
            tipo_pago:''
        },    

        data_sustento_tributario:[
            {id:'01',detalle:"Crédito Tributario para declaración de IVA (servicios y bienes distintos de inventarios y activos fijos)",
            codigos_habilitados:[1,3,5,11,12,21,41,43,47,48,294,344]},
            {id:'02',detalle:"Costo o Gasto para declaración de IR (servicios y bienes distintos de inventarios y activos fijos)",
            codigos_habilitados:[1,2,3,4,5,9,11,12,15,19,20,21,41,43,47,48,294,344,364]},
            {id:'03',detalle:"Activo Fijo - Crédito Tributario para declaración de IVA",codigos_habilitados:[1,3,4,5,41,47,48,294,344]},
            {id:'04',detalle:"Activo Fijo - Crédito Tributario para declaración de IVA",codigos_habilitados:[1,2,3,4,5,15,41,294,344]},
            {id:'05',detalle:"Liquidación Gastos de Viaje, hospedaje y alimentación Gastos IR (a nombre de empleados y no de la empresa)",
            codigos_habilitados:[1,2,3,4,5,11,15,41,294,344]},
            {id:'06',detalle:"Inventario - Crédito Tributario para declaración de IVA",codigos_habilitados:[1,3,4,5,41,43,47,48,294,344]},
            {id:'07',detalle:"Inventario - Costo o Gasto para declaración de IR",codigos_habilitados:[1,3,4,5,15,41,43,47,48,294,344]},
            {id:'08',detalle:"Valor pagado para solicitar Reembolso de Gasto (intermediario)",codigos_habilitados:[1,3,4,5,21,294,344]},
            {id:'09',detalle:"Reembolso por Siniestros",codigos_habilitados:[1,4,5,45]},
            {id:'10',detalle:"Distribución de Dividendos, Beneficios o Utilidades",codigos_habilitados:[19]},
            {id:'11',detalle:"Convenios de débito o recaudación para IFIs",codigos_habilitados:[12]},
            {id:'12',detalle:"Impuestos y retenciones presuntivos",codigos_habilitados:[42]},
            {id:'13',detalle:"Valores reconocidos por entidades del sector público a favor de sujetos pasivos",codigos_habilitados:[19]},
            {id:'14',detalle:"Valores facturados por socios a operadoras de transporte (que no constituyen gasto de dicha operadora)",
            codigos_habilitados:[1,2,3,4,5]},
            {id:'15',detalle:"Pagos efectuados por consumos propios y de terceros de servicios digitales",
            codigos_habilitados:[1,2,4,5,19,42]},
            
        ],
        data_documento_sustento:[
            {id: 1,detalle:"Factura",cod:'01'},
            {id: 2,detalle:"Nota o boleta de venta", cod:'02'},
            {id: 3,detalle:"Liquidación de compra de Bienes o Prestación de servicios", cod:'03'},
            {id: 4,detalle:"Nota de crédito", cod:'04'},
            {id: 5,detalle:"Nota de débito", cod:'05'},
            {id: 6,detalle:"Guías de Remisión", cod:'06'},
            {id: 7,detalle:"Comprobante de Retención", cod:'07'},
            {id: 8,detalle:"Boletos o entradas a espectáculos públicos", cod:'08'},
            {id: 9,detalle:"Tiquetes o vales emitidos por máquinas registradoras", cod:'09'},
            {id: 11,detalle:"Pasajes expedidos por empresas de aviación", cod:'11'},
            {id: 12,detalle:"Documentos emitidos por instituciones financieras ", cod:'12'},
            {id: 15,detalle:"Comprobante de venta emitido en el Exterio",cod:'15'},
            {id: 16,detalle:"Formulario Único de Exportación (FUE) o Declaración Aduanera Única (DAU) o Declaración Andina de Valor (DAV)",cod:'16'},
            {id: 18,detalle:"Documentos autorizados utilizados en ventas excepto N/C N/D ",cod:'18'},
            {id: 19,detalle:"Comprobantes de Pago de Cuotas o Aportes",cod:'19'},
            {id: 20,detalle:"Documentos por Servicios Administrativos emitidos por Inst. del Estado",cod:'20'},
            {id: 21,detalle:"Carta de Porte Aéreo",cod:'21'},
            {id: 22,detalle:"RECAP",cod:'22'},
            {id: 23,detalle:"Nota de Crédito TC",cod:'23'},
            {id: 24,detalle:"Nota de Débito TC",cod:'24'},
            {id: 41,detalle:"Comprobante de venta emitido por reembolso",cod:'41'},
            {id: 42,detalle:"Documento retención presuntiva y retención emitida por propio vendedor o por intermediario",cod:'42'},
            {id: 43,detalle:"Liquidación para Explotación y Exploración de Hidrocarburos",cod:'43'},
            {id: 44,detalle:"Comprobante de Contribuciones y Aportes",cod:'44'},
            {id: 45,detalle:"Liquidación por reclamos de aseguradoras",cod:'45'},
            {id: 47,detalle:"Nota de Crédito por Reembolso Emitida por Intermediario",cod:'47'},
            {id: 48,detalle:"Nota de Débito por Reembolso Emitida por Intermediario",cod:'48'},
            {id: 49,detalle:"Proveedor Directo de Exportador Bajo Régimen Especial",cod:'49'},
            {id: 50,detalle:"A Inst. Estado y Empr. Públicas que percibe ingreso exento de Imp. Renta",cod:'50'},
            {id: 51,detalle:"N/C A Inst. Estado y Empr. Públicas que percibe ingreso exento de Imp. Renta",cod:'51'},            
            {id: 52,detalle:"N/D A Inst. Estado y Empr. Públicas que percibe ingreso exento de Imp. Renta",cod:'52'},
            {id: 294,detalle:"Liquidación de compra de Bienes Muebles Usados",cod:'294'},
            {id: 344,detalle:"Liquidación de compra de vehículos usados",cod:'344'},
            {id: 364,detalle:"Acta Entrega-Recepción PET",cod:'364'},
            {id: 370,detalle:"Factura operadora transporte / socio",cod:'370'},
            {id: 371,detalle:"Comprobante socio a operadora de transporte",cod:'371'},
            {id: 372,detalle:"Nota de crédito operadora transporte / socio ",cod:'372'},
            {id: 373,detalle:"Nota de débito operadora transporte / socio",cod:'373'},
            {id: 374,detalle:"Nota de débito operadora transporte / socio",cod:'374'},
            {id: 375,detalle:"Liquidación de compra RISE de bienes o prestación de servicios",cod:'375'}
        ],        
    
    };

  },
  computed : {    
    calculorTotalValorRetenido(){        
        if(this.detalles_retenciones.porcentaje_retencion == 0){
            this.totalValorRetenido= this.detalles_retenciones.valorBaseImponible;
        }else{
            this.totalValorRetenido =  this.detalles_retenciones.valorBaseImponible * (this.detalles_retenciones.porcentaje_retencion / 100);
        }
        this.detalles_retenciones.valorTotal=this.totalValorRetenido;
        return this.totalValorRetenido;        
    }    

  },
  methods:{
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Secuenciales(idUser){
      try {
        await Promise.all([this.GET_DATA('secuencialesUser/'+idUser)]).then((v) => {            
            this.secuenciales = v[0];            
            v[0].forEach((item)=>{
            this.oneSecuencialData = item;
            this.datosUsuario = item.datos_emisores.usuarios;                        
          });                  
        });
      } catch (e) {
        console.log(e);
      }
    },
    async Usuarios(idUser){
        try {
        await Promise.all([this.GET_DATA('usuarios/'+idUser)]).then((v) => {            
            this.datosUsuario = v[0];            
            this.datosUsuario = this.datosUsuario[0];            
        });
      } catch (e) {
        console.log(e);
      }
    },
    /*
    async oneSecuencial(idUser){
        try {
        await Promise.all([this.GET_DATA('secuencialesUser/'+idUser)]).then((v) => {
          v[0].forEach((item)=>{
            this.oneSecuencialData = item;
          });            
        });
      } catch (e) {
        console.log(e);
      }
    },
    */
    async Vendedores(idUser){
        try{
            await Promise.all([this.GET_DATA('vendedors/'+idUser)]).then((v)=>{
                this.vendedores = v[0];
            });
        }catch(e){
            console.log(e);
        }
    },
    async CodigosRetenciones(){
        try{
            await Promise.all([this.GET_DATA('cod_ret')]).then((v)=>{
                this.codigos_generales = v[0];
            });
        }catch(e){
            console.log(e);
        }  
    },
    updateFields(){
        //this.model_retencion = this.secuenciales.find(option=>option.id === this.model_retencion);
        const selectedOption = this.secuenciales.find(option => option.id === this.model_establecimiento);
        if (selectedOption) {
            this.model_establecimiento = selectedOption;
            this.nombre_comercial=this.model_establecimiento.datos_emisores.nombre_comercial;
            this.model.secuencial_id = this.model_establecimiento.id;
        }        
    },
    updateVendedores(){
        const selectedOption = this.vendedores.find(option => option.id === this.model_vendedores);
        if (selectedOption) {
            this.model_vendedores = selectedOption;
            this.model_sujetoRetenido.vendedor_id = this.model_vendedores.id;            
        } 
    },
    generateMonths(){
        const currentMonth = new Date().getMonth() + 1; // Mes actual
        const months = [];
        for (let i = 1; i <= currentMonth; i++) {
            months.push({ value: i, label: this.getMonthLabel(i) });
        }
      return months;
    },
    getMonthLabel(monthNumber) {
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
      ];
      return monthNames[monthNumber - 1];
    },
    cargarCodigos(){
        if(this.detalles_retenciones.selectedImpuesto == 'iva'){
            this.codigos_retencion = this.codigos_generales.filter(codigo => codigo.tipo_cod_impuesto == this.detalles_retenciones.selectedImpuesto )            
        }else if (this.detalles_retenciones.selectedImpuesto == 'renta'){
            this.codigos_retencion = this.codigos_generales.filter(codigo => codigo.tipo_cod_impuesto == this.detalles_retenciones.selectedImpuesto )            
        }
    },
    cargarPorcentajes(){        
        const codigosObtenidos = this.codigos_retencion.find(codigo=>codigo.codigo_retencion == this.detalles_retenciones.selectedCodigo);
        if(!this.validacionCodigos(codigosObtenidos.codigo_retencion)){
            this.detalles_retenciones.porcentaje_retencion = this.valorPredetCodigo;
            this.readonly = false;
        }else{
            this.detalles_retenciones.porcentaje_retencion = Number(codigosObtenidos.porcentaje_cod_retencion).toFixed(2);                    
            this.readonly=true;
        }            
    },
    AddRetencion(){         
        //creo nuevo objeto                 
        const nuevaRetencion = {
        selectedImpuesto: this.detalles_retenciones.selectedImpuesto,
        selectedCodigo: this.detalles_retenciones.selectedCodigo,
        valorBaseImponible: this.detalles_retenciones.valorBaseImponible,
        porcentaje_retencion: this.detalles_retenciones.porcentaje_retencion,
        valorTotal: this.totalValorRetenido
        };        
        
        if(this.acumulado_retenciones.length >= 2 ){
            this.alertaMensaje("Error en el Ingreso de Datos","Revise los valores de RENTA E IVA","error");
            this.detalles_retenciones.selectedImpuesto = '';
            this.detalles_retenciones.selectedCodigo = '';
            this.detalles_retenciones.valorBaseImponible = '';
            this.detalles_retenciones.porcentaje_retencion = '';   
        }else if(this.totalValorRetenido == 0){
            this.alertaMensaje("Error en el Ingreso de Datos","El valor retenido no puede ser cero","info");              
        }
        else{                        
            if(nuevaRetencion.selectedImpuesto == 'renta'){
                if(this.valoresAceptados(nuevaRetencion.selectedCodigo,nuevaRetencion.porcentaje_retencion)){            
                    this.acumulado_retenciones.push(nuevaRetencion);
                    this.detalles_retenciones.selectedImpuesto = '';
                    this.detalles_retenciones.selectedCodigo = '';
                    this.detalles_retenciones.valorBaseImponible = '';
                    this.detalles_retenciones.porcentaje_retencion = '';                        
                }
            }else{
                this.acumulado_retenciones.push(nuevaRetencion);
                    this.detalles_retenciones.selectedImpuesto = '';
                    this.detalles_retenciones.selectedCodigo = '';
                    this.detalles_retenciones.valorBaseImponible = '';
                    this.detalles_retenciones.porcentaje_retencion = '';
            }
        
        }
        
    },
    EliminarItem(id){
        this.acumulado_retenciones.splice(id,1);        
    },
    async Save(){           
        let firmaElectronica = process.env.URL_BACK+"serve/"+this.user.id     
        const operacion={
            model:this.model,
            sujeto_retenido:this.model_sujetoRetenido,
            documento_retencion:this.model_doc_ret,
            acumulado_retenciones:this.acumulado_retenciones,
            secuencial_sig:this.oneSecuencialData.sec_sig_com_ret,
        }               
        if(this.model.fecha_emision == "" || this.model_establecimiento.puntoEmision == "" || this.model.year_establecimiento == "" || this.model.month_establecimiento == ""
        || this.model_doc_ret.fecha_emision_dor == ""|| this.model_doc_ret.codigo_establecimiento == "" || this.model_doc_ret.punto_emision == "" || this.model_doc_ret.secuencial == ""
        || this.model_doc_ret.idSustentoTributario == ""|| this.model_doc_ret.tipoDocSustento == "" || this.model_doc_ret.forma_pago == ""||this.model_doc_ret.tipo_pago == "")
        {
            this.alertaMensaje("Error en el Ingreso de Datos","Hay campos Obligatorios Vacios. Por favor revise todos los campos antes de continuar...","error");
        }else if(this.model_doc_ret.codigo_establecimiento.length !=3 || this.model_doc_ret.punto_emision.length !=3 || this.model_doc_ret.secuencial.length !=9){
            this.alertaMensaje("Error en el Ingreso de Datos","Por favor revise los campos de codigo de emision, punto de emision o secuencial.","error");
        }else if(this.acumulado_retenciones.length == 0){
            this.alertaMensaje("Error en el Ingreso de Datos","Atención!! Debe ingresar Valores de Iva y Renta","error");
        }
        else{
            if(this.model_sujetoRetenido.direccion == ""){                
                this.model_sujetoRetenido.direccion="-";
            }else if(this.model_sujetoRetenido.telefono==""){
                this.model_sujetoRetenido.telefono="-";
            }else{
                if(this.acumulado_retenciones.length > 1){
                    if(this.acumulado_retenciones[0].selectedImpuesto == "iva" && this.acumulado_retenciones[1].selectedImpuesto == "iva"){
                        this.alertaMensaje("Error en el Ingreso de Datos","No puede haber tipos de impuestos duplicados","error");
                    }else if(this.acumulado_retenciones[0].selectedImpuesto == "renta" && this.acumulado_retenciones[1].selectedImpuesto == "renta"){
                        this.alertaMensaje("Error en el Ingreso de Datos","No puede haber tipos de impuestos duplicados","error");
                    }else{
                        this.load=true;                     
                        try{                            
                            if(this.datosUsuario.estado_firma == false){
                                this.alertaMensaje("ATENCION","Primero debe habilitar el estado de su firma en la Configuración de Firma Electronica","info")                                
                            }else{                                       
                                const res = await this.$api.$post(this.apiUrl,operacion);             
                                let comprobanteFirmado= await firmarXML(firmaElectronica,res,this.datosUsuario.password_firma,this.datosUsuario.ruc);                       
                                let base64EncodedString = btoa(comprobanteFirmado);
                                const res2 = await this.$api.$post("xmlRetencionController", {base64EncodedString});                
                                this.alertaMensajeRouter(res2);
                            }
                        }catch(e){                            
                            this.alertaMensaje("Error al generar la Retención","Por favor, comunicate con el Administrador.","error");
                        }finally{
                            this.load=false;
                        } 
                    }                    
                }else if(this.acumulado_retenciones.length == 1){                    
                        this.load=true;                     
                        try{                            
                            if(this.datosUsuario.estado_firma == false){
                                this.alertaMensaje("ATENCION","Primero debe habilitar el estado de su firma en la Configuración de Firma Electronica","info")                                
                            }else{                                                        
                                const res = await this.$api.$post(this.apiUrl,operacion);             
                                let comprobanteFirmado= await firmarXML(firmaElectronica,res,this.datosUsuario.password_firma,this.datosUsuario.ruc);                       
                                let base64EncodedString = btoa(comprobanteFirmado);
                                const res2 = await this.$api.$post("xmlRetencionController", {base64EncodedString});                
                                this.alertaMensajeRouter(res2);
                            }
                        }catch(e){
                            console.log(e);
                            this.alertaMensaje("Error al generar la Retención","Por favor, comunicate con el Administrador.","error");
                        }finally{
                            this.load=false;
                        }                     
                }
                else{
                    this.alertaMensaje("Error al generar la Retención","Por favor, agregue detalles de comprobantes de retención.","info");
                }                
            }           
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
    cargarDataSustentoTribu(){        
        const resultado = this.data_sustento_tributario.find((data) => data.id === this.model_doc_ret.idSustentoTributario);            
        this.codigos_retencion = this.codigos_generales.filter(codigo => codigo.tipo_cod_impuesto == this.detalles_retenciones.selectedImpuesto )            
        this.tipoDocumentoSustento = this.data_documento_sustento.filter(data => resultado.codigos_habilitados.includes(data.id));        
    },

    valoresAceptados(valor1,valor2){
        if(valor1 == "325" || valor1 == "325A" ){            
            if(valor2 != 22 && valor2 !=25){
             this.alertaMensaje("ATENCION","Los valores de porcentaje solo pueden ser 22 o 25","info");
             return false;
            }else{
                return true;
            }
        }
        if(valor1 =="338"){
            if(valor2 < 1 && valor2 >2){
             this.alertaMensaje("ATENCION","Los valores de porcentaje deben estar comprendidos entre 1 y 2","info");
             return false;
            }else{
                return true;
            }
        }
        if(valor1 == "346C" || valor1 == "346D"){
            if(valor2 != 0 && valor2 != 10){
                this.alertaMensaje("ATENCION","Los valores de porcentaje solo pueden ser 0 o 10","info");
                return false;
            }else{
                return true;
            }
        }
        if(valor1 == "350"){            
            if(valor2 != 1.5 && valor2 != 1.75){
                this.alertaMensaje("ATENCION","Los valores de porcentaje solo pueden ser 1.50 o 1.75","info");
                return false;
            }else{
                return true;
            }
        }
        return true;
    },

    validacionCodigos(codigo){        
        if(codigo == "326" || codigo=="336" || codigo=="337" || codigo=="346" 
          || codigo=="346A" || codigo=="346B" || codigo == "3481" ){
            this.valorPredetCodigo="";
            return false;
        }else if(codigo == "325" || codigo == "325A"){
            this.valorPredetCodigo="22";
            return false;
        }else if(codigo == 338){
            this.valorPredetCodigo="1";
            return false;
        }else if (codigo=="346C" || codigo=="346D"){
            this.valorPredetCodigo="0";
            return false;
        }else if ( codigo == "350"){
            this.valorPredetCodigo="1.5";
            return false;
        }else{
            return true;
        }
    },
    cargarEjercicio(){                
        const fechaPartes = this.model.fecha_emision.split("-");                
        this.model.year_establecimiento = fechaPartes[0];
        this.model.month_establecimiento = fechaPartes[1];

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
      return year+"-"+month+"-"+day;;      
    }
  },
  mounted(){
    this.$nextTick(async()=>{
        try{
            let loginUser = localStorage.getItem('userAuth');
            this.user = JSON.parse(loginUser);
            if(this.user == null){
                this.$router.push('/auth/login');
            }else{
                await this.Secuenciales(this.user.id);
                await this.Vendedores(this.user.id);
                await this.CodigosRetenciones(); 
                await this.Usuarios(this.user.id);
                this.fechaActual=this.getFechaActual();               
                this.model.fecha_emision = this.fechaActual;
                const fechaPartes = this.model.fecha_emision.split("-");                
                this.model.year_establecimiento = fechaPartes[0];
                this.model.month_establecimiento = fechaPartes[1];
            }            
            //await this.oneSecuencial(this.user.id);
        }catch(e){
            console.log(e);
        }finally{
            this.load=false;
        }
    })
  }

}
</script>
