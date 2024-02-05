import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { crearListaReproduccion, formularioListaReproduccion, listarListasReproduccion, listarListasReproduccionDetallada } from "../controller/listaReproduccionController.js";
const router = Router();

router.get('/listasReproduccion', listarListasReproduccion)
router.get('/listasReproduccionDetallada/:id', listarListasReproduccionDetallada)
router.get('/formularioListasReproduccion', formularioListaReproduccion)
router.post('/formularioListasReproduccion', crearListaReproduccion)

export default router;
