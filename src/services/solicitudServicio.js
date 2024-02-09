import { conexionBD } from "../config/conexion";

export const crearSolicitudServicio = async (solicitud) => {
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO solicitud (titulo, descripcion, duracion, fechaInicio, fechaFinalizacion, estado, usuario_fk, categoria_fk) VALUES (?, ?, ?, FROM_UNIXTIME(? / 1000), FROM_UNIXTIME(? / 1000), ?, ?, ?)",
    [
      solicitud.titulo,
      solicitud.descripcion,
      solicitud.duracion,
      solicitud.fechaInicio,
      solicitud.fechaFinalizacion,
      solicitud.estado,
      solicitud.usuario_fk,
      solicitud.categoria_fk,
    ]
  );

  conexion.release();
  return resultado;
};

