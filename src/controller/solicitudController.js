import {
  obtenerSolicitudesServicio,
  obtenerSolicitudServicio,
  crearSolicitudServicio,
  actualizarSolicitudServicio,
} from "../services/solicitudService.js";

export const listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await obtenerSolicitudesServicio();
    res.json(solicitudes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las solicitudes" });
  }
};

export const listarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await obtenerSolicitudServicio(id);
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la solicitud" });
  }
};

export const registrarSolicitud = async (req, res) => {
  try {
    const { titulo, descripcion, usuario_fk } = req.body;

    const fechaInicio = new Date();

    const data_solicitud = {
      titulo,
      descripcion,
      fechaInicio,
      fechaFinalizacion: new Date(
        fechaInicio.getTime() + 15 * 24 * 60 * 60 * 1000
      ),
      estado: "pendiente",
      usuario_fk,
    };

    const created = await crearSolicitudServicio(data_solicitud);

    res.json(created);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la solicitud" });
  }
};

export const actualizarSolicitud = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;


  const fechaInicio = new Date();
  const fechaFinalizacion = new Date( fechaInicio.getTime() + 15 * 24 * 60 * 60 * 1000)

  try {
    const nuevosDatos = {
      fechaInicio,
      fechaFinalizacion
    };

    if (titulo) nuevosDatos.titulo = titulo;
    if (descripcion) nuevosDatos.descripcion = descripcion;

    const actualizaciónSolicitudServicio = await actualizarSolicitudServicio(
      nuevosDatos,
      id
    );

    res.json(actualizaciónSolicitudServicio)

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la solicitud" });
  }
};
