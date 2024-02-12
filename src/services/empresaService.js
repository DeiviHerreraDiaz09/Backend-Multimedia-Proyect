import { conexionBD } from "../config/conexion.js";

export const crearEmpresaServicio = async (empresa) => {
  console.log(empresa);
  const conexion = await conexionBD();
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO empresa(nit, nombre, telefono, direccion, correo, usuario_fk,sector_empresarial_fk) VALUES (?,?,?,?,?,?,?)",
    [
      empresa.nit,
      empresa.nombre,
      empresa.telefono,
      empresa.direccion,
      empresa.correo,
      1,
      empresa.sectorEmpresarial,
    ]
  );
  conexion.release();
  return datosUsuario.length ? datosUsuario[0] : null;
};
