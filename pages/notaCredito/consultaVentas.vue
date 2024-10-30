<template>
  <div>
  <Loader :load="load"/>
  <AdminTemplate :page="page" :modulo="modulo">
    <div slot="body">
      <div class="row">
        <div class="col-12">       
          <div class="card">
            <div class="car-header text-center">
                <h3>Consulta de Ventas</h3>
              </div>
            <div class="card-body">
            <div class="text-center">
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <input class="form-control fs-6" v-model="model.fecha_emision" type="date">
                  </div>
                  <div class="col-md-auto">
                    <button class="btn btn-primary" @click="Consultar()" >Consultar</button>
                  </div>
                </div>   
              </div> 
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <label for="" class="fs-6">Fecha Consultada: </label>
                  </div>
                  <div class="col-md-auto">
                    <p class="fs-6">{{ this.model.fecha_emision }}</p>
                  </div>
                </div>   
              </div>                        
            </div>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="search" label="Buscar por RUC o por Nombre de Cliente" @input="searchItems()" />
              </v-col>
            </v-row>
              <v-data-table :headers="headers" :items="list"
                            :search="search"                                                                               
                            class="elevation-1">
                <template v-slot:item="{item}">
                  <tr>                    
                    <td class="fs-6">{{ item.id }}</td>
                    <td class="fs-6">{{ item.venta.fecha_emision }}</td>
                    <td class="fs-6">{{ item.cantidad }}</td>
                    <td class="fs-6">{{ item.producto.nombre_producto }}</td>
                    <td class="fs-6">{{ item.subtotal}}</td>                  
                    <td class="fs-6">{{ item.venta.tipo_pago }}</td>

                  </tr>
                </template>
              </v-data-table>             
            </div>  
            <div class="container">              
              <div class="row justify-content-md-center">
                <div class="col-md-auto">
                  <h4><span class="badge badge-secondary">Total Vendido:</span></h4>
                </div>
                <div class="col-md-auto">
                  <h4><span class="badge badge-secondary">$ {{ Number(totalVendido).toFixed(2) }}</span></h4>
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
  import AdminTemplate from '../../components/AdminTemplate.vue';
  
  export default {
      name: 'IndexPage',
      head() {          
          return {                
              title: 'Sys_Facturacion'
          };
      },
      data(){
        return{
          load:true,
          list:[],
          user:{},          
          search: '',          
          apiUrl:'ventaFecha',
          page:'Agregar',
          modulo:'Ventas Realizadas',
          url_nuevo:'/factura/facturas',
          model:{
            fecha_emision:''
          },
          headers:[
                    
                    { text: 'ID', align: 'left', value: '',sortable:false },
                    { text: 'Fecha', value: '' },
                    { text: 'Cantidad', value: '' },                      
                    { text: 'Producto', value: '',sortable: true  },
                    { text: 'Total', value: '', sortable: true  },
                    { text: 'Tipo de Venta', value: '' },],
        }
      },
      methods:{
        async GET_DATA(path) {
        const res = await this.$api.$get(path);
        return res;
      },
      async Consultar(){            
        if(this.model.fecha_emision == ""){
            this.alertaMensaje("Error","La fecha de Consulta no puede estar vacia","error");
        }else{
          const response = await this.$api.$post(this.apiUrl,this.model);        
          this.list = response;
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
    }
      },
      computed:{
        totalVendido(){
          return this.list.reduce((total,m)=>{            
            const subtotal = parseFloat(m.subtotal);
            return total + subtotal;
          },0);
        }        
      },
      async mounted(){
      try {
        let loginUser = localStorage.getItem('userAuth');
        this.user = JSON.parse(loginUser);
        if(this.user == null){
          this.$router.push('/auth/login');
        }else{
        }       
    } catch (e) {
      console.log(e);
    } finally {
      this.load = false;
    }        
    }
}
  </script>
  