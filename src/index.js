import express, { json, urlencoded } from "express";
import cors from "cors";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerSolicitud from "./routes/solicitud.routes.js";
import routerCategoria from "./routes/categoria.routes.js";
import routerListasReproduccion from "./routes/listasReproduccion.routes.js";
import routerSectorEmpresarial from "./routes/sectorEmpresarial.routes.js";
import routerRespuesta from "./routes/respuesta.routes.js";
import routerEmpresa from "./routes/empresa.routes.js";
import routerContenidoMultimedia from "./routes/contenidoMultimedia.routes.js";
import routerAuth from "./routes/auth.routes.js";
import { dirnamePath } from "./helper/__dirname__.js";
import { join } from "path";
import session from "express-session";
import routerEtiquetas from "./routes/etiquetas.routes.js";
import routerPaquete from "./routes/paquete.routes.js";
import routerBanner from "./routes/banner.routes.js";

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
app.use(`${prefix}/respuesta`, routerRespuesta); 
app.use(`${prefix}/categoria`, routerCategoria);

app.use(`${prefix}/contenido`, routerContenidoMultimedia);
app.use(`${prefix}/etiqueta`, routerEtiquetas);
app.use(`${prefix}/banner`, routerBanner);
app.use(`${prefix}/paquete`, routerPaquete);
app.use(`${prefix}/listas-reproduccion`, routerListasReproduccion);
app.use(`${prefix}/empresa`, routerEmpresa); 
app.use(`${prefix}/sector-empresarial`, routerSectorEmpresarial); // CRUD REALIZADA
app.use(`${prefix}/auth`, routerAuth);

app.listen(PORT, () => console.log(`Server app in port ${PORT}!✨`));
