import { conexionBD } from "../config/conexion.js";

export const obtenerContenidoMulServicio = async () => {
  const conexion = await conexionBD();
  const [contenidos, campos] = await conexion.query(
    "SELECT * FROM contenido_multimedia"
  );
  conexion.release();
  return contenidos;
};

export const registrarContenidoMultimedia = async (contenidoMul) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.execute(
    "INSERT INTO contenido_multimedia(nombre, archivo, tipo, genero_fk, categoria_fk) VALUES (?,?,?,?,?)",
    [
      contenidoMul.nombre,
      contenidoMul.archivo,
      contenidoMul.tipo,
      contenidoMul.genero_fk,
      contenidoMul.categoria_fk,
    ]
  );
  return resultado;
};
