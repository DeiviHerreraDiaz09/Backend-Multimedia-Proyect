import { obtenerCategerias } from "../services/categoriaService.js";

export const formularioMultimediaContenido = async (req, res) => {
  try {
    const categorias = await obtenerCategerias();
    res.render("./contenidoMultimedia/formularioContenidoMultimedia", {
      categorias,
    });
  } catch (error) {
    res.render("index", { mensaje: error.message });
  }
};
