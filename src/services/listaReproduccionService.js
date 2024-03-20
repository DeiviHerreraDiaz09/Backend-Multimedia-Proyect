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

// POR HACERñ

export const añadirContenidoMultimedia = async () =>{

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


}