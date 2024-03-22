import {
  registrarContenidoMultimedia,
  obtenerContenidoMulServicio,
} from "../services/contenidoMultimediaService.js";

export const listarContenidoMultimedia = async (req, res) => {
  try {
    const contenido = await obtenerContenidoMulServicio();

    res.json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el contenido multimedia" });
  }
};

export const registrarContenido = async (req, res) => {
  try {
    let archivoNombre;

    if (req.file) {
      archivoNombre = req.file.filename;
    } else {
      archivoNombre = undefined;
    }

    const { nombre, tipo, genero, categoria } = req.body;

    const data = {
      nombre,
      archivo: archivoNombre,
      tipo,
      genero_fk: genero,
      categoria_fk: categoria,
    };

    const response = await registrarContenidoMultimedia(data);

    if (!response) {
      return res
        .status(400)
        .send("Error al intentar la inserción del contenido multimedia");
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};
