import express, { json, urlencoded } from "express";
import { dirnamePath } from "./src/helper/__dirname__.js";
import { join } from "path";
import session from "express-session";
// Importaciones Locales
import routerUsuarios from "./src/routes/usuarios.routes.js";
import routerSolicitud from "./src/routes/solicitud.routes.js";
import routerCategoria from "./src/routes/categoria.routes.js";
import routerContenidoMultimedia from "./src/routes/contenidoMultimedia.routes.js";
import routerListasReproduccion from "./src/routes/listasReproduccion.routes.js";

const app = express();
const PORT = 3000;

// Configuración
app.set("view engine", "ejs");
app.set(json());

// Establecer ubicación de directorio de las vistas
app.set("views", join(dirnamePath, "/views"));

// Establecer ubicación archivos estaticos
app.use(express.static(join(dirnamePath, "/public")));


app.use(urlencoded({ extended: true }));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
}))

app.get("/", (req,res)=>{
    res.render("index", {correo:undefined})
});



app.use(routerUsuarios)
app.use(routerSolicitud)
app.use(routerCategoria)
app.use(routerContenidoMultimedia)
app.use(routerListasReproduccion)
app.listen(PORT, () => console.log(`Server app in port ${PORT}!✨`));
