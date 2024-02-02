import express, { json, urlencoded } from "express";
import { dirnamePath } from "./src/helper/__dirname__.js";
import { join } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
// Importaciones Locales
import routerUsuarios from "./src/routes/usuarios.routes.js";
import routerSolicitud from "./src/routes/solicitud.routes.js";
import routerCategoria from "./src/routes/categoria.routes.js";
import routerContenidoMultimedia from "./src/routes/contenidoMultimedia.routes.js";
import routerListasReproduccion from "./src/routes/listasReproduccion.routes.js";
const app = express();
const PORT = 3000;
// Configuración
app.set("view engine", "ejs"); // Motor de plantillas
app.set("views", join(dirnamePath, "/views")); // configuración ubicación de las vistas
app.use(express.static(join(dirnamePath, "/public"))); //configuración de archivos estaticos css,js,img...
app.use(urlencoded({ extended: true })); //configuración para recibir los datos de los formularios
console.log(join(dirnamePath, "../node_modules/sweetalert2/dist"));
app.use(
  "/sweetalert2",
  express.static(join(dirnamePath, "../node_modules/sweetalert2/dist"))
);
// Configuración cookie
app.use(cookieParser());
// Configuración sesión
app.use(
  session({
    secret: "fa3c7448dd72d349acbd0e44cff39f73e6646a863309a245a85c3cf303181abd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días en milisegundos
      secure: false, // Cambiar a true en un entorno de producción con HTTPS
      httpOnly: true,
    },
  })
);
app.get("/", (req, res) => {
  res.render("index", { correo: undefined });
});
app.use(routerUsuarios);
app.use(routerSolicitud);
app.use(routerCategoria);
app.use(routerContenidoMultimedia);
app.use(routerListasReproduccion);
app.listen(PORT, () => console.log(`Server app in port ${PORT}!✨`));
