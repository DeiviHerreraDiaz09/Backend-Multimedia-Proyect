import { conexionBD } from "../config/conexion.js";

export const registrarBannerService = async (banner) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.execute(
    "INSERT INTO banner(posicion, nombreBanner, nombreArchivo) VALUES (?,?,?)",
    [banner.posicion, banner.nombreBanner, banner.nombreArchivo]
  );
  return resultado;
};

export const obtenerBannersServicio = async () => {
  const conexion = await conexionBD();
  const [banners, campos] = await conexion.query("SELECT * FROM banner");
  conexion.release();
  return banners;
};
