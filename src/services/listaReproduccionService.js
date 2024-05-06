import createHttpError from "http-errors";
import { conexionBD } from "../config/conexion.js";

export const obtenerListasReproduccionServicio = async () => {
  const conexion = await conexionBD();
  const [listas, campos] = await conexion.query(
    "SELECT * FROM lista_reproduccion"
  );
  conexion.release();
  return listas;
};

export const crearListaReproduccionServicio = async (listaReproduccion) => {
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO lista_reproduccion (nombre, descripcion, genero_fk) VALUES (?,?,?)",
    [listaReproduccion.nombre, listaReproduccion.descripcion, null]
  );
  conexion.release();
  if (resultado.affectedRows === 0) {
    throw createHttpError(400, "Error en la inserción de datos");
  }
  return resultado;
};



export const añadirContenidoMultimedia = async (objetoContenido) =>{

  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO lista_contenido (orden, lista_reproduccion_fk, contenido_multimedia_fk) VALUES (?,?,?)",
    [objetoContenido.orden, objetoContenido.lista_reproduccion_fk, objetoContenido.contenido_multimedia_fk]
  );
  conexion.release();
  if (resultado.affectedRows === 0) {
    throw createHttpError(400, "Error en la inserción de datos");
  }
  return resultado;

}

export const obtenerContenidoUltimoOrden = async (lista_reproduccion_fk) => {
  const conexion = await conexionBD();
  const [rows, fields] = await conexion.execute(
    "SELECT * FROM lista_contenido WHERE lista_reproduccion_fk = ? ORDER BY orden DESC LIMIT 1",
    [lista_reproduccion_fk]
  );
  conexion.release();
  return rows[0]; 
}
