import express, { json, urlencoded } from "express";
import cors from "cors";
// Importaciones Locales
import routerUsuarios from "./src/routes/usuarios.routes.js";
import routerSolicitud from "./src/routes/solicitud.routes.js";
import routerCategoria from "./src/routes/categoria.routes.js";
import routerContenidoMultimedia from "./src/routes/contenidoMultimedia.routes.js";
import routerListasReproduccion from "./src/routes/listasReproduccion.routes.js";
import { dirnamePath } from "./src/helper/__dirname__.js";
import { join } from "path";
import session from "express-session";
import routerSectorEmpresarial from "./src/routes/sectorEmpresarial.routes.js";

const app = express();
const PORT = 3300;

// Configuración
app.use(cors());
app.use(json())
app.use(express.static(join(dirnamePath, "/public"))); //configuración de archivos estaticos css,js,img...
app.use(urlencoded({ extended: true })); //configuración para recibir los datos de los formularios
// Configuración sesión
app.use(session({
    secret: "fa3c7448dd72d349acbd0e44cff39f73e6646a863309a245a85c3cf303181abd",
    resave: false,
    saveUninitialized: false,
  })
);

// Ruta de inicio
app.get("/", (req, res) => {
  res.render("index", { correo: undefined });
});

// Rutas definidas
app.use(routerUsuarios);
app.use(routerSolicitud);
app.use(routerCategoria);
app.use(routerContenidoMultimedia);
app.use(routerListasReproduccion);
app.use(routerSectorEmpresarial);

app.listen(PORT, () => console.log(`Server app in port ${PORT}!✨`));
