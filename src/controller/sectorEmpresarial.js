import createHttpError from "http-errors";
import { mensajeError } from "../helper/manejadorMensajes.js";
import { obtenerSectorEmpresarialServicio } from "../services/sentorEmpresarialServicio.js";
import { crearEmpresaServicio } from "../services/empresaServicio.js";

export const obtenerSectorEmpresarial = async (req, res) => {
  try {
    const sectores = await obtenerSectorEmpresarialServicio();
    res.status(200).json(sectores);
  } catch (error) {
    mensajeError(error, res);
  }
};

export const crearEmpresa = async (req, res) => {
  try {
    const empresa = req.body;
    const empresaCreada = await crearEmpresaServicio(
        empresa
    );
    res.status(200).json(empresaCreada);
  } catch (error) {
    console.log(error);
    mensajeError(error, res);
  }
};
