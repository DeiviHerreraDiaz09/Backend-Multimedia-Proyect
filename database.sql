-- Active: 1706698485618@@127.0.0.1@3306@proyecto_multimedia
-- Active: 1706656616538@@127.0.0.1@3306@proyecto_multimedia
CREATE TABLE IF NOT EXISTS usuarios(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS respuestas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mensaje TEXT NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS listaReproduccion(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    usuario_fk INT NOT NULL
);

CREATE TABLE IF NOT EXISTS contenidosmultimedia(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    archivo VARCHAR(150) NOT NULL,
    categoria_fk INT 
);

CREATE TABLE IF NOT EXISTS opciones(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    respuesta_fk int,
    contenidoMultimedia int
);

CREATE Table IF NOT EXISTS listaR_contenidoM(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    listaReproduccion_fk INT ,
    contenidoMultimedia_fk INT 
);

CREATE Table IF NOT EXISTS solicitudes(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo  VARCHAR(40),
    descripcion  TEXT,
    duracion  VARCHAR(50),
    fechaInicio  DATETIME,
    fechaFinalizacion DATETIME,
    estado VARCHAR(20) DEFAULT "pendiente",
    usuario_fk int,
    categoria_fk int 
);

CREATE Table IF NOT EXISTS solicitudes_respuestas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    solicitud_fk int,
    respuesta_fk int 
);

----------------------------------------------------------------

ALTER TABLE solicitudes
ADD CONSTRAINT categorias_pk_solicitud_fk
FOREIGN KEY (categoria_fk) 
REFERENCES categorias(id);

ALTER TABLE solicitudes
ADD CONSTRAINT usuarios_pk_solicitud_fk
FOREIGN KEY (usuario_fk) 
REFERENCES usuarios(id);

ALTER TABLE listareproduccion
ADD CONSTRAINT usuarios_pk_listafavoritos_fk
FOREIGN KEY (usuario_fk) 
REFERENCES usuarios(id);

ALTER TABLE contenidosmultimedia
ADD CONSTRAINT categorias_pk_contenidoMultimedia_fk
FOREIGN KEY (categoria_fk) 
REFERENCES categorias(id);

ALTER TABLE solicitudes_respuestas
ADD CONSTRAINT solicitud_pk_solicitudes_respuestas_fk
FOREIGN KEY (solicitud_fk) 
REFERENCES solicitudes(id);

ALTER TABLE solicitudes_respuestas
ADD CONSTRAINT respuestas_pk_solicitudes_respuestas_fk
FOREIGN KEY (respuesta_fk) 
REFERENCES respuestas(id);

ALTER TABLE listar_contenidom
ADD CONSTRAINT listafavoritos_pk_listar_contenidom_fk
FOREIGN KEY (listaReproduccion_fk) 
REFERENCES listareproduccion(id);

ALTER TABLE listar_contenidom
ADD CONSTRAINT contenidosmultimedia_pk_listar_contenidom_fk
FOREIGN KEY (contenidoMultimedia_fk) 
REFERENCES contenidosmultimedia(id);
