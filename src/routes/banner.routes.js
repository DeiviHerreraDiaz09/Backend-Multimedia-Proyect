import { Router } from "express";
import { registrarBanner, listarBanners, mostrarBanners } from "../controller/bannerController.js";
import { guardarArchivoAlCargar } from "../middleware/cargarArchivo.js";

const router = Router();

// Apartado banner

router.get("/", mostrarBanners);
router.get("/infobBanners", listarBanners);
// router.get("/:id", listarEmpresa);
router.post("/", guardarArchivoAlCargar,registrarBanner);
// router.patch("/:id", actualizarEmpresa);

export default router;

