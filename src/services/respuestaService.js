import { conexionBD } from "../config/conexion.js";

export const obtenerRespuestasServicio = async () => {
  const conexion = await conexionBD();
  const [respuestas, campos] = await conexion.query("SELECT * FROM respuesta");
  conexion.release();
  return respuestas;
};

export const obtenerRespuestaServicio = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "SELECT * FROM respuesta WHERE id = ?",
    [id]
  );
  conexion.release();

  if (resultado.length > 0) {
    return resultado[0];
  } else {
    return null;
  }
};

export const crearRespuestaServicio = async (respuesta) => {
  console.log("Aqui llego la respuesta:" + respuesta);
  const conexion = await conexionBD();

  const [resultado, campos] = await conexion.execute(
    "INSERT INTO respuesta (mensaje, fecha) VALUES (?,?)",
    [respuesta.mensaje, respuesta.fecha]
  );
  const idRespuestaInsertado = resultado.insertId;
  const obtenerRespuesta = await obtenerRespuestaServicio(idRespuestaInsertado);
  conexion.release();
  return obtenerRespuesta;
};

export const actualizarRespuestaSevicio = async (respuestaUpdate, id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "UPDATE respuesta SET ? WHERE id = ?",
    [respuestaUpdate, id]
  );
  const respuestaActualizada = await obtenerRespuestaServicio(id);
  conexion.release();
  return respuestaActualizada;
};
