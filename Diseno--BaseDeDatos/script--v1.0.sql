

-- Borrar los datos de las tablas
--DELETE FROM detalle_movimiento;
--DELETE FROM movimiento;
--DELETE FROM usuario;
--DELETE FROM rol_permiso;
--DELETE FROM rol;
--DELETE FROM permiso;
--DELETE FROM lote;
--DELETE FROM medicamento;
--DELETE FROM laboratorio;
--DELETE FROM servicio;
--DELETE FROM tipo_movimiento;

--drop table detalle_movimiento;
--drop table movimiento;
--drop table usuario;
--drop table rol_permiso;
--drop table rol;
--drop table permiso;
--drop table lote;
--drop table medicamento;
--drop table laboratorio;
--drop table servicio;
--drop table tipo_movimiento;


create table laboratorio
(
cod_laboratorio smallint not null primary key,
nombre varchar(100) unique,
descripcion varchar(255)
)
go

create table medicamento
(
cod_medicamento smallint not null,
cod_laboratorio smallint not null,
nombre varchar(100),  --Ver de que sea unico este atributo
observacion varchar(255),
constraint PK_medicamento primary key(cod_medicamento, cod_laboratorio),
constraint FK_medicamento_cod_laboratorio foreign key(cod_laboratorio) references laboratorio(cod_laboratorio)
)
go

create table lote
(
cod_lote smallint not null,
cod_medicamento smallint not null,
cod_laboratorio smallint not null,
fehca_vencimiento date not null,
cantidad int not null,
constraint PK_lote primary key(cod_lote, cod_medicamento, cod_laboratorio),
constraint FK_lote_cod_medicamento_cod_laboratorio foreign key(cod_medicamento, cod_laboratorio) references medicamento(cod_medicamento, cod_laboratorio),
constraint CK_lote_cantidad check(cantidad>=0)
)
go

create table permiso
(
cod_permiso smallint not null identity(1,1) primary key,
nombre varchar(100) not null unique,
descripcion varchar(100) not null
)
go

create table rol
(
cod_rol smallint not null identity(1,1) primary key,
nombre varchar(100) not null unique,
descripcion varchar(100) not null
)
go

create table rol_permiso
(
cod_rol smallint not null,
cod_permiso smallint not null,
constraint PK_rol_permiso primary key(cod_rol, cod_permiso),
constraint FK_rol_permiso_cod_rol foreign key(cod_rol) references rol(cod_rol),
constraint FK_rol_permiso_cod_permiso foreign key(cod_permiso) references permiso(cod_permiso)
)
go

create table usuario
(
cod_usuario smallint not null identity(1,1) primary key,
nombre varchar(45) not null,
apellido varchar(45) not null,
email varchar(100) not null unique,
constrasena varchar(50) not null,
cod_rol smallint not null,
constraint FK_usuario_cod_rol foreign key(cod_rol) references rol(cod_rol)
)
go

create table servicio
(
cod_servicio smallint not null identity(1,1) primary key,
nombre varchar(100) not null unique,
detalle varchar(200)
)
go

create table tipo_movimiento
(
cod_tipo_movimiento smallint not null identity(1,1) primary key,
nombre varchar(100) not null unique,
detalle varchar(200)
)
go

create table movimiento
(
cod_movimiento int not null identity(1,1) primary key,
cod_usuario smallint not null,
cod_tipo_movimiento smallint not null,
cod_servicio smallint not null,
fecha_hora_movimiento datetime not null,
descripcion varchar(255),

constraint FK_movimiento_cod_usuario foreign key(cod_usuario) references usuario(cod_usuario),
constraint FK_movimiento_cod_tipo_movimeinto foreign key(cod_tipo_movimiento) references tipo_movimiento(cod_tipo_movimiento),
constraint FK_movimiento_cod_servicio foreign key(cod_servicio) references servicio(cod_servicio)
)
go

create table detalle_movimiento
(
cod_movimiento int not null,
cod_lote smallint not null,
cod_medicamento smallint not null,
cod_laboratorio smallint not null,
cantidad smallint not null,

constraint PK_detalle_movimiento primary key(cod_movimiento, cod_lote, cod_medicamento, cod_laboratorio),
constraint FK_detalle_movimiento_lote_medicamento_laboratorio foreign key(cod_lote, cod_medicamento, cod_laboratorio) references lote(cod_lote, cod_medicamento, cod_laboratorio),
constraint CK_detalle_movimiento_cantidad check(cantidad>=0)
)
go

-- Insertar datos en laboratorio
INSERT INTO laboratorio (cod_laboratorio, nombre, descripcion)
VALUES 
(1, 'Laboratorio A', 'Descripción del Laboratorio A'),
(2, 'Laboratorio B', 'Descripción del Laboratorio B'),
(3, 'Laboratorio C', 'Descripción del Laboratorio C'),
(4, 'Laboratorio D', 'Descripción del Laboratorio D');
GO

-- Insertar datos en medicamento
INSERT INTO medicamento (cod_medicamento, cod_laboratorio, nombre, observacion)
VALUES 
(1, 1, 'Medicamento A', 'Observación sobre Medicamento A'),
(2, 2, 'Medicamento B', 'Observación sobre Medicamento B'),
(3, 3, 'Medicamento C', 'Observación sobre Medicamento C'),
(1, 4, 'Medicamento X', 'Observación sobre Medicamento X');
GO

-- Insertar datos en lote
INSERT INTO lote (cod_lote, cod_medicamento, cod_laboratorio, fehca_vencimiento, cantidad)
VALUES 
(1, 1, 1, '2024-12-31', 100),
(2, 2, 2, '2025-06-30', 150),
(3, 3, 3, '2023-09-15', 200),
(4, 1, 4, '2024-11-30', 120);
GO

-- Insertar datos en permiso
INSERT INTO permiso (nombre, descripcion)
VALUES 
('Permiso A', 'Descripción del Permiso A'),
('Permiso B', 'Descripción del Permiso B'),
('Permiso C', 'Descripción del Permiso C');
GO

-- Insertar datos en rol
INSERT INTO rol (nombre, descripcion)
VALUES 
('Rol A', 'Descripción del Rol A'),
('Rol B', 'Descripción del Rol B'),
('Rol C', 'Descripción del Rol C');
GO

-- Insertar datos en rol_permiso
INSERT INTO rol_permiso (cod_rol, cod_permiso)
VALUES 
(1, 1),
(2, 2),
(3, 3);
GO

-- Insertar datos en usuario
INSERT INTO usuario (nombre, apellido, email, constrasena, cod_rol)
VALUES 
('Juan', 'Pérez', 'juan.perez@example.com', 'password123', 1),
('Ana', 'García', 'ana.garcia@example.com', 'password123', 2),
('Luis', 'Martínez', 'luis.martinez@example.com', 'password123', 3);
GO

-- Insertar datos en servicio
INSERT INTO servicio (nombre, detalle)
VALUES 
('Servicio A', 'Detalle del Servicio A'),
('Servicio B', 'Detalle del Servicio B'),
('Servicio C', 'Detalle del Servicio C');
GO

-- Insertar datos en tipo_movimiento
INSERT INTO tipo_movimiento (nombre, detalle)
VALUES 
('Entrada', 'Movimiento de entrada de medicamentos'),
('Salida', 'Movimiento de salida de medicamentos');
GO

-- Insertar datos en movimiento
INSERT INTO movimiento (cod_usuario, cod_tipo_movimiento, cod_servicio, fecha_hora_movimiento, descripcion)
VALUES 
(1, 1, 1, '2024-01-01 10:00:00', 'Entrada inicial de medicamentos'),
(2, 2, 2, '2024-02-01 11:00:00', 'Salida de medicamentos para Servicio B'),
(3, 1, 3, '2024-03-01 12:00:00', 'Entrada de medicamentos para Servicio C'),
(1, 1, 1, '2024-04-01 09:00:00', 'Entrada de Medicamento X');
GO



-- Insertar datos en detalle_movimiento
INSERT INTO detalle_movimiento (cod_movimiento, cod_lote, cod_medicamento, cod_laboratorio, cantidad)
VALUES 
(1, 1, 1, 1, 100),
(1, 2, 2, 2, 150),
(1, 3, 3, 3, 200),
(2, 2, 2, 2, 75),
(3, 3, 3, 3, 100)
GO



--Consultar el stock actual
SELECT 
    m.cod_medicamento,
    m.nombre AS nombre_medicamento,
    l.cod_lote,
    l.fehca_vencimiento,
    l.cantidad AS cantidad_inicial,
    COALESCE(SUM(CASE WHEN tm.nombre = 'Entrada' THEN dm.cantidad ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN tm.nombre = 'Salida' THEN dm.cantidad ELSE 0 END), 0) AS stock_actual
FROM 
    medicamento m
JOIN 
    lote l ON m.cod_medicamento = l.cod_medicamento AND m.cod_laboratorio = l.cod_laboratorio
LEFT JOIN 
    detalle_movimiento dm ON l.cod_lote = dm.cod_lote AND l.cod_medicamento = dm.cod_medicamento AND l.cod_laboratorio = dm.cod_laboratorio
LEFT JOIN 
    movimiento mo ON dm.cod_movimiento = mo.cod_movimiento
LEFT JOIN 
    tipo_movimiento tm ON mo.cod_tipo_movimiento = tm.cod_tipo_movimiento
GROUP BY 
    m.cod_medicamento, 
    m.nombre, 
    l.cod_lote, 
    l.fehca_vencimiento, 
    l.cantidad;
