import { conexionBD } from "../config/conexion.js";

export const listarPaquetesServicio = async () => {
    const conexion = await conexionBD();
    const [paquetes, campos] = await conexion.query("SELECT paquete.id, paquete.nombre, paquete.descripcion, paquete.limite_canciones, paquete.dias_vigencia, etiqueta.nombre AS nombre_etiqueta FROM paquete INNER JOIN etiqueta ON etiqueta.id = paquete.etiqueta_fk");
    conexion.release();
    return paquetes;
}

export const registrarPaqueteServicio = async (paquete)=>{
    const conexion = await conexionBD();
    const [resultado] = await conexion.execute(
        "INSERT INTO paquete(nombre, descripcion, limite_canciones, limite_promociones, limite_jingles, numero_enlaces, precio, etiqueta_fk, dias_vigencia) VALUES (?,?,?,?,?,?,?,?,?)",[paquete.nombre, paquete.descripcion, paquete.numeroCanciones,paquete.numeroPromociones, paquete.numeroJingles, paquete.numeroEnlaces, paquete.precio , paquete.etiqueta,paquete.diasVigencia]
    );
    conexion.release();
    return resultado;
}

export const obtenerPaquetePorId = async (id) => {
    const conexion = await conexionBD();
    const [paquete] = await conexion.query("SELECT paquete.id, paquete.nombre, paquete.descripcion, paquete.limite_canciones, paquete.dias_vigencia, etiqueta.nombre AS nombre_etiqueta FROM paquete INNER JOIN etiqueta ON etiqueta.id = paquete.etiqueta_fk WHERE paquete.id = ?", [id]);
    conexion.release();
    return paquete[0];
}