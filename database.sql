DROP DATABASE IF EXISTS proyecto_multimedia;

CREATE DATABASE IF NOT EXISTS proyecto_multimedia;

USE proyecto_multimedia;

CREATE TABLE IF NOT EXISTS usuario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(50),
    correo VARCHAR(50) NOT NULL,
    foto VARCHAR(50),
    administrador_asignado int NULL,
    clave VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT 1,
    primer_cambio_clave BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS empresa (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nit VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(50),
    direccion VARCHAR(50) NOT NULL,
    fecha_aniversario DATE,
    usuario_fk INT,
    sector_empresarial_fk INT
);

CREATE TABLE IF NOT EXISTS sector_empresarial (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE Table IF NOT EXISTS solicitud(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo  VARCHAR(40),
    descripcion  TEXT,
    fecha_inicio  DATETIME,
    fecha_finalizacion DATETIME,
    estado VARCHAR(20) DEFAULT "pendiente",
    usuario_fk int
);

CREATE TABLE IF NOT EXISTS paquete(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    limite_canciones INT,
    limite_promociones INT,
    limite_jingles INT,
    numero_enlaces INT,
    precio INT,
    etiqueta_fk INT,
    dias_vigencia INT
);

CREATE TABLE IF NOT EXISTS usuario_paquete(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME,
    fecha_finalizacion DATETIME,
    usuario_fk INT,
    paquete_fk INT
);

CREATE TABLE IF NOT EXISTS etiqueta(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS lista_reproduccion(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    genero_fk int
);

CREATE TABLE IF NOT EXISTS contenido_multimedia (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    archivo VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    genero_fk int,
    categoria_fk int 
);

CREATE TABLE IF NOT EXISTS lista_contenido(
    id int AUTO_INCREMENT PRIMARY KEY,
    orden int,
    lista_reproduccion_fk int,
    contenido_multimedia_fk int
);

CREATE TABLE IF NOT EXISTS genero (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NULL, 
    tipo VARCHAR(20) NULL
);

CREATE TABLE IF NOT EXISTS categoria (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL, 
    estado BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS paquete_lista (
    id int AUTO_INCREMENT PRIMARY KEY,
    enlace VARCHAR(50) NOT NULL,
    paquete_fk int,
    lista_reproduccion_fk int
);

CREATE TABLE IF NOT EXISTS respuesta (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mensaje TEXT NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS solicitud_respuesta(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    solicitud_fk int,
    respuesta_fk int
);

CREATE TABLE IF NOT EXISTS banner(
	id int PRIMARY KEY AUTO_INCREMENT,
    posicion int not null,
    nombre_banner varchar(50),
    nombre_archivo varchar(100)
);

ALTER TABLE empresa
ADD CONSTRAINT sector_empresarial_empresa_fk
FOREIGN KEY (sector_empresarial_fk)
REFERENCES sector_empresarial(id);

ALTER TABLE empresa
ADD CONSTRAINT usuario_empresa_fk
FOREIGN KEY (usuario_fk)
REFERENCES usuario(id);

ALTER TABLE solicitud
ADD CONSTRAINT usuario_solicitud
FOREIGN KEY (usuario_fk) 
REFERENCES usuario(id);

ALTER TABLE usuario_paquete
ADD CONSTRAINT usuario_pk_usuario_paquete_fk
FOREIGN KEY (usuario_fk) 
REFERENCES usuario(id);

ALTER TABLE usuario_paquete
ADD CONSTRAINT paquete_pk_usuario_paquete_fk
FOREIGN KEY (paquete_fk) 
REFERENCES paquete(id);

ALTER TABLE paquete
ADD CONSTRAINT etiqueta_pk_paquete_fk
FOREIGN KEY (etiqueta_fk) 
REFERENCES etiqueta(id);

ALTER TABLE paquete_lista
ADD CONSTRAINT paquete_pk_paquete_lista_fk
FOREIGN KEY (paquete_fk) 
REFERENCES paquete(id);

ALTER TABLE paquete_lista
ADD CONSTRAINT lista_reproduccion_pk_paquete_lista_fk
FOREIGN KEY (lista_reproduccion_fk) 
REFERENCES lista_reproduccion(id);

ALTER TABLE lista_contenido
ADD CONSTRAINT lista_reproduccion_pk_paquete_lista
FOREIGN KEY (lista_reproduccion_fk) 
REFERENCES lista_reproduccion(id);

ALTER TABLE lista_contenido
ADD CONSTRAINT lista_reproduccion_pk_lista_contenido_fk
FOREIGN KEY (contenido_multimedia_fk) 
REFERENCES contenido_multimedia(id);

ALTER TABLE contenido_multimedia
ADD CONSTRAINT genero_fk_contenido_multimedia_fk
FOREIGN KEY (genero_fk) 
REFERENCES genero(id);

ALTER TABLE contenido_multimedia
ADD CONSTRAINT categoria_fk_contenido_multimedia_fk
FOREIGN KEY (categoria_fk) 
REFERENCES categoria(id);

ALTER TABLE lista_reproduccion
ADD CONSTRAINT genero_fk_pk_lista_reproduccion_fk
FOREIGN KEY (genero_fk)
REFERENCES genero(id);

-- Inserciones
INSERT INTO sector_empresarial (nombre) VALUES
('Tecnología de la información'),
('Servicios financieros'),
('Salud y atención médica'),
('Educación'),
('Bienes raíces y construcción'),
('Manufactura'),
('Agricultura y agroindustria'),
('Alimentos y bebidas'),
('Energía y recursos naturales'),
('Transporte y logística'),
('Comercio minorista y ventas al por menor'),
('Medios de comunicación y entretenimiento'),
('Turismo y hospitalidad'),
('Servicios profesionales'),
('Telecomunicaciones'),
('Biotecnología y farmacéutica'),
('Automotriz'),
('Moda y textil'),
('Medio ambiente y sostenibilidad'),
('Servicios públicos');

INSERT INTO etiqueta (nombre) VALUES
('Prueba gratuita'),
('Lo más vendido'),
('Oferta especial'),
('Descuento exclusivo'),
('Nuevo'),
('Popular'),
('Destacado'),
('Edición limitada'),
('Últimas unidades'),
('Producto destacado'),
('Recomendado'),
('Exclusivo en línea'),
('Envío gratis'),
('Bestseller'),
('Oferta relámpago'),
('Producto del mes'),
('Compra ahora'),
('Promoción única'),
('Rebaja de temporada'),
('¡No te lo pierdas!');

INSERT INTO empresa (nit, nombre, telefono, direccion, fecha_aniversario) 
VALUES 
('123456789', 'Empresa A', '1234567890', 'Calle 123, Ciudad A', '2023-05-15'),
('987654321', 'Empresa B', '0987654321', 'Avenida B, Ciudad B', '2023-06-20'),
('567890123', 'Empresa C', '5678901234', 'Carrera C, Ciudad C', '2023-07-25'),
('246813579', 'Empresa D', '2468135790', 'Diagonal D, Ciudad D', NULL),
('135792468', 'Empresa E', NULL, 'Eje E, Ciudad E', '2023-08-30'),
('314159265', 'Empresa F', '3141592653', 'Federico F, Ciudad F', '2023-09-05'),
('112233445', 'Empresa G', NULL, 'Giraldo G, Ciudad G', NULL),
('998877665', 'Empresa H', '9988776655', 'Herrera H, Ciudad H', '2023-10-10'),
('556677889', 'Empresa I', '5566778899', 'Iglesia I, Ciudad I', '2023-11-15'),
('778899001', 'Empresa J', NULL, 'Julieta J, Ciudad J', '2023-12-20');

INSERT INTO genero (nombre, descripcion, tipo) 
VALUES 
('Navideño', 'Disfruta la navidad', "Navidad");

INSERT INTO categoria (nombre) 
VALUES 
("Jingle"), 
("Canción");

INSERT INTO `lista_reproduccion` (`id`, `nombre`, `descripcion`, `genero_fk`) VALUES (NULL, 'MIX NAVIDAD', 'La mejor lista de reproduccion para tu diciembre', '1');