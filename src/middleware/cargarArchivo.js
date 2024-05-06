import multer, { diskStorage } from "multer";
import { extname, join } from "path";
import { dirnamePath } from "../helper/__dirname__.js";
import { generarCodigoAleatorio } from "../helper/encriptacion.js";

function generarNombreDeArchivo(req, file, cb) {
  const SERIALCARACTERES = generarCodigoAleatorio(10);
  cb(null, file.fieldname + "-" + SERIALCARACTERES + extname(file.originalname));
}


const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(dirnamePath, "uploads"));
  },
  filename: function (req, file, cb) {
    const SERIALCARACTERES = generarCodigoAleatorio(10);
    cb(
      null,
      file.fieldname + "-" + SERIALCARACTERES + extname(file.originalname)
    );
  },
});
const avatarsStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(dirnamePath, "uploads", "avatars"));
  },
  filename: generarNombreDeArchivo,
});

export const guardarArchivoAlCargar = multer({storage:storage}).single("archivo");
export const guardarAvatarAlCargar = multer({ storage: avatarsStorage }).single("avatar");