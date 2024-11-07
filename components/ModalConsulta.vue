<template>
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }} {{ nombreCliente }}</h5>              
              <button type="button" class="close" @click="cerrarModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">      
              <div class="container">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">Fecha</th>
                      <th scope="col" class="text-center">Cantidad</th>
                      <th scope="col" class="text-center">Producto</th>
                      <th scope="col" class="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for = "item in datos"
                    :key="item.id">                    
                    <td class="text-center">{{ item.fecha_emision }} </td>
                    <td class="text-center">{{ item.cantidad }} </td>
                    <td class="text-center">{{ item.nombre_producto }} </td>
                    <td class="text-center">{{ item.subtotal }} </td>
                    </tr>                                                       
                  </tbody>                  
                </table>         
              </div>                
                <button type="button" class="btn bg-gradient-dark w-100 mb-0" @click="generarDocumento()">Imprimir Detalle</button>
            </div>                                
            <div class="modal-footer">
              <button type="button" class="btn btn-primary text-white" @click="cerrarModal">Cerrar</button>
            </div>
          </div>            
        </div>    
    </div>
  </template>
  
  <script>
  import jsPDF, {jspdf} from "jspdf";

  export default {
    props: {
      title: String,
      nombreCliente:String,
      datos: {
        type: Array,
        default: () => [] // Inicializa `datos` como un array vacío
      }
    },
    data(){
      return {
        model :{
          pago:null
        },
        totalCampo : this.total,
        totalCambio:0,
        tipoPago: 'efectivo',
        apiUrl: 'venta',        
        headers:[                                            
                      { text: 'Fecha', value: '' },
                      { text: 'Cantidad', value: '' },                      
                      { text: 'Producto', value: '',sortable: true  },
                      { text: 'Precio', value: '', sortable: true  }                      
          ],
      }
    },
    methods: {      
      cerrarModal() {
        this.$emit('cerrar'); // Emite un evento para cerrar el modal
      },
      alertaMensajeRouter(titulo){
      this.$swal.fire({
          title: titulo,          
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.go(0);
          }
        })
    }, 
    generarDocumento(){ 
      const doc = new jsPDF();            
      doc.setFont("helvetica", "normal");      
      
      const empresa = {
        nombre: "Viveres Santiaguito",
        direccion: "Calle los Vergeles, Barrio el Vergel",                
        email: "romulo_castro61@hotmail.com"
      };    
      const cliente = {
        nombre: "Juan Pérez",
        direccion: "Calle Cliente 456",
        ciudad: "Ciudad del Cliente",
        telefono: "+987 654 321",
        email: "juan.perez@email.com"
      };      
      const productos = [
        { descripcion: "Producto A", cantidad: 2, precio: 50 },
        { descripcion: "Producto B", cantidad: 1, precio: 120 },
        { descripcion: "Servicio C", cantidad: 1, precio: 200 },
      ];      
      let subtotal = 0;
      productos.forEach(producto => {
        subtotal += producto.cantidad * producto.precio;
      });

      const impuesto = subtotal * 0.16;  // Supongamos un 16% de IVA
      const total = subtotal + impuesto;

      doc.setFontSize(18);
      doc.text("Detalle de Venta", 105, 20, null, null, "center");

      doc.setFontSize(12);
      doc.text(`Empresa: ${empresa.nombre}`, 10, 30);
      doc.text(`Dirección: ${empresa.direccion}`, 10, 35);
      doc.text(`Ciudad: ${empresa.ciudad}`, 10, 40);
      doc.text(`Teléfono: ${empresa.telefono}`, 10, 45);
      doc.text(`Email: ${empresa.email}`, 10, 50);

      doc.text(`Cliente: ${cliente.nombre}`, 140, 30);
      doc.text(`Dirección: ${cliente.direccion}`, 140, 35);
      doc.text(`Ciudad: ${cliente.ciudad}`, 140, 40);
      doc.text(`Teléfono: ${cliente.telefono}`, 140, 45);
      doc.text(`Email: ${cliente.email}`, 140, 50);

      doc.setLineWidth(0.5);
      doc.line(10, 55, 200, 55);

      doc.text("Descripción", 10, 65);
      doc.text("Cantidad", 120, 65);
      doc.text("Precio.U ", 150, 65);
      doc.text("Total", 180, 65);

      doc.setLineWidth(0.2);
      doc.line(10, 70, 200, 70);

      let y = 75; // Coordenada Y para la fila de los productos

      productos.forEach((producto) => {
        doc.text(producto.descripcion, 10, y);
        doc.text(producto.cantidad.toString(), 120, y);
        doc.text(`$${producto.precio.toFixed(2)}`, 150, y);
        doc.text(`$${(producto.cantidad * producto.precio).toFixed(2)}`, 180, y);
        y += 10;
      });

      // Espacio para los totales
      doc.line(10, y + 5, 200, y + 5);
      
      doc.text("Subtotal", 140, y + 15);
      doc.text(`$${subtotal.toFixed(2)}`, 180, y + 15);

      doc.text("IVA (16%)", 140, y + 25);
      doc.text(`$${impuesto.toFixed(2)}`, 180, y + 25);

      doc.text("Total a Pagar", 140, y + 35);
      doc.text(`$${total.toFixed(2)}`, 180, y + 35);

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 5000);      
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
  }
  </script>
  <style>
  .margen_derecha{
    margin-right:50px
  }
  .valoresTotales{
    margin-right: 32px;
  }
  </style>