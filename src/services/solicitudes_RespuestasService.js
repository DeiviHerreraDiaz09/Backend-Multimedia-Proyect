import { conexionBD } from "../config/conexion";

export const obtenerSoliRespServicio = async () => {
  const conexion = await conexionBD();
  const [procesoSolicitud, campos] = await conexion.query(
    "SELECT * FROM solicitud_respuesta"
  );
  conexion.release();
  return procesoSolicitud;
};

export const obtenerSoliRespBySoliServicio = async (id) => {
    const conexion = await conexionBD();
    const [resultado] = await conexion.query(
      "SELECT * FROM solicitud_respuesta where solicitud_fk = ?", [id]
    );
    conexion.release();
    return resultado;
};

export const obtenerSoliRespByRespServicio = async () => {
    const conexion = await conexionBD();
    const [resultado] = await conexion.query(
      "SELECT * FROM solicitud_respuesta where respuesta_fk = ?", [id]
    );
    conexion.release();
    if (resultado.length > 0) {
        return resultado[0];
      } else {
        return null;
      }
};
