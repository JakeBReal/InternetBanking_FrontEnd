-- Crear tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cedula VARCHAR(11) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    saldo NUMERIC(10, 2) DEFAULT 0
);

-- Crear tabla transacciones
CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Crear tabla tarjetas
CREATE TABLE tarjetas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    numero_tarjeta VARCHAR(16) UNIQUE NOT NULL,
    limite_credito NUMERIC(10, 2) NOT NULL,
    disponible NUMERIC(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Crear tabla beneficiarios
CREATE TABLE beneficiarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    beneficiario_id INT NOT NULL,
    alias VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Crear tabla transferencias
CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    origen_id INT NOT NULL,
    destino_id INT NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (origen_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (destino_id) REFERENCES usuarios (id) ON DELETE CASCADE
);
