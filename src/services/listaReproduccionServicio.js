import createHttpError from "http-errors";
import { conexionBD } from "../config/conexion.js";

export const obtenerListasReproduccionServicio = async () => {
    const conexion = await conexionBD();
    const [listas, campos] = await conexion.query("SELECT * FROM listareproduccion");
    conexion.release();
    return listas
}

export const crearListaReproduccionServicio = async (listaReproduccion) => {
    const conexion = await conexionBD();
    const [resultado, campos] = await conexion.execute("INSERT INTO listareproduccion (nombre,usuario_fk) VALUES (?,?)", [listaReproduccion.nombre, listaReproduccion.usuario]);
    conexion.release();
    if (resultado.affectedRows === 0) {
        throw createHttpError(400, "Error en la inserción de datos")
    }
    return resultado;
}