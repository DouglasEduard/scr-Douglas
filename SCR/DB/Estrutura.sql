CREATE TABLE Empresa(

	id_empresa BIGINT IDENTITY(1,1) PRIMARY KEY,
	tipo VARCHAR(100),
	nome VARCHAR(100),
	nomeFantasia VARCHAR(100),
	cnpj VARCHAR(20),
	ie VARCHAR(20),
	atividade VARCHAR(50),
	contato VARCHAR(100),
	email VARCHAR(100),
	telefone VARCHAR(100),
	institucional TEXT,
	imagens_emp TEXT,
	logo_nome VARCHAR(100)	
);

CREATE TABLE Telefone(

	id_telefone BIGINT IDENTITY(1,1) PRIMARY KEY,
	ddd	SMALLINT,
	ddi SMALLINT,
	telefone VARCHAR(20),
	id_empresa BIGINT,
	seq SMALLINT,

	CONSTRAINT FK_TELEFONE_EMPRESA FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Email(

	id_email BIGINT IDENTITY(1,1) PRIMARY KEY,
	nomeContato VARCHAR(50),
	email VARCHAR(50),
	id_empresa BIGINT,
	
	CONSTRAINT FK_EMAIL_EMPRESA FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)
	
);

CREATE TABLE Usuario(
	id_usuario BIGINT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(100),
	departamento VARCHAR(100),
	email VARCHAR(100),
	cargo VARCHAR(100),
	login VARCHAR(60),
	senha VARCHAR(60),
	datacadastro DATETIME,
	id_empresa BIGINT

	CONSTRAINT FK_USUARIO_EMPRESA FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)
)

CREATE TABLE Endereco(

	id_endereco BIGINT IDENTITY(1,1) PRIMARY KEY,

	tipo VARCHAR(20),
	rua VARCHAR(50),
	numero SMALLINT,
	bairro VARCHAR(50),
	cidade VARCHAR(50),
	estado VARCHAR(50),
	cep VARCHAR(20),
	pais VARCHAR(50),
	complemento VARCHAR(50),
	
	id_empresa BIGINT,
	
	CONSTRAINT FK_ENDERECO_EMPRESA FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)
	
);

CREATE TABLE Produto(

	id_produto BIGINT IDENTITY(1,1) PRIMARY KEY,
	codigo INTEGER,
	descricao VARCHAR(100),
	marca VARCHAR(50),
	valor DECIMAL(18,2),
	quantidade_min SMALLINT,
	dataultimaalteracao DATETIME,
	id_empresa BIGINT,
	visibilidade smallint, -- 0 Todos as empresas / 1 - Apenas empresas parceiras
	desativado smallint, 

	CONSTRAINT FK_PRODUTO_EMPRESA FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)

);

CREATE TABLE Orcamento
(
	id_orcamento BIGINT IDENTITY(1,1) PRIMARY KEY,
	id_usuario_origem  BIGINT,
	id_usuario_elaboracao  BIGINT,	
	id_empresa_origem BIGINT,
	id_empresa_destino BIGINT,
	id_produto BIGINT,
	texto_usuario_origem TEXT,
	texto_usuario_destino TEXT,
	quantidade_solicitada INTEGER,
	valor_horaservico DECIMAL(18,2),
	valortotal_maoobra DECIMAL(18,2),
	valorunidade_produto DECIMAL(18,2),
	valortotal_produto DECIMAL(18,2),
	valordesconto_produto DECIMAL(18,2),
	valordesconto_maoobra DECIMAL(18,2),
	valorfrete DECIMAL(18,2),

	CONSTRAINT FK_ORCAMENTO_USUARIOORIGEM FOREIGN KEY (id_usuario_origem) REFERENCES Usuario(id_usuario),
	CONSTRAINT FK_ORCAMENTO_USUARIOELABORACAO FOREIGN KEY (id_usuario_elaboracao) REFERENCES Usuario(id_usuario),
	CONSTRAINT FK_ORCAMENTO_EMPRESAORIGEM FOREIGN KEY (id_empresa_origem) REFERENCES Empresa(id_Empresa),
	CONSTRAINT FK_ORCAMENTO_EMPRESADESTINO FOREIGN KEY (id_empresa_destino) REFERENCES Empresa(id_Empresa),
	CONSTRAINT FK_ORCAMENTO_PRODUTO FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
)

CREATE TABLE Mensagem(
	id_mensagem BIGINT IDENTITY(1,1) PRIMARY KEY,
	id_usuario_origem  BIGINT,
	id_usuario_destino  BIGINT,
	id_produto BIGINT,
	dataenvio DATETIME,
	dataleitura DATETIME,
	id_assunto INT, --Permitir relacionamento entre todas as mensagens do mesmo assunto
	assunto VARCHAR(60),
	mensagem TEXT,
	id_orcamento BIGINT,

	CONSTRAINT FK_MENSAGEM_USUARIOORIGEM FOREIGN KEY (id_usuario_origem) REFERENCES Usuario(id_usuario),
	CONSTRAINT FK_MENSAGEM_USUARIODESTINO FOREIGN KEY (id_usuario_destino) REFERENCES Usuario(id_usuario),
	CONSTRAINT FK_MENSAGEM_PRODUTO FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
	CONSTRAINT FK_MENSAGEM_ORCAMENTO FOREIGN KEY (id_orcamento) REFERENCES Orcamento(id_orcamento)
)


CREATE TABLE SolicitacaoParceria(
	id_parceria BIGINT IDENTITY(1,1) PRIMARY KEY,
	id_empresa_snte  BIGINT,
	id_empresa_stda  BIGINT,
	datasolicitacao DATETIME,
	dataconfirmacao DATETIME,
	bloqueado SMALLINT,

	CONSTRAINT FK_PARCERIA_EMPRESA_SNTE FOREIGN KEY (id_empresa_snte) REFERENCES Empresa(id_empresa),
	CONSTRAINT FK_PARCERIA_EMPRESA_STDA FOREIGN KEY (id_empresa_stda) REFERENCES Empresa(id_empresa)
)


CREATE TABLE [dbo].[Parceria](
	[id_parceria] [bigint] IDENTITY(1,1) NOT NULL,
	[id_empresa] [bigint] NOT NULL,
	[id_empresaparceira] [bigint] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[id_parceria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Parceria]  WITH CHECK ADD  CONSTRAINT [FK_PARCERIA_EMPRESAID] FOREIGN KEY([id_empresa])
REFERENCES [dbo].[Empresa] ([id_empresa])
GO

ALTER TABLE [dbo].[Parceria]  WITH CHECK ADD  CONSTRAINT [FK_PARCERIA_EMPRESAPARCEIRA] FOREIGN KEY([id_empresaparceira])
REFERENCES [dbo].[Empresa] ([id_empresa])
GO




----------------------------------------------------
---Para o próximo semestre
------

CREATE TABLE Funcionalidades
(
	id_funcionalidade INT IDENTITY(1,1) PRIMARY KEY,
	descricao_funcionalidade VARCHAR(60)	  
)

CREATE TABLE Restricao
(
	id_restricao BIGINT IDENTITY(1,1) PRIMARY KEY,
	id_funcionalidade INT NOT NULL,
	id_usuario BIGINT NOT NULL,
	id_usuario_responsavel BIGINT NOT NULL,
	restricao_tipo SMALLINT NOT NULL, -- 0 = Liberado, 1 = Bloqueado
	datarestricao DATETIME,

	CONSTRAINT FK_RESTRICAO_FUNCIONALIDADE FOREIGN KEY (id_funcionalidade) REFERENCES Funcionalidades(id_funcionalidade),
	CONSTRAINT FK_RESTRICAO_USUARIO FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
	CONSTRAINT FK_RESTRICAO_USUARIORESP FOREIGN KEY (id_usuario_responsavel) REFERENCES Usuario(id_usuario)
)
--------------------------------------

ALTER TABLE Orcamento ADD valorunidade_maoobra decimal
ALTER TABLE Orcamento DROP COLUMN valor_horaservico

ALTER TABLE Mensagem ADD [id_empresa_origem] [bigint] NULL
ALTER TABLE Mensagem ADD [id_empresa_destino] [bigint] NULL


ALTER TABLE [dbo].[Mensagem]  WITH CHECK ADD  CONSTRAINT [FK_MENSAGEM_EMPRESADESTINO] FOREIGN KEY([id_empresa_destino])
REFERENCES [dbo].[Empresa] ([id_empresa])
GO

ALTER TABLE [dbo].[Mensagem] CHECK CONSTRAINT [FK_MENSAGEM_EMPRESADESTINO]
GO

ALTER TABLE [dbo].[Mensagem]  WITH CHECK ADD  CONSTRAINT [FK_MENSAGEM_EMPRESAORIGEM] FOREIGN KEY([id_empresa_origem])
REFERENCES [dbo].[Empresa] ([id_empresa])
GO

ALTER TABLE [dbo].[Mensagem] CHECK CONSTRAINT [FK_MENSAGEM_EMPRESAORIGEM]
GO