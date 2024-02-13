import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  actualizarUsuario,
} from "../controller/usuarioController.js";
const router = Router();

// Apartado usuarios

router.get("/", listarUsuarios);
router.get("/:id", listarUsuario);
router.post("/", registrarUsuarios);
router.patch("/:id", actualizarUsuario);

export default router;
