import { Router } from "express";
import {
  listarUsuarios,
  registrarUsuarios,
  login,
} from "../controller/usuarios.controller.js";
const router = Router();

// Apartado usuarios
router.get("/usuarios", listarUsuarios);
router.post("/usuarios", registrarUsuarios);
router.post("/login", login);

export default router;
