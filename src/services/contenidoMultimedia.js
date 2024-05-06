import { conexionBD } from "../config/conexion.js";

export const crearContenidoMultimediaServicio = async (contemidoMultimedia) => {
    const conexion = await conexionBD();
    const [resultado, campos] = await conexion.execute("INSERT INTO contenidosmultimedia (titulo, archivo, categoria_fk) VALUES (?,?,?)", [contemidoMultimedia.titulo, contemidoMultimedia.archivo, contemidoMultimedia.categoria]);
    conexion.release();
    if (resultado.affectedRows === 0) {
        throw createHttpError(400, "Error en la inserción de datos")
    }
    return resultado;
};
