import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import {
  crearListaReproduccion,
  formularioListaReproduccion,
  listarListasReproduccion,
} from "../controller/listaReproduccionController.js";
const router = Router();

router.get("/", listarListasReproduccion);
router.get("/", formularioListaReproduccion);
router.post("/", crearListaReproduccion);

export default router;
