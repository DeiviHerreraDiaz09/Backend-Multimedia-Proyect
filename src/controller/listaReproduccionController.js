import {
  crearListaReproduccionServicio,
  obtenerListasReproduccionServicio, añadirContenidoMultimedia
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
export const añadirContenidoMul = async (req, res) =>{
  const { orden, lista_reproduccion_fk, contenido_multimedia_fk } = req.body
  try {

    const response = await añadirContenidoMultimedia({orden, lista_reproduccion_fk, contenido_multimedia_fk}) 

    if (!response){
      return res.status(400).send("Error al intentar la inserción del contenido multimedia en la lista de reproducción");
    }

    res.status(200).json(response);


  } catch (error) {
    console.log(error);
  }

}
