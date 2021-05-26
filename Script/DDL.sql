USE WishList;
GO

SELECT IdUsuario, Nome, Email 
FROM Usuario;

SELECT Usuario.Nome AS Nome, Titulo, Descricao 
FROM Desejos
INNER JOIN Usuario
ON Usuario.IdUsuario = Desejos.IdUsuario
GO