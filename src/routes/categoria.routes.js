import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import {
  formularioCategoria,
  listarCategorias,
} from "../controller/categoriaController.js";
const router = Router();

router.get("/categorias", listarCategorias);
router.get("/formularioCategoria", formularioCategoria);
// router.post('/sol', registrarUsuarios)
// router.post('/login',login)

export default router;
