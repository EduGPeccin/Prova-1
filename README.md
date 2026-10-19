# API de Voluntariado IFRS

API desenvolvida para gerenciar voluntários e eventos.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JavaScript
- JWT para autenticação
- Swagger para documentação da API
- JSDoc para documentação do código interno

## Pré-requisitos

- [Node.js]
- [MySQL]
- [Git]

## Instalação

### 1. Clone o repositório


git clone https://github.com/EduGPeccin/Prova-1.git


Entre na pasta do backend:


cd Prova-1/back



### 2. Dependências Back-end


npm install


npm install swagger-ui-express swagger-jsdoc
npm install --save-dev jsdoc


### 3. Configure o banco de dados

use os códigos sql abaixo para estrutura do banco:

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

Use a estrutura abaixo como exemplo de dados:

INSERT INTO voluntarios (nome, email, password, role, telefone, curso) VALUES
('admin','admin@ifrs.edu.br','$2b$10$/JLXJ62EBlk1bNq0xmpvMuTLDJb6AWmZUs74lgEJb4Z.J9.3kFJM.', 'admin', Null, Null);

INSERT INTO eventos
(titulo, descricao, local, data_evento, horario, vagas, status)
VALUES
('Campanha de Doação de Sangue',
 'Ação de incentivo à doação de sangue.',
 'Campus IFRS',
 '2026-11-10',
 '09:00:00',
 30,
 'Planejado'),

('Arrecadação de Alimentos',
 'Campanha de arrecadação de alimentos não perecíveis.',
 'Saguão do Campus IFRS',
 '2026-11-15',
 '14:00:00',
 20,
 'Planejado'),

('Mutirão Ambiental',
 'Limpeza e preservação das áreas verdes.',
 'Área verde do campus',
 '2026-11-20',
 '08:00:00',
 25,
 'Planejado');



### 4. Configure as variáveis de ambiente

Crie um arquivo `.env`:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=voluntariado
PORT=3000



## Execução

Na pasta do backend, execute:

npm run dev


## Documentação Swagger

Com o servidor em execução, acesse:

`http://localhost:3000/api-docs`

Endpoints documentados:

- `GET /protected/events` — listar eventos.
- `POST /protected/events` — cadastrar eventos.
- `POST /auth/login` — autenticar usuários.


## Documentação JSDoc

npm run docs
