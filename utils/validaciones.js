export const regexSoloNumeros = /^[0-9]+$/;
export const regexSoloLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
export const regexCorreoElectronico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validacionSoloNumeros(numero){
    return regexSoloNumeros.test(numero);
}
export function validacionSoloLetras(campo){
    return regexSoloLetras.test(campo);
}
export function validacionCorreo(email){
    return regexCorreoElectronico.test(email);
}


export function datoActualizado(){
    this.$swal.fire({
        title: "Actualizado",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok"
    }).then((result) => {
        if (result.isConfirmed) {
            this.$router.back();
        }
    })
}
export function alertaMensaje(titulo,mensaje,tipo){
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