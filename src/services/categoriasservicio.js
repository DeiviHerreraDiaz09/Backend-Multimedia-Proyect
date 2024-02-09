import { conexionBD } from "../config/conexion.js";

export const obtenerCategerias = async () => {
    const conexion = await conexionBD();
    const [categorias, campos] = await conexion.query("SELECT * FROM categoria");
    conexion.release();
    return categorias;
}