import { conexionBD } from "../config/conexion.js";

export const obtenerSectoresEmpresarialesServicio = async () => {
  const conexion = await conexionBD();
  const [sectorEmpresarial, campos] = await conexion.query(
    "SELECT * FROM sector_empresarial"
  );
  conexion.release();
  return sectorEmpresarial;
};

export const obtenerSectorEmpresarialServicio = async (id) => {
  const conexion = await conexionBD();
  const [sectorEmpresarial] = await conexion.query(
    "SELECT * FROM sector_empresarial where id = ?",
    [id]
  );
  conexion.release();

  if (sectorEmpresarial.length > 0) {
    return sectorEmpresarial[0];
  } else {
    return null;
  }
};

export const crearSectoresEmpresarialesServicio = async (nombre) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "INSERT INTO sector_empresarial (nombre) values (?)",
    [nombre]
  );
  const idSectorInsertado = resultado.insertId;
  const obtenerSector = await obtenerSectorEmpresarialServicio(
    idSectorInsertado
  );
  conexion.release();
  return obtenerSector;
};

export const actualizarSectorServicio = async (nombre, id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "UPDATE sector_empresarial SET nombre = ? WHERE id = ?",
    [nombre, id]
  );
  const sectorActualizado = await obtenerSectorEmpresarialServicio(id);
  console.log("SECTOR ACTUALIZADO " + sectorActualizado);
  conexion.release();
  return sectorActualizado;
};
