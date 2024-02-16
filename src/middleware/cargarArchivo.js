import multer, { diskStorage } from "multer";
import { join } from "path";
import { dirnamePath } from "../helper/__dirname__.js";
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(dirnamePath, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
export const GuardarArchivoAlCargar = multer({storage:storage}).single("archivo");
