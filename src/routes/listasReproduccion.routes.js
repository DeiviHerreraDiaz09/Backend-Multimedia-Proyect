import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { crearListaReproduccion, formularioListaReproduccion, listarListasReproduccion } from "../controller/listaReproduccionController.js";
const router = Router();

router.get('/listasReproduccion', listarListasReproduccion)
router.get('/formularioListasReproduccion', formularioListaReproduccion)
router.post('/listasReproduccion', crearListaReproduccion)

export default router;
