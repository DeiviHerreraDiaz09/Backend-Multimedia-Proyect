import { conexionBD } from "../config/conexion.js";

export const obtenerRespuestasServicio = async () => {
  const conexion = await conexionBD();
  const [respuestas, campos] = await conexion.query("SELECT * FROM respuesta");
  conexion.release();
  return respuestas;
};
