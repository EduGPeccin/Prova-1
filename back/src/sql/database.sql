CREATE DATABASE IF NOT EXISTS voluntariado;

USE voluntariado;

CREATE TABLE voluntarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    telefone VARCHAR(20),
    curso VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    local VARCHAR(150) NOT NULL,
    data_evento DATE NOT NULL,
    horario TIME NOT NULL,
    vagas INT NOT NULL,
    status ENUM('Planejado', 'Em andamento', 'Concluído', 'Cancelado')
        DEFAULT 'Planejado',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
