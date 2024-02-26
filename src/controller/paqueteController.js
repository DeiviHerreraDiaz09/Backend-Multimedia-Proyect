import { listarPaquetesServicio, obtenerPaquetePorId, registrarPaqueteServicio } from "../services/paqueteService.js"

export const listarPaquetes = async(req, res) => {
    try {
        const response = await listarPaquetesServicio();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const registrarPaquete = async (req, res) => {
    try {
        const paquete = req.body;
        const response = await registrarPaqueteServicio(paquete);
        console.log(response);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const paqueteId = async (req, res) => {
    try {
        const id = req.params.id;
        const paquete = await obtenerPaquetePorId(id);
        console.log(paquete);
        res.json(paquete);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}