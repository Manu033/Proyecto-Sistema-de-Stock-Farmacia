CREATE TABLE Laboratorio (
    cod_laboratorio INT PRIMARY KEY,
    nombre VARCHAR(255),
    detalle TEXT
);

CREATE TABLE Producto (
    cod_producto INT,
    cod_laboratorio INT,
    nombre VARCHAR(255),
    tipo_producto VARCHAR(255),
	primary key(cod_producto, cod_laboratorio),
    FOREIGN KEY (cod_laboratorio) REFERENCES Laboratorio(cod_laboratorio),
	check(tipo_producto in('medicamento','producto medico','nutroterapuetico'))
	
);

CREATE TABLE Lote (
    id_lote INT ,
    cod_producto INT,
    cod_laboratorio INT,
    fecha_vencimiento DATE,
    cantidad_inicial INT,
    cantidad_actual INT,
	primary key(id_lote, cod_producto, cod_laboratorio),
    FOREIGN KEY (cod_producto, cod_laboratorio) REFERENCES Producto(cod_producto, cod_laboratorio)
);

CREATE TABLE stock_mes (
    id_lote INT,
    cod_producto INT,
    cod_laboratorio INT,
    fecha_mes DATE,
    cant_stock INT,
    PRIMARY KEY (id_lote, cod_producto, cod_laboratorio, fecha_mes),
	    FOREIGN KEY (id_lote, cod_producto, cod_laboratorio) REFERENCES Lote(id_lote, cod_producto, cod_laboratorio)
);

CREATE TABLE Servicio (
    cod_servicio INT PRIMARY KEY,
    nombre VARCHAR(255),
    detalle TEXT
);

CREATE TABLE Tipo_de_Movimiento (
    cod_tipo_movimiento INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE Rol (
    cod_rol INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE Permiso (
    cod_permiso INT PRIMARY KEY,
    descripcion TEXT
);

CREATE TABLE Rol_Permiso (
    cod_permiso INT,
    cod_rol INT,
    PRIMARY KEY (cod_permiso, cod_rol),
    FOREIGN KEY (cod_permiso) REFERENCES Permiso(cod_permiso),
    FOREIGN KEY (cod_rol) REFERENCES Rol(cod_rol)
);

CREATE TABLE Usuario (
    cod_usuario INT PRIMARY KEY,
    nombre_usuario VARCHAR(255),
    nombre_completo VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    activo bit,
    cod_rol INT,
    FOREIGN KEY (cod_rol) REFERENCES Rol(cod_rol)
);

CREATE TABLE Movimiento (
    cod_movimiento INT PRIMARY KEY,
    fecha_movimiento DATE,
    descripcion TEXT,
    cod_tipo_movimiento INT,
    cod_servicio INT,
    cod_usuario INT,
    FOREIGN KEY (cod_tipo_movimiento) REFERENCES Tipo_de_Movimiento(cod_tipo_movimiento),
    FOREIGN KEY (cod_servicio) REFERENCES Servicio(cod_servicio),
    FOREIGN KEY (cod_usuario) REFERENCES Usuario(cod_usuario)
);

CREATE TABLE Detalle_Movimiento (
    cod_movimiento INT,
    id_lote INT,
    cod_producto INT,
    cod_laboratorio INT,
    cantidad INT,
    PRIMARY KEY (cod_movimiento, id_lote, cod_producto, cod_laboratorio),
    FOREIGN KEY (cod_movimiento) REFERENCES Movimiento(cod_movimiento),
	FOREIGN KEY (id_lote, cod_producto, cod_laboratorio) REFERENCES Lote(id_lote, cod_producto, cod_laboratorio)
)



CREATE TABLE configuracion (
    cod_configuracion INT PRIMARY KEY,
    valor VARCHAR(255),
    descripcion TEXT
);




-- Insertar laboratorios
INSERT INTO Laboratorio (cod_laboratorio, nombre, detalle) VALUES (1, 'Laboratorio A', 'Laboratorio especializado en medicamentos');
INSERT INTO Laboratorio (cod_laboratorio, nombre, detalle) VALUES (2, 'Laboratorio B', 'Laboratorio de productos médicos');
INSERT INTO Laboratorio (cod_laboratorio, nombre, detalle) VALUES (3, 'Laboratorio C', 'Laboratorio de productos para hemoterapia');

-- Insertar productos
INSERT INTO Producto (cod_producto, cod_laboratorio, nombre, tipo_producto) VALUES (1, 1, 'Medicamento X', 'medicamento');
INSERT INTO Producto (cod_producto, cod_laboratorio, nombre, tipo_producto) VALUES (1, 2, 'Medicamento X', 'medicamento'); -- Mismo producto, diferente laboratorio
INSERT INTO Producto (cod_producto, cod_laboratorio, nombre, tipo_producto) VALUES (2, 2, 'Producto Médico Y', 'producto medico');
INSERT INTO Producto (cod_producto, cod_laboratorio, nombre, tipo_producto) VALUES (3, 3, 'Nutroterapéutico Z', 'nutroterapuetico');

-- Insertar lotes
INSERT INTO Lote (id_lote, cod_producto, cod_laboratorio, fecha_vencimiento, cantidad_inicial, cantidad_actual) VALUES (1, 1, 1, '2025-12-31', 100, 90);
INSERT INTO Lote (id_lote, cod_producto, cod_laboratorio, fecha_vencimiento, cantidad_inicial, cantidad_actual) VALUES (2, 1, 2, '2025-12-31', 150, 140);
INSERT INTO Lote (id_lote, cod_producto, cod_laboratorio, fecha_vencimiento, cantidad_inicial, cantidad_actual) VALUES (3, 2, 2, '2024-06-30', 200, 200);
INSERT INTO Lote (id_lote, cod_producto, cod_laboratorio, fecha_vencimiento, cantidad_inicial, cantidad_actual) VALUES (4, 3, 3, '2026-01-31', 300, 280);

-- Insertar servicios
INSERT INTO Servicio (cod_servicio, nombre, detalle) VALUES (1, 'Urgencias', 'Servicio de urgencias');
INSERT INTO Servicio (cod_servicio, nombre, detalle) VALUES (2, 'Consultas Externas', 'Consultas médicas externas');

-- Insertar tipos de movimiento
INSERT INTO Tipo_de_Movimiento (cod_tipo_movimiento, nombre) VALUES (1, 'Entrada');
INSERT INTO Tipo_de_Movimiento (cod_tipo_movimiento, nombre) VALUES (2, 'Salida');
INSERT INTO Tipo_de_Movimiento (cod_tipo_movimiento, nombre) VALUES (3, 'Ajuste');

-- Insertar roles
INSERT INTO Rol (cod_rol, nombre, descripcion) VALUES (1, 'Administrador', 'Administración del sistema');
INSERT INTO Rol (cod_rol, nombre, descripcion) VALUES (2, 'Usuario', 'Usuario regular');

-- Insertar permisos
INSERT INTO Permiso (cod_permiso, descripcion) VALUES (1, 'Acceso completo');
INSERT INTO Permiso (cod_permiso, descripcion) VALUES (2, 'Acceso limitado');

-- Insertar relación rol-permiso
INSERT INTO Rol_Permiso (cod_permiso, cod_rol) VALUES (1, 1);
INSERT INTO Rol_Permiso (cod_permiso, cod_rol) VALUES (2, 2);

-- Insertar usuarios
INSERT INTO Usuario (cod_usuario, nombre_usuario, nombre_completo, email, contrasena, activo, cod_rol) VALUES (1, 'admin', 'Administrador del Sistema', 'admin@example.com', 'password', 1, 1);
INSERT INTO Usuario (cod_usuario, nombre_usuario, nombre_completo, email, contrasena, activo, cod_rol) VALUES (2, 'usuario1', 'Usuario Regular 1', 'usuario1@example.com', 'password', 1, 2);

-- Insertar movimientos
INSERT INTO Movimiento (cod_movimiento, fecha_movimiento, descripcion, cod_tipo_movimiento, cod_servicio, cod_usuario) VALUES (1, '2024-08-01', 'Recepción de productos', 1, 1, 1);
INSERT INTO Movimiento (cod_movimiento, fecha_movimiento, descripcion, cod_tipo_movimiento, cod_servicio, cod_usuario) VALUES (2, '2024-08-05', 'Distribución de productos', 2, 2, 2);

-- Insertar detalle de movimiento (más de un detalle para un movimiento)
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (1, 1, 1, 1, 10); -- Detalle para Movimiento 1
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (1, 3, 2, 2, 20); -- Otro detalle para Movimiento 1
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (1, 2, 1, 2, 20); -- Otro detalle para Movimiento 1
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (1, 4, 3, 3, 100); -- Otro detalle para Movimiento 1


-- Otro movimiento con un detalle
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (2, 4, 3, 3, 15); -- Detalle para Movimiento 2
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (2, 1, 1, 1, 10); -- Detalle para Movimiento 2
INSERT INTO Detalle_Movimiento (cod_movimiento, id_lote, cod_producto, cod_laboratorio, cantidad) VALUES (2, 2, 1, 2, 100); -- Otro detalle para Movimiento 1

-- Dejar la tabla stock_mes vacía, como solicitaste


-- Primero desabilitar la integridad referencial
 EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'
 GO
EXEC sp_MSforeachtable @command1 = "delete from ?"
-- Ahora volver a habilitar la integridad referencial
 EXEC sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'
 GO




 --stock de medicamento
     SELECT 
        id_lote,
        cod_producto,
        cod_laboratorio,
        cantidad_actual AS cant_stock
    FROM 
        Lote;



SELECT 
    p.nombre AS NombreProducto,
    SUM(lt.cantidad_actual) AS CantidadTotalActual
FROM 
    Producto p
INNER JOIN 
    Laboratorio l ON p.cod_laboratorio = l.cod_laboratorio
INNER JOIN 
    Lote lt ON p.cod_producto = lt.cod_producto AND l.cod_laboratorio = lt.cod_laboratorio
WHERE 
    p.nombre = 'Medicamento X'
group by p.nombre

-- Trigger para INSERT
CREATE or alter TRIGGER trg_DetalleMovimiento_Insert
ON Detalle_Movimiento
AFTER INSERT
AS
BEGIN
    UPDATE Lote
    SET cantidad_actual = 
        CASE
            WHEN tm.nombre = 'Entrada' THEN l.cantidad_actual + i.cantidad
            WHEN tm.nombre = 'Salida' THEN l.cantidad_actual - i.cantidad
            ELSE l.cantidad_actual -- Para otros tipos de movimiento no definidos
        END
    FROM Lote l
    INNER JOIN inserted i ON l.id_lote = i.id_lote
    INNER JOIN Movimiento m ON i.cod_movimiento = m.cod_movimiento
    INNER JOIN Tipo_de_Movimiento tm ON m.cod_tipo_movimiento = tm.cod_tipo_movimiento
    WHERE l.cod_producto = i.cod_producto AND l.cod_laboratorio = i.cod_laboratorio;
END;
GO


--Trigger Update
CREATE or alter TRIGGER trg_DetalleMovimiento_Update
ON Detalle_Movimiento
AFTER UPDATE
AS
BEGIN
    -- Primero revertimos la cantidad antigua del lote considerando el tipo de movimiento
    UPDATE Lote
    SET cantidad_actual = 
        CASE
            WHEN tm.nombre = 'Entrada' THEN l.cantidad_actual - d.cantidad
            WHEN tm.nombre = 'Salida' THEN l.cantidad_actual + d.cantidad
            ELSE l.cantidad_actual -- Para otros tipos de movimiento no definidos
        END
    FROM Lote l
    INNER JOIN deleted d ON l.id_lote = d.id_lote
    INNER JOIN Movimiento m ON d.cod_movimiento = m.cod_movimiento
    INNER JOIN Tipo_de_Movimiento tm ON m.cod_tipo_movimiento = tm.cod_tipo_movimiento
    WHERE l.cod_producto = d.cod_producto AND l.cod_laboratorio = d.cod_laboratorio;

    -- Luego aplicamos la nueva cantidad al lote
    UPDATE Lote
    SET cantidad_actual = 
        CASE
            WHEN tm.nombre = 'Entrada' THEN l.cantidad_actual + i.cantidad
            WHEN tm.nombre = 'Salida' THEN l.cantidad_actual - i.cantidad
            ELSE l.cantidad_actual -- Para otros tipos de movimiento no definidos
        END
    FROM Lote l
    INNER JOIN inserted i ON l.id_lote = i.id_lote
    INNER JOIN Movimiento m ON i.cod_movimiento = m.cod_movimiento
    INNER JOIN Tipo_de_Movimiento tm ON m.cod_tipo_movimiento = tm.cod_tipo_movimiento
    WHERE l.cod_producto = i.cod_producto AND l.cod_laboratorio = i.cod_laboratorio;
END;
GO



-- Trigger para DELETE
CREATE or alter TRIGGER trg_DetalleMovimiento_Delete
ON Detalle_Movimiento
AFTER DELETE
AS
BEGIN
    UPDATE Lote
    SET cantidad_actual = 
        CASE
            WHEN tm.nombre = 'Entrada' THEN l.cantidad_actual - d.cantidad
            WHEN tm.nombre = 'Salida' THEN l.cantidad_actual + d.cantidad
            ELSE l.cantidad_actual -- Para otros tipos de movimiento no definidos
        END
    FROM Lote l
    INNER JOIN deleted d ON l.id_lote = d.id_lote
    INNER JOIN Movimiento m ON d.cod_movimiento = m.cod_movimiento
    INNER JOIN Tipo_de_Movimiento tm ON m.cod_tipo_movimiento = tm.cod_tipo_movimiento
    WHERE l.cod_producto = d.cod_producto AND l.cod_laboratorio = d.cod_laboratorio;
END;
GO

