-- Crear la base de datos
CREATE DATABASE internet_banking;
GO

-- Usar la base de datos creada
USE Internet_Banking;
GO

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,         -- Identificador �nico del usuario
    nombre VARCHAR(100) NOT NULL,             -- Nombre del usuario
    correo VARCHAR(100) UNIQUE NOT NULL,      -- Correo �nico
    contrasena VARCHAR(255) NOT NULL,         -- Contrase�a (encriptada)
    saldo DECIMAL(10, 2) DEFAULT 0.00         -- Saldo inicial en la cuenta
);

-- Tabla de transacciones
CREATE TABLE transacciones (
    id INT IDENTITY(1,1) PRIMARY KEY,         -- Identificador �nico de la transacci�n
    usuario_id INT NOT NULL,                  -- Relaci�n con el usuario
    tipo NVARCHAR(50) NOT NULL CHECK (tipo IN ('deposito', 'retiro', 'transferencia')), -- Tipo de transacci�n
    monto DECIMAL(10, 2) NOT NULL,            -- Monto de la transacci�n
    fecha DATETIME DEFAULT GETDATE(),         -- Fecha de la transacci�n
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Llave for�nea vinculada a usuarios
);

-- Tabla de beneficiarios
CREATE TABLE beneficiarios (
    id INT IDENTITY(1,1) PRIMARY KEY,         -- Identificador �nico del beneficiario
    usuario_id INT NOT NULL,                  -- Usuario que registra al beneficiario
    beneficiario_id INT NOT NULL,             -- Usuario beneficiario
    fecha DATETIME DEFAULT GETDATE(),         -- Fecha en que se a�adi� el beneficiario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),  -- Relaci�n con usuario
    FOREIGN KEY (beneficiario_id) REFERENCES usuarios(id) -- Relaci�n con beneficiario
);

-- Tabla de tarjetas de cr�dito
CREATE TABLE tarjetas_credito (
    id INT IDENTITY(1,1) PRIMARY KEY,         -- Identificador �nico de la tarjeta
    usuario_id INT NOT NULL,                  -- Relaci�n con el usuario
    numero_tarjeta VARCHAR(16) UNIQUE NOT NULL, -- N�mero �nico de tarjeta
    limite DECIMAL(10, 2) NOT NULL,           -- L�mite de cr�dito
    balance DECIMAL(10, 2) DEFAULT 0.00,      -- Balance utilizado
    estado NVARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobada', 'rechazada')), -- Estado de la tarjeta
    fecha_emision DATETIME DEFAULT GETDATE(), -- Fecha de emisi�n
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Relaci�n con usuario
);
GO

SELECT * FROM sys.tables;
