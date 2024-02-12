import { conexionBD } from "../config/conexion.js";
// import { crearSolicitudServicio } from "../services/solicitudServicio.js";

export const formularioSolicitud = async (req, res) => {
  try {
    res.render("./solicitud/formularioSolicitud");
  } catch (error) {
    console.log(error);
    res.render("index", { mensaje: error.message });
  }
};

export const registroSolicitud = async (req, res) => {
  try {
    const { titulo, descripcion, duracion, categoria_fk } = req.body;

    const data_solicitud = {
      titulo,
      descripcion,
      duracion,
      categoria_fk,
      fechaInicio: Date.now(),
      fechaFinalizacion: Date.now(),
      estado: "pendiente",
      usuario_fk: 1,
    };

    const response = await crearSolicitudServicio(data_solicitud);
    res.send("Registrado con exito");
  } catch (error) {
    console.log(error);
  }
};

// SERVICIO UBICADO POR EL MOMENTO ACA PORQUE NO ME DETECTA EL ARCHIVO SERVICES DE SOLICITUD

export const crearSolicitudServicio = async (solicitud) => {
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO solicitudes (titulo, descripcion, duracion, fechaInicio, fechaFinalizacion, estado, usuario_fk, categoria_fk) VALUES (?, ?, ?, FROM_UNIXTIME(? / 1000), FROM_UNIXTIME(? / 1000), ?, ?, ?)",
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
