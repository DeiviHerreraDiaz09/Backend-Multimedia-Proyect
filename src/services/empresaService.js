import { conexionBD } from "../config/conexion.js";

export const obtenerEmpresasServicio = async () => {
  const conexion = await conexionBD();
  const [empresas, campos] = await conexion.query("SELECT * FROM empresa");
  conexion.release();
  return empresas;
};

export const obtenerEmpresaServicio = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "SELECT * FROM empresa WHERE id = ?",
    [id]
  );
  conexion.release();

  if (resultado.length > 0) {
    return resultado[0];
  } else {
    return null;
  }
};

export const crearEmpresaServicio = async (empresa) => {
  const conexion = await conexionBD();
  console.log(empresa);
  const [resultado] = await conexion.execute(
    "INSERT INTO empresa (nit, nombre, telefono, direccion, correo, usuario_fk, sector_empresarial_fk) VALUES (?,?,?,?,?,?,?)",
    [
      empresa.nit,
      empresa.nombre,
      empresa.telefono,
      empresa.direccion,
      empresa.correo,
      empresa.usuario_fk,
      empresa.sector_empresarial_fk,
    ]
  );

  const idEmpresaInsertado = resultado.insertId;
  const obtenerEmpresa = await obtenerEmpresaServicio(idEmpresaInsertado);
  conexion.release();
  return obtenerEmpresa;
};

export const actualizarEmpresaServicio = async (empresaUpdate, id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "UPDATE empresa SET ? WHERE id = ?",
    [empresaUpdate, id]
  );
  const empresaActualizado = await obtenerEmpresaServicio(id);
  conexion.release();
  return empresaActualizado;
};
