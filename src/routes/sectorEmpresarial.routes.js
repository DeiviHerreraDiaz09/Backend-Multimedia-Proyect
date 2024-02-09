import { Router } from "express";
import { crearEmpresa, obtenerSectorEmpresarial } from "../controller/sectorEmpresarial.js";

const router = Router()
router.get('/sectoresEmpresariales',obtenerSectorEmpresarial);
router.post('/sectoresEmpresariales',crearEmpresa);
export default router;