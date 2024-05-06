import {
  registrarBannerService,
  obtenerBannersServicio,
} from "../services/bannerService.js";
import fs from "fs";
import path from "path";

export const listarBanner = async (req, res) => {
  try {
  } catch (error) {}
};

export const registrarBanner = async (req, res) => {
  try {
    const { filename } = req.file;
    const banner = req.body;
    Object.assign(banner, { nombreArchivo: filename });
    console.log(banner);
    await registrarBannerService(banner);
    res.send({ banner });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

export const listarBanners = async (req, res) => {
  try {
    const banners = await obtenerBannersServicio();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const mostrarBanners = async (req, res) => {
  try {
    const banners = await obtenerBannersServicio();

    const files = fs.readdirSync("src/uploads"); 

    console.log(files);

    const bannersConImagenes = banners.map((banner) => {
      const { nombre_archivo } = banner;
      const imagenEncontrada = files.find((file) => file === nombre_archivo);

      if (!imagenEncontrada) {
        return res.json({ error: error });
      } else {
       
        const filePath = path.join("src/uploads", imagenEncontrada);
        const fileData = fs.readFileSync(filePath);
        const base64Image = Buffer.from(fileData).toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
      }
    });
    
    res.json(bannersConImagenes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
