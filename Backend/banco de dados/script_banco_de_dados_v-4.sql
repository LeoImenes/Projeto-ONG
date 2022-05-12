DROP DATABASE IF EXISTS BD_ong_casa_irma_antonia;

CREATE DATABASE BD_ong_casa_irma_antonia CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;
USE BD_ong_casa_irma_antonia;

CREATE TABLE funcionarios(
	id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT,
	foto LONGTEXT,
	matricula VARCHAR(10) NOT NULL UNIQUE,
	nome_completo VARCHAR(50) NOT NULL,
	rg VARCHAR(20) NOT NULL,
	cpf VARCHAR(20) NOT NULL UNIQUE,
	data_nascimento DATE NOT NULL,
	estado_civil VARCHAR(10) NOT NULL,
	cargo VARCHAR(50) NOT NULL,
	sexo VARCHAR(10) NOT NULL,
	data_admissao DATE NOT NULL,
	data_demissao DATE,
	email VARCHAR(30) NOT NULL UNIQUE,
	senha VARCHAR(50) NOT NULL,
	status BOOLEAN NOT NULL
);

CREATE TABLE assistidos(
	id_assistido INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	nome_completo VARCHAR(40) NOT NULL,
	nome_social VARCHAR(20),
	rg VARCHAR(20),
	cpf VARCHAR(20) UNIQUE,
	antecedente_criminal VARCHAR(50),
	data_nascimento DATE NOT NULL,
	estado_civil VARCHAR(15) NOT NULL,
	naturalidade VARCHAR(30),
	sexo VARCHAR(10) NOT NULL,
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
	id_saude INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_comorbidade INTEGER,
	data_de_registro DATE,	
	CONSTRAINT fk_assistido FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_comorbidade FOREIGN KEY (id_comorbidade) REFERENCES comorbidades(id_comorbidade) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE familiares(
	id_familiar INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_completo VARCHAR(40),
	rg VARCHAR(15),
	telefone VARCHAR(15),
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
	id_doc INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	documento LONGTEXT NOT NULL,
	data_cadastro DATE NOT NULL,	
	CONSTRAINT fk_assistido02 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE relatorios(
	id_relatorio INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
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
	id_assistencia INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_funcionario INTEGER NOT NULL,
	solicitacao INTEGER,
	data_registro DATE NOT NULL,	
	CONSTRAINT fk_assistido05 FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,	
	CONSTRAINT fk_funcionario03 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE solicitacao(
	id_solicitacao INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_assistencia INTEGER NOT NULL,
	id_item INTEGER NOT NULL,
	CONSTRAINT fk_assistencia FOREIGN KEY (id_assistencia) REFERENCES assistencias(id_assistencia) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE financeiro(
	id_lancamento INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	data_lancamento DATETIME NOT NULL,
	tipo TINYINT NOT NULL,
	descricao VARCHAR(50) NOT NULL,
	valor DECIMAL(5,2) NOT NULL,	
	CONSTRAINT fk_funcionario04 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE estoque(
	id_estoque INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	item VARCHAR(100) NOT NULL, 
	quantidade INTEGER NOT NULL,
	tipo TINYINT NOT NULL,	
	CONSTRAINT fk_funcionario05 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE
);

set global max_allowed_packet=33554432