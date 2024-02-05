import createHttpError from "http-errors";
import { conexionBD } from "../config/conexion.js";

export const obtenerListasReproduccionServicio = async () => {
  const conexion = await conexionBD();
  const [listas, campos] = await conexion.query(
    "SELECT * FROM listareproduccion"
  );
  conexion.release();
  return listas;
};

export const obtenerListaReproduccionId = async (id) => {
    const conexion = await conexionBD();
    const [listaReproduccion, campos] = await conexion.query("SELECT * FROM listareproduccion WHERE id =? ",[id]);
    conexion.release();
    return listaReproduccion;
};
export const obtenerListasReproduccionDetalladaServicio = async (id) => {
  const conexion = await conexionBD();
  const [listas, campos] = await conexion.query(
    "SELECT titulo, archivo FROM listareproduccion INNER JOIN listar_contenidom ON listar_contenidom.listaReproduccion_fk = listareproduccion.id INNER JOIN contenidosmultimedia ON contenidosmultimedia.id = listar_contenidom.contenidoMultimedia_fk WHERE listareproduccion.id = ? ",
    [id]
  );
  conexion.release();
  return listas;
};

export const crearListaReproduccionServicio = async (listaReproduccion) => {
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO listareproduccion (nombre,usuario_fk) VALUES (?,?)",
    [listaReproduccion.nombre, listaReproduccion.usuario]
  );
  conexion.release();
  if (resultado.affectedRows === 0) {
    throw createHttpError(400, "Error en la inserción de datos");
  }
  return resultado;
};
