import { Router } from "express";
import {
  listarSectores,
  listarSector,
  registrarSectorEmpresarial,
  actualizarSector,
} from "../controller/sectorEmpresarialController.js";

// Apartado sector empresarial

const router = Router();
router.get("/", listarSectores);
router.get("/:id", listarSector);
router.post("/", registrarSectorEmpresarial);
router.patch("/:id", actualizarSector);
export default router;
