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
      datos:Array
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
        telefono: "23599101",
        email: "romulo_castro61@hotmail.com"
      };    
      const cliente = {
        nombre: this.nombreCliente,
        direccion: "Calle Cliente 456",        
        telefono: "+987 654 321",
        email: "juan.perez@email.com"
      };            

      
      let subtotal = this.datos.reduce((total, dato) => total + Number(dato.subtotal), 0);
          

      doc.setFontSize(18);
      doc.text("Detalle de Venta", 105, 20, null, null, "center");

      doc.setFontSize(12);
      doc.text(`Razon Social: ${empresa.nombre}`, 10, 30);
      doc.text(`Dirección: ${empresa.direccion}`, 10, 35);      
      doc.text(`Teléfono: ${empresa.telefono}`, 10, 40);
      doc.text(`Email: ${empresa.email}`, 10, 45);

      doc.text(`Cliente: ${cliente.nombre}`, 140, 30);      

      doc.setLineWidth(0.5);
      doc.line(10, 55, 200, 55);

      doc.text("Descripción", 10, 65);
      doc.text("Cantidad", 120, 65);
      doc.text("Precio.U ", 150, 65);
      doc.text("Total", 180, 65);

      doc.setLineWidth(0.2);
      doc.line(10, 70, 200, 70);

      let y = 75; // Coordenada Y para la fila de los productos

      this.datos.forEach((dato) => {
        doc.text(dato.nombre_producto, 10, y);
        doc.text(Number(dato.cantidad).toFixed(2), 120, y);
        doc.text(`$${dato.subtotal / dato.cantidad}`, 150, y);
        doc.text(`$${(dato.subtotal)}`, 180, y);
        y += 10;
      });

      // Espacio para los totales
      doc.line(10, y + 5, 200, y + 5);
      
      doc.text("Total a Pagar", 140, y + 15);
      doc.text(`$${Number(subtotal).toFixed(2)}`, 180, y + 15);  

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