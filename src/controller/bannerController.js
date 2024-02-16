import { registrarBannerService } from "../services/bannerService.js";

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
