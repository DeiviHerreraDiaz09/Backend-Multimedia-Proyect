import { Router } from "express";
import {
  listarEmpresas,
  listarEmpresa,
  registrarEmpresa,
  actualizarEmpresa,
} from "../controller/empresaController.js";
const router = Router();

// Apartado empresa

router.get("/", listarEmpresas);
router.get("/:id", listarEmpresa);
router.post("/", registrarEmpresa);
router.patch("/:id", actualizarEmpresa);

export default router;
