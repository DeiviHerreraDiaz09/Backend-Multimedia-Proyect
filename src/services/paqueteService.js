import { conexionBD } from "../config/conexion.js";

export const registrarPaqueteServicio = async (paquete)=>{
    const conexion = await conexionBD();
    const [resultado] = await conexion.execute(
        "INSERT INTO paquete(nombre, descripcion, limite_canciones, numero_publicidad, etiqueta_fk, dias_vigencia) VALUES (?,?,?,?,?,?)",[paquete.nombre, paquete.descripcion, paquete.numeroCanciones, paquete.numeroPublicidad, paquete.etiqueta,paquete.diasVigencia]
    );
    conexion.release();
    return resultado;
}