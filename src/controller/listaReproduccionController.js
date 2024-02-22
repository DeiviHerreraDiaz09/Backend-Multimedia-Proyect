import {
  crearListaReproduccionServicio,
  obtenerListasReproduccionServicio,
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
    res.json(response)
  } catch (error) {
    console.log(error);
  }
};
