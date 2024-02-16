import { obtenerSoliRespByRespServicio, obtenerSoliRespBySoliServicio, obtenerSoliRespServicio } from "../services/solicitudes_RespuestasService.js"

export const listarSoliRespuestas = async (req, res) => {
  try {
    const response = await obtenerSoliRespServicio();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las respuestas a las solicitudes",
    });
  }
};

// PARA LISTAR LAS RESPUESTAS A UNA DETERMINADA SOLICITUD

export const listarSoliRespuestaBySolicitud = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await obtenerSoliRespBySoliServicio(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la solicitud ",
    });
  }
};

// LISTAR LA SOLICITUD DE UNA DETERMINADA RESPUESTA

export const listarSoliRespuestaByRespuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await obtenerSoliRespByRespServicio(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la respuesta ",
    });
  }
};
