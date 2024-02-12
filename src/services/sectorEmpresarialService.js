import { conexionBD } from "../config/conexion.js";

export const obtenerSectorEmpresarialServicio = async () => {
  const conexion = await conexionBD();
  const [sectorEmpresarial, campos] = await conexion.query(
    "SELECT * FROM sector_empresarial"
  );
  conexion.release();
  return sectorEmpresarial;
};
