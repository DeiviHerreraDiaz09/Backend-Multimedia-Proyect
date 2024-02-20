export const sumarFechaActual = (dias) => {
    let fechaActual = new Date();
    let nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(fechaActual.getDate() + dias);
    // Formateamos la fecha y hora en el formato deseado
    let year = nuevaFecha.getFullYear();
    let mes = ('0' + (nuevaFecha.getMonth() + 1)).slice(-2); 
    let dia = ('0' + nuevaFecha.getDate()).slice(-2);
    let hora = ('0' + nuevaFecha.getHours()).slice(-2);
    let minuto = ('0' + nuevaFecha.getMinutes()).slice(-2);
    let segundo = ('0' + nuevaFecha.getSeconds()).slice(-2);
    let fechaCalculada = year + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;
    return fechaCalculada
}

export const obtenerFechaActual = () => {
    // Obtenemos la fecha actual
    let fechaActual = new Date();

    // Obtenemos los componentes de la fecha y hora
    let year = fechaActual.getFullYear();
    let mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    let dia = ('0' + fechaActual.getDate()).slice(-2);
    let hora = ('0' + fechaActual.getHours()).slice(-2);
    let minuto = ('0' + fechaActual.getMinutes()).slice(-2);
    let segundo = ('0' + fechaActual.getSeconds()).slice(-2);

    let fechaFormateada = `${year}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

    return fechaFormateada;
}