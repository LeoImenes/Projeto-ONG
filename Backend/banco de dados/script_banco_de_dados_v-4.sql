DROP DATABASE IF EXISTS casairmaanto_bd;

CREATE DATABASE casairmaanto_bd CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;
USE casairmaanto_bd;

CREATE TABLE funcionarios(
	id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT,
	matricula VARCHAR(10) NOT NULL UNIQUE,
	nome_completo VARCHAR(50) NOT NULL,
	rg VARCHAR(20) NOT NULL,
	cpf VARCHAR(20) NOT NULL UNIQUE,
	data_nascimento DATE NOT NULL,
	estado_civil VARCHAR(10),
	cargo VARCHAR(30) NOT NULL,
	sexo VARCHAR(10) NOT NULL,
	data_admissao DATE NOT NULL,
	data_demissao DATE,
	email VARCHAR(30) NOT NULL UNIQUE,
	senha VARCHAR(50) NOT NULL,
	status BOOLEAN,
	foto LONGTEXT
);

CREATE TABLE assistidos(
	id_assistido INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	nome_completo VARCHAR(50) NOT NULL,
	nome_social VARCHAR(20),
	rg VARCHAR(20),
	cpf VARCHAR(20) UNIQUE,
	antecedente_criminal VARCHAR(50),
	data_nascimento DATE NOT NULL,
	estado_civil VARCHAR(15),
	naturalidade VARCHAR(30),
	sexo VARCHAR(10),
	cartao_cidadao VARCHAR(10),
	cartao_sus VARCHAR(20),
	foto_antes LONGTEXT,	
	foto_depois LONGTEXT,
	data_cadastro DATE,
	CONSTRAINT fk_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE comorbidades(
	id_comorbidade INTEGER PRIMARY KEY AUTO_INCREMENT,
	comorbidade varchar(50) NOT NULL, 
	tipo BOOLEAN NOT NULL
);

CREATE TABLE saude(
	id_saude INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_comorbidade INTEGER,
	data_de_registro DATE,	
	CONSTRAINT fk_assistido FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_comorbidade FOREIGN KEY (id_comorbidade) REFERENCES comorbidades(id_comorbidade) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE familiares(
	id_familiar INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_completo VARCHAR(50),
	rg VARCHAR(20),
	telefone VARCHAR(20),
	email VARCHAR(30),
	endereco VARCHAR(100)
);

CREATE TABLE familiarAssistido(
	id_familiarAssistido INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	id_assistido INTEGER NOT NULL,
	id_familiar INTEGER NOT NULL,
	data_cadastro DATE NOT NULL,
	parentesco VARCHAR(12),	
	CONSTRAINT fk_assistido01 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_familiar FOREIGN KEY (id_familiar) REFERENCES familiares(id_familiar) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DocsAssistidos(
	id_doc INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	documento LONGTEXT NOT NULL,
	data_cadastro DATE NOT NULL,	
	CONSTRAINT fk_assistido02 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE relatorios(
	id_relatorio INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	id_assistido INTEGER NOT NULL,
	id_funcionario INTEGER NOT NULL, 
	relatorio LONGTEXT NOT NULL,
	data_relatorio DATE NOT NULL,	
	CONSTRAINT fk_assistido03 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_funcionario01 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE encaminhamentos(
	id_encaminhamento INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	id_assistido INTEGER NOT NULL,
	encaminhamento LONGTEXT NOT NULL,
	data_registro DATE NOT NULL,	
	CONSTRAINT fk_funcionario02 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_assistido04 FOREIGN KEY (id_assistido) REFERENCES assistidos (id_assistido) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE itens(
	id_item INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	item VARCHAR(50) NOT NULL,
	tipo TINYINT NOT NULL
);

CREATE TABLE assistencias(
	id_assistencia INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_funcionario INTEGER NOT NULL,
	solicitacao INTEGER,
	data_registro DATE NOT NULL,	
	CONSTRAINT fk_assistido05 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,	
	CONSTRAINT fk_funcionario03 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE solicitacao(
	id_solicitacao INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_assistencia INTEGER NOT NULL,
	id_item INTEGER NOT NULL,
	CONSTRAINT fk_assistencia FOREIGN KEY (id_assistencia) REFERENCES assistencias(id_assistencia) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES itens(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE financeiro(
	id_lancamento INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	data_lancamento DATETIME NOT NULL,
	tipo TINYINT NOT NULL,
	descricao VARCHAR(50) NOT NULL,
	valor DECIMAL(5,2) NOT NULL,	
	CONSTRAINT fk_funcionario04 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE estoque(
	id_estoque INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	item VARCHAR(100) NOT NULL, 
	quantidade INTEGER NOT NULL,
	tipo TINYINT NOT NULL,	
	CONSTRAINT fk_funcionario05 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- *** Inserindo Funcionarios *** --

INSERT INTO funcionarios (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("001", "Adminstrador", "00.000.000-00", "000.000.000-oo", "00/00/00", "Diretor", "Masculino", "2022-05-15", "administrador@gmail.com", "123@123", true);

INSERT INTO funcionarios (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("002", "jaqueline", "33.555.444-3", "444.555.666.33", "05/04/1995", "Mobile", "Feminino", "01/06/2018", "jaquelie@gmail.com", "123", false);

INSERT INTO funcionarios (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("003", "Leonardo", "22.444.444-5", "888.333.333.33", "04/04/1993", "FrontEnd", "Masculino", "01/04/2018", "leonardo@gmail.com", "123", true);

INSERT INTO funcionarios (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("004", "Roberto", "12.222.444-5", "154.333.654.32", "06/04/1984", "ti", "Masculino", "2018-06-12", "roberto@gmail.com", "123", true);

INSERT INTO funcionarios (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("005", "Teste", "12.222.444-55", "154.333.654.02", "06/04/1984", "teste", "Masculino", "2018-06-12", "teste@gmail.com", "123", true);

-- *** Inserindo Comorbidades *** --

INSERT INTO comorbidades VALUES
	(DEFAULT,"HIV",1),
	(DEFAULT,"Hipertenção",1),
	(DEFAULT,"Diabetes",1),
	(DEFAULT,"Depressão",1),
	(DEFAULT,"Maconha",0),
	(DEFAULT,"Cocaína",0),
	(DEFAULT,"Crack",0),
	(DEFAULT,"OX",0),
	(DEFAULT,"Álcool",0);

-- *** Inserindo Itens *** --

INSERT INTO itens VALUES
	(DEFAULT, "Café da Manhã",1),
	(DEFAULT, "Almoço",1),
	(DEFAULT, "Café da Tarde",1),	
	(DEFAULT, "Ceia",1),
	(DEFAULT, "Pernoite",2),
	(DEFAULT, "Roupas",3),
	(DEFAULT, "Sapato",3),
	(DEFAULT, "Banho",4),
	(DEFAULT, "Kit higiene",4),
	(DEFAULT, "Passagem",5),
	(DEFAULT, "Cesta Básica",5);
	
-- *** VIEW's *** --

create view vw_assistencia as
select 
    ass.nome_completo as Assistido, 
    ass.id_assistido,
    f.nome_completo as Funcionario, 
    f.id_funcionario,
    i.item,
    a.data_registro
     from assistencias a
     inner join assistidos ass on ass.id_assistido = a.id_assistido
     inner join funcionarios f on f.id_funcionario = a.id_funcionario
     inner join solicitacao s on s.id_assistencia = a.id_assistencia
     inner join itens i on i.id_item = s.id_item;
	 

CREATE VIEW vw_familiar AS
select
	a.id_assistido,
	a.nome_completo AS Assistido,
	f.id_familiar,
	f.nome_completo AS Familiar,
	fa.parentesco As Parentesco,
	f.telefone AS Telefone_familiar,
	f.email AS Email_Familiar,
	f.endereco AS Endereco_Familiar
	
from
	assistidos a
	inner join familiarAssistido fa on a.id_assistido = fa.id_assistido
	inner join familiares f on fa.id_familiar = f.id_familiar;
	
	
CREATE VIEW vw_saude AS
select
	a.data_cadastro As Data_Cadastro,
	a.id_funcionario As Id_Funcionario,
	a.id_assistido As Id_Assistido,
	a.nome_completo AS Assistido,
	a.sexo As Sexo,
	a.cartao_cidadao As Catão_Cidadão,
	a.cartao_sus As Cartão_SUS,
	a.foto_antes As Foto,
	s.id_saude AS Id_Saude,
	s.data_de_registro As Data_do_Registro,
	c.comorbidade As Comorbidades,
	c.tipo
from
	assistidos a
	inner join saude s on a.id_assistido = s.id_assistido
	inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;
	

CREATE VIEW vw_saude2 AS
SELECT
	a.id_assistido AS Id_Assistido,
	a.nome_completo AS Assistido,
	c.id_comorbidade AS Id_Comorbidade,
	c.comorbidade
FROM
	assistidos a
	INNER JOIN saude s ON a.id_assistido = s.id_assistido
	INNER JOIN comorbidades c ON s.id_comorbidade = c.id_comorbidade;
	
	
	CLEARDB_DATABASE_URL
	
	mysql://casairmaanto_casa:Antonia-TI@casairmaantonia.org/casairmaanto_bd?reconnect=true
	
	

