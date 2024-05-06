import {
  crearListaReproduccionServicio,
  obtenerListasReproduccionServicio,
  añadirContenidoMultimedia,
  obtenerContenidoUltimoOrden,
} from "../services/listaReproduccionService.js";
import { obtenerClientesServicio } from "../services/usuarioService.js";

export const listarListasReproduccion = async (req, res) => {
  try {
    const listas = await obtenerListasReproduccionServicio();
    res.render("./listaReproduccion/listarListasReproduccion", { listas });
  } catch (error) {}
};

export const formularioListaReproduccion = async (req, res) => {
  try {
    const usuarios = await obtenerClientesServicio();
    res.render("./listaReproduccion/formularioListaReproduccion", { usuarios });
  } catch (error) {
    console.log(error);
  }
};

export const crearListaReproduccion = async (req, res) => {
  try {
    const data = req.body;
    const response = await crearListaReproduccionServicio(data);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const añadirContenidoMul = async (req, res) => {
  const { lista_reproduccion_fk, contenido_multimedia_fk } = req.body;
  try {
    const contenidoEnLista = await obtenerContenidoUltimoOrden(
      lista_reproduccion_fk
    );
    let nuevoOrden = 1;

    if (contenidoEnLista) {
      nuevoOrden = contenidoEnLista.orden + 1;
    }

    const response = await añadirContenidoMultimedia({
      orden: nuevoOrden,
      lista_reproduccion_fk,
      contenido_multimedia_fk,
    });

    if (!response) {
      return res
        .status(400)
        .send(
          "Error al intentar la inserción del contenido multimedia en la lista de reproducción"
        );
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};