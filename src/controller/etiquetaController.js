import { obtenerEtiquetasServicio } from "../services/etiquetaService.js"

export const listarEtiquetas = async (req, res) => {
    try {
        const etiquetas = await obtenerEtiquetasServicio();
        res.status(200).json(etiquetas);
    } catch (error) {
        res.status(500).json("error")
    }
}

