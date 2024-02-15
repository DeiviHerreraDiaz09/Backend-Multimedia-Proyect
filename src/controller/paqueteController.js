import { registrarPaqueteServicio } from "../services/paqueteService.js"

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