import { obtenerRespuestasServicio } from "../services/respuestaService.js";

export const listarRespuestas = async (req, res) => {
  try {
    const respuestas = await obtenerRespuestasServicio();
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};


