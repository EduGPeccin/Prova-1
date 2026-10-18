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

