import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  actualizarUsuarioPath,
} from "../controller/usuarioController.js";
const router = Router();

// Apartado usuarios
router.get("/", listarUsuarios);
router.get("/:id", listarUsuario);
router.post("/", registrarUsuarios);
router.patch("/:id", actualizarUsuarioPath);

export default router;
