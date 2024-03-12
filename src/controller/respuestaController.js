import {
  obtenerRespuestasServicio,
  obtenerRespuestaServicio,
  crearRespuestaServicio,
  actualizarRespuestaSevicio,
} from "../services/respuestaService.js";

export const listarRespuestas = async (req, res) => {
  try {
    const respuestas = await obtenerRespuestasServicio();
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los respuestas" });
  }
};

export const listarRespuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await obtenerRespuestaServicio(id);
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la respuesta" });
  }
};

export const registrarRepuesta = async (req, res) => {
  const { mensaje } = req.body;
  try {
    const fecha = new Date();
    console.log(fecha);
    const created = await crearRespuestaServicio({ mensaje, fecha });

    res.json(created);
  } catch (error) {
    res.status(500).json({ error: "Error en la creacion del usuario" });
  }
};

export const actualizarRespuesta = async (req, res) => {
  const { mensaje } = req.body;
  const { id } = req.params;

  try {
    const fecha = new Date();
    const nuevosdDatos = { fecha };
    if (mensaje) nuevosdDatos.mensaje = mensaje;
    const actualizaciónRespuestaServicio = await actualizarRespuestaSevicio(
      nuevosdDatos,
      id
    );
    if (!actualizaciónRespuestaServicio)
      return res.json({
        msg: "No se pudo actualizar los datos de la respuesta",
      });
    res.json(actualizaciónRespuestaServicio);
  } catch (error) {
    res.status(500).json({ error: "Error en la actualizacion del usuario" });
  }
};
