import { conexionBD } from "../config/conexion.js";

export const obtenerEtiquetasServicio = async () => {
    const conexion = await conexionBD();
    const [etiquetas, campos] = await conexion.query("SELECT * FROM etiqueta");
    conexion.release();
    return etiquetas;
}