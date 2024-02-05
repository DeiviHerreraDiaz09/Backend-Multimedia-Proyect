import multer from "multer";
import { dirnamePath } from "../helper/__dirname__.js";
import { join } from "path";

const RUTAGUARDADO = dirnamePath;

export const guardarArchivo = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(join(RUTAGUARDADO, "/uploads"));
    cb(null, join(RUTAGUARDADO, "/uploads"));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const cargarArchivo = multer({storage:guardarArchivo}).single("archivo");
