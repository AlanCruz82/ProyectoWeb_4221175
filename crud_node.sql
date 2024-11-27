CREATE DATABASE IF NOT EXISTS crud_node;
USE crud_node;

CREATE TABLE usuarios(
    id_uss	INTEGER NOT NULL AUTO_INCREMENT,
    nombre_uss	VARCHAR(50) NOT NULL,
    apellidopat_uss VARCHAR(50),
    apellidomat_uss	VARCHAR(50) NOT NULL,
    edad_uss	INTEGER NOT NULL,
    telefono_uss VARCHAR(10) NOT NULL,
    email_uss VARCHAR(50) NOT NULL UNIQUE,
    genero_uss ENUM('Masculino','Femenino','Otro') DEFAULT 'Otro',
    PRIMARY KEY (id_uss)
)DEFAULT CHARACTER SET utf8;

INSERT INTO usuarios (nombre_uss, apellidopat_uss, apellidomat_uss, edad_uss, telefono_uss, email_uss, genero_uss) 
VALUES  ('Juan', 'Perez', 'Gomez', 30, "5551234567", 'juan.gomez@example.com', 'Masculino');