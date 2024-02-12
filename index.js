import express, { json, urlencoded } from "express";
import cors from "cors";
import routerUsuarios from "./src/routes/usuarios.routes.js";
import routerSolicitud from "./src/routes/solicitud.routes.js";
import routerCategoria from "./src/routes/categoria.routes.js";
import routerContenidoMultimedia from "./src/routes/contenidoMultimedia.routes.js";
import routerListasReproduccion from "./src/routes/listasReproduccion.routes.js";
import routerSectorEmpresarial from "./src/routes/sectorEmpresarial.routes.js";
import routerAuth from "./src/routes/auth.routes.js";
import { dirnamePath } from "./src/helper/__dirname__.js";
import { join } from "path";
import session from "express-session";

const app = express();
const PORT = 3300;
const prefix = "/api/v1";

// Configuración
app.use(cors());
app.use(json());
app.use(express.static(join(dirnamePath, "/public"))); // configuración de archivos estáticos css, js, img...
app.use(urlencoded({ extended: true })); // configuración para recibir los datos de los formularios

// Configuración de sesión
app.use(
  session({
    secret: "fa3c7448dd72d349acbd0e44cff39f73e6646a863309a245a85c3cf303181abd",
    resave: false,
    saveUninitialized: false,
  })
);

// Rutas definidas con prefijo
app.use(`${prefix}/usuarios`, routerUsuarios);
app.use(`${prefix}/solicitud`, routerSolicitud);
app.use(`${prefix}/categoria`, routerCategoria);
app.use(`${prefix}/contenido-multimedia`, routerContenidoMultimedia);
app.use(`${prefix}/listas-reproduccion`, routerListasReproduccion);
app.use(`${prefix}/sector-empresarial`, routerSectorEmpresarial);
app.use(`${prefix}/auth`, routerAuth);

app.listen(PORT, () => console.log(`Server app in port ${PORT}!✨`));
