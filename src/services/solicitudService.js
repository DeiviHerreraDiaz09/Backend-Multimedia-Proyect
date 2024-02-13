import { conexionBD } from "../config/conexion.js";

export const obtenerSolicitudesServicio = async () => {
  const conexion = await conexionBD();
  const [solicitudes, campos] = await conexion.query("SELECT * FROM solicitud");
  conexion.release();
  return solicitudes;
};

export const obtenerSolicitudServicio = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "SELECT * FROM solicitud where id = ?",
    [id]
  );
  conexion.release();
  if (resultado.length > 0) {
    return resultado[0];
  } else {
    return null;
  }
};

export const crearSolicitudServicio = async (solicitud) => {
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO solicitud (titulo, descripcion, fechaInicio, fechaFinalizacion, estado, usuario_fk) VALUES (?,?,?,?,?,?)",
    [
      solicitud.titulo,
      solicitud.descripcion,
      solicitud.fechaInicio,
      solicitud.fechaFinalizacion,
      solicitud.estado,
      solicitud.usuario_fk,
    ]
  );

  const idSolicitudInsertado = resultado.insertId;
  const obtenerSolicitud = await obtenerSolicitudServicio(idSolicitudInsertado);

  conexion.release();
  return obtenerSolicitud;
};


export const actualizarSolicitudServicio = async (solicitudUpdate, id) =>{
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "UPDATE solicitud SET ? WHERE id = ?",
    [solicitudUpdate, id]
  );
  const solicitudActualizada = await obtenerSolicitudServicio(id);
  conexion.release();
  return solicitudActualizada;
};

export const obtenerClientesServicio = async () => {
  const conexion = await conexionBD();
  const [clientes, campos] = await conexion.execute(
    "SELECT id,nombre,apellido,correo FROM usuario WHERE rol=?",
    ["Cliente"]
  );
  conexion.release();
  return clientes;


}