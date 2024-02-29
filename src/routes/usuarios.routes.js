import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  actualizarUsuario,
  adquirirPaqueteUsuario,
  paqueteUsuario,
} from "../controller/usuarioController.js";
const router = Router();

// Apartado usuarios

router.get("/", listarUsuarios);
router.get("/:id", listarUsuario);
router.get("/:id/paquete", paqueteUsuario);
router.post("/", registrarUsuarios);
router.patch("/:id", actualizarUsuario);
router.post("/paquete", adquirirPaqueteUsuario);

export default router;
