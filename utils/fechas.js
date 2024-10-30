export function getFechaActual(){
    const fecha = new Date();
    return fecha;
}
export function transformFecha(fechaIngresada){
    let fecha = new Date(fechaIngresada);
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let year = fecha.getFullYear();
    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;
    return `${dia}-${mes}-${year}`;
}

export function transformFechaReverse(fechaIngresada){
    let fecha = new Date(fechaIngresada);
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let year = fecha.getFullYear();
    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;
    return `${year}-${mes}-${dia}`;
}