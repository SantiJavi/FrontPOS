<template>
    <tr @click="AgregarProducto()">
        <!--th class="text-center">
            {{ producto.codigo_producto }}
        </th-->
        <th>
            {{ producto.nombre_producto }}
        </th>
        <th>
            {{ producto.precio_producto }}
        </th>        
    </tr>

    <!--div class="card p-0" @click="AgregarProducto()">
        <div class="card-header mx-4 mt-2 p-1 text-center">
            <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                <i class="fas fa-archive opacity-10" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body pt-0 p-1 text-center">
            <h6 class="text-center mb-0 text-xxs">
                <i class="fas fa-barcode"></i> {{ producto.codigo_producto }}
            </h6>
            <span class="text-xs">{{ producto.nombre_producto }}</span>
            <hr class="horizontal dark my-2" />
            <h5 class="mb-0 text-sm">{{ producto.precio_producto }}</h5>
        </div>
    </div-->

</template>
<script>
export default {
    props: {
        producto: {
            type: Object,
            default: () => { }
        }
    },
    methods:{
        AgregarProducto(){
          this.$emit('AddProducto',this.producto)  
        }
    }
}
</script>