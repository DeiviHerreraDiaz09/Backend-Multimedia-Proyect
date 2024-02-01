import { crearListaReproduccionServicio, obtenerListasReproduccionServicio } from "../services/listaReproduccionServicio.js";
import { obtenerClientesServicio } from "../services/usuariosservicio.js";

export const listarListasReproduccion = async (req, res) => {
    try {
        const listas = await obtenerListasReproduccionServicio();
        res.render("./listaReproduccion/listarListasReproduccion", { listas });
    } catch (error) {

    }
}

export const formularioListaReproduccion = async (req, res) => {
    try {
       const usuarios = await obtenerClientesServicio() 
       res.render("./listaReproduccion/formularioListaReproduccion", { usuarios });
    } catch (error) {
        console.log(error);
    }
}
export const crearListaReproduccion = async (req, res) => {
    try {
        const {usuario, nombre} = req.body
        await crearListaReproduccionServicio({usuario, nombre})
        res.redirect("/listasReproduccion")
    } catch (error) {
        console.log(error);
    }
}