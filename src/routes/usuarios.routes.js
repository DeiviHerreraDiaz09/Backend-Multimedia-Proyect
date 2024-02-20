import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  actualizarUsuario,
  adquirirPaqueteUsuario,
} from "../controller/usuarioController.js";
const router = Router();

// Apartado usuarios

router.get("/", listarUsuarios);
router.get("/:id", listarUsuario);
router.post("/", registrarUsuarios);
router.patch("/:id", actualizarUsuario);
router.post("/paquete", adquirirPaqueteUsuario);

export default router;
