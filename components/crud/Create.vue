<template>
    <div class="row">
        <slot name="body">
        </slot>
        <div class="row">
            <div class="col-6">
                <button class="btn btn-dark w-100" @click="$router.back()">Regresar</button>
            </div>
            <div class="col-6">
                <button class="btn btn-info w-100" @click="Save()">Guardar</button>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {    
    props: {
        model: {
            type: Object,
            default: () => { }
        },
        apiUrl:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            load: false,
        }
    },
    methods: {
        async Save() {
            this.load = true;            
            try {
                const res = await this.$api.$post(this.apiUrl, this.model);                                
                this.$swal.fire({
                    title: "Dato Guardado",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.back();
                    }
                })
            } catch (e) {
                console.log(e);
            } finally {
                this.load = false;
            }
        }       
    },
    mounted() {
        this.$nextTick(async () => {
            try {
            } catch (e) {
                console.log(e);
            } finally {
            }
        })
    }

}
</script>
  