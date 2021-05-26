USE WishList;
GO

INSERT INTO Usuario			(Nome, Email, Senha)
VALUES						('Joao', 'joao@gmail.com', 'joao123');
GO

INSERT INTO Desejos			(IdUsuario, Titulo, Descricao)
VALUES						(1, 'Concluir attividade da escola', 'Desejo concluir a atividade proposta peela escola')
GO