<template>
  <div>
    <Loader :load="load" />
    <AdminTemplate>
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="car-header text-center">
                <h3>Consulta y Pago de de Cuentas</h3>
              </div>
              <div class="card-body">                    
                      <div class="row" slot="body">
                          <div class="col-12">
                              <div class="form-group autocomplete">
                                  <label for="" class="fs-5">Busqueda del Cliente</label>
                                  <div class="row">
                                    <div class="col-7">
                                      <input type="text"  name="" class="form-control form-control-lg fs-5" id="" placeholder="Busca el Cliente...."
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
                                    </div>
                                    <div class="col">
                                      <button type="button" class="btn btn-primary text-white" @click="Calcular()">CALCULAR CUENTA</button>                                      
                                    </div>
                                  </div>                                  
                              </div>    
                              <div class="row">
                                  <div class="col text-center">
                                    <label for="" class="fs-5">Saldo Anterior</label>
                                  </div>
                                  <div class="col text-center">
                                    <input type="text" class="form-control form-control-lg fs-5" id="" v-model="model.saldo_anterior" readonly>                  
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col text-center">
                                    <label for="" class="fs-5">Total</label>
                                  </div>
                                  <div class="col">
                                    <input type="text" class="form-control form-control-lg fs-5" id="" v-model="model.total" readonly>                  
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col text-center">
                                    <label for="" class="fs-5">Valor Recibido</label>
                                  </div>
                                  <div class="col">
                                    <input type="number" class="form-control form-control-lg fs-5" v-model="model.valor_recibido">
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col text-center">
                                    <label for="" class="fs-5">Saldo</label>
                                  </div>
                                  <div class="col">
                                    <h3>$ {{ calcularSaldo }}</h3>
                                  </div>
                              </div>                                                                                   
                          </div>
                      </div>         
                      <v-data-table :headers="headers" :items="list"                                                                                                                                                      
                                    class="custom_headers">
                      <template v-slot:item={item}>
                        <tr>
                          <td class="fs-6">{{item.fecha_emision}}</td>
                          <td class="fs-6">{{item.cantidad}}</td>
                          <td class="fs-6">{{item.nombre_producto}}</td>
                          <td class="fs-6">{{item.subtotal}}</td>
                        </tr>
                      </template>                                   
                      </v-data-table>    

                      <div class="row mt-3">
                        <div class="col-6">
                          <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
                        </div>                     
                        <div class="col-6">
                          <button class="btn btn-info w-100" @click="Save()">Registrar Pago</button>
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
import {getFechaActual,transformFechaReverse} from '/utils/fechas';
export default{
  name: 'IndexPage',
head() {          
      return {                
        title: 'Sys_Facturacion'
      };
        },
data(){
      return{
        load:true,
        model:{
          clienteId:'',
          total:'',
          valor_recibido:'',
          saldo:'',
          saldo_anterior:'',
          fecha_pago:transformFechaReverse(getFechaActual()),
        },
        apiUrl: 'calculoCuenta',
        apiUrlCuenta:'cuenta',
        totalSaldo:0,
        filteredClientes:'',
        searchQuery: '', 
        clientes:[],
        list:[],
        headers:[
          { text: 'Fecha de Compra', value: 'fecha_pago',sortable:true },
          { text: 'Cantidad', value: '' },
          { text: 'Producto', value: '' },
          { text: 'Subtotal', value: '' },  

        ]
      }
    },
methods:{
  async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async Save(){      
      if(this.model.total == 0 && this.model.saldo_anterior == 0 ){
         this.alertaMensaje("Atencion","No existen Valores que pagar","error");
      }else if(this.model.valor_recibido == 0 || this.model.valor_recibido == null){
        this.alertaMensaje("Atencion","Ingrese el valor que le Pagaron","info");
      }else if(Number(this.model.valor_recibido) > ( Number(this.model.total) + Number(this.model.saldo_anterior)).toFixed(2)){        
        this.alertaMensaje("Atencion","El valor CANCELADO es mayor al valor que le DEBEN. Revise los valores ingresados e Intente de Nuevo","info");
      }else if (this.model.valor_recibido < 0 ) {
        this.alertaMensaje("Atencion","El valor CANCELADO debe ser MAYOR a CERO. Revise los valores ingresados e Intente de Nuevo","info");
      }
      else{        
        const res = await this.$api.$post(this.apiUrlCuenta,this.model);
        this.alertaMensajeRouter(res);
      }
      
    },
  async Calcular(){
   const res = await this.$api.get(this.apiUrl+'/'+this.model.clienteId);      
   this.model.total = Number(res.data.total).toFixed(2);
   this.model.saldo_anterior = Number(res.data.saldo_anterior).toFixed(2);
   this.list = res.data.detalleCuenta;
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
  font-size:15px !important;
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