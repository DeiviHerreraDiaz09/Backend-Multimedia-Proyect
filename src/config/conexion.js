import { createConnection, createPool } from "mysql2/promise";

export const conexionBD = async () => {
  try {
    const config = {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "proyecto_multimedia",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    const pool = createPool(config);
    const conexion = await pool.getConnection();
    return conexion;
  } catch (error) {
    console.log(error);
    return error;
  }
};
