import { conexionBD } from "../config/conexion.js";

export const listarPaquetesServicio = async () => {
    const conexion = await conexionBD();
    const [paquetes, campos] = await conexion.query("SELECT paquete.id, paquete.nombre, paquete.descripcion, paquete.limite_canciones, paquete.numero_publicidad, paquete.dias_vigencia, etiqueta.nombre AS nombre_etiqueta FROM paquete INNER JOIN etiqueta ON etiqueta.id = paquete.etiqueta_fk");
    conexion.release();
    return paquetes;
}

export const registrarPaqueteServicio = async (paquete)=>{
    const conexion = await conexionBD();
    const [resultado] = await conexion.execute(
        "INSERT INTO paquete(nombre, descripcion, limite_canciones, numero_publicidad, etiqueta_fk, dias_vigencia) VALUES (?,?,?,?,?,?)",[paquete.nombre, paquete.descripcion, paquete.numeroCanciones, paquete.numeroPublicidad, paquete.etiqueta,paquete.diasVigencia]
    );
    conexion.release();
    return resultado;
}