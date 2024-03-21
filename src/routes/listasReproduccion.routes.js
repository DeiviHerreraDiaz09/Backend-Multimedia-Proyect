import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import {
  crearListaReproduccion,
  formularioListaReproduccion,
  listarListasReproduccion,
  añadirContenidoMul
} from "../controller/listaReproduccionController.js";
const router = Router();

router.get("/", listarListasReproduccion);
router.get("/", formularioListaReproduccion);
router.post("/", crearListaReproduccion);
router.post("/addContenido", añadirContenidoMul);

export default router;
