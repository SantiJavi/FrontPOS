<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate>
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="car-header text-center mb-4">
                <h3>Registro de Cuentas Clientes</h3>
              </div>              
              <v-data-table :headers="headers" 
                              :items="list"                                                                                        
                              class="custom_headers">
                  <template v-slot:item="{item}">
                    <tr>
                      <td class="fs-5">{{ item.fecha_pago }}</td>
                      <td class="fs-5">{{ item.total_cuenta }}</td>
                      <td class="fs-5">{{ item.total_pagado }}</td>
                      <td class="fs-5">{{ item.saldo }}</td>                                                                
                      <td class="p-3 ml-5">
                        <button @click="previsualizarDetalle(item.id)" class="btn btn-success" title="Ver el detalle de Compra">                          
                          <i class="fas fa-eye"></i>
                        </button>                      
                      </td>                      
                    </tr>
                  </template>
                </v-data-table>                
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>
<script>
export default{
  name: 'IndexPage',
head() {          
      return {                
        title: 'Sys_Facturacion'
      };
        },
data(){
      return{
        modalTitle: 'Detalle de Venta del Cliente: ',
        load:true,
        list:[],
        apiUrl: 'cuentasCliente',        
        totalSaldo:0,
        filteredClientes:'',
        searchQuery: '', 
        clientes:[],
        detalles:[], 
        model:{
          fecha_pago:'',
          total_cuenta:'',
          total_pagado:'',
          saldo:'',
          clienteId:'',
        },
        headers:[                                                                  
                      { text: 'Nombre Cliente', value: 'nombre',sortable: true },
                      { text: 'Total Deuda', value: '' },
                      { text: 'Detalle de Cuenta', value: '' },                                                                  
                      ],                  
      }
    },
methods:{
  async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Save(){            
      if(this.searchQuery==""){
          this.alertaMensaje("Error","Primero busque el Cliente para calcular la Cuenta","error");
      }else{
        const res = await this.$api.$post(this.apiUrlCuenta,this.model);
        this.alertaMensaje("",res,"success");  
      }
      
    },
  async BuscarCuenta(){    
    if(this.model.clienteId == ""){
      this.alertaMensaje("Error","Primero busque el Cliente para calcular la Cuenta","error");
    }else{
      const res = await this.$api.get(this.apiUrl+'/'+this.model.clienteId);
      this.list = res.data;    
    }    
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
  async Clientes(idUser){
      try {
        await Promise.all([this.GET_DATA('clientes/'+idUser)]).then((v) => {
          this.clientes = v[0];                         
        });
      } catch (e) {
        console.log(e);
      }
  },
  selectCliente(cliente) {      
      this.searchQuery = cliente.nombre;  
      this.model.clienteId =cliente.id;    
      this.filteredClientes = [];
  },
  async previsualizarDetalle(idDetalle){
    await this.consultaDetalle(idDetalle);
    this.abrirModal();
  },
  abrirModal(){
    this.$refs.modalComponent.$el.classList.add('show');
    this.$refs.modalComponent.$el.style.display = 'block';
  },
  cerrarModal(){    
    this.$refs.modalComponent.$el.classList.remove('show'); // Remueve la clase 'show' para ocultar el modal
    this.$refs.modalComponent.$el.style.display = 'none'; 
  },
  async consultaDetalle(idDetalle){
    const response = await this.$api.get('detalleCuenta/'+idDetalle);
    this.detalles = response.data;     
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
computed:{
  calcularSaldo(){              
      this.totalSaldo = this.model.valor_recibido - ( (Number(this.model.total) + Number(this.model.saldo_anterior)).toFixed(2));     
      this.model.saldo = Number(this.totalSaldo * (-1)).toFixed(2) 
        return  this.model.saldo;                    
      }
},

mounted(){  
  this.$nextTick(async () => {
  try {
        let loginUser = localStorage.getItem('userAuth');
        this.user = JSON.parse(loginUser);
        if(this.user == null){
          this.$router.push('/auth/login');
        }else{
          await this.Clientes(this.user.id);
        }
      }catch(e){
          console.log(e);
      }finally{
          this.load = false;
      }
  });
}
}

</script>
<style>
.custom_headers .v-data-table-header th{
  font-size: 20px !important;
  font-weight: bold;
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