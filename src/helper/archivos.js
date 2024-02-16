import { generarCodigoAleatorio } from "./encriptacion.js";

export const generarArchivo = (nombreArchivo) => {
    const NUMERO_ALEATORIO = generarCodigoAleatorio(10);
    const extension = nombreArchivo.split(".").pop();
    const nombreArchivoAntiguo = nombreArchivo.split(".").shift();
    const nombreNuevo = `${NUMERO_ALEATORIO}${nombreArchivoAntiguo}.${extension}`;
    return nombreNuevo;
}