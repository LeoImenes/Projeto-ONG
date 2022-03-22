



CREATE VIEW vw_saude AS
SELECT a.id_assistido AS id_assit,a.nome_completo,a.data_nascimento,c.id_comorbidade AS id_comorb,c.comorbidade
FROM assistidos a INNER JOIN saude s ON a.id_assistido = s.id_assistido
INNER JOIN comorbidades c ON s.id_probs = p.id;




select *
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade WHERE a.id_assistido = 1;



-- inner join 
select a.id_assistido, a.id_funcionario, a.nome_completo, a.nome_social, a.rg, a.cpf, a.antecedente_criminal, a.data_nascimento, a.estado_civil, a.naturalidade,
a.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro, s.data_de_registro, c.comorbidade, c.tipo
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade WHERE a.id_assistido = 1;

-- view
CREATE VIEW vw_saude AS
select a.id_assistido, a.id_funcionario, a.nome_completo, a.nome_social, a.rg, a.cpf, a.antecedente_criminal, a.data_nascimento, a.estado_civil, a.naturalidade,
a.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro, s.id_saude, s.data_de_registro, c.comorbidade, c.tipo
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;

CREATE VIEW vw_saude02 AS
select a.id_assistido, a.nome_completo, a.nome_social, s.data_de_registro, c.comorbidade, c.tipo, s.id_saude
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;


CREATE VIEW vw_familiar AS
select a.id_assistido, a.id_funcionario, a.nome_completo, a.nome_social, a.rg, a.cpf, a.antecedente_criminal, a.data_nascimento, a.estado_civil, a.naturalidade,
a.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro AS data_cadastro_assistido, fa.data_cadastro, f.nome_completo AS nome_familiar,f.rg AS rg_familiar, fa.parentesco, f.telefone, f.email, f.endereco
from assistidos a inner join familiarassistido fa on a.id_assistido = fa.id_assistido
inner join familiares f on fa.id_familiar = f.id_familiar;

CREATE VIEW vw_familiar02 AS
select f.id_familiar, a.nome_completo AS nome_assistido, a.nome_social AS nome_social_assistido, a.rg, a.cpf, a.antecedente_criminal, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois,f.nome_completo AS nome_familiar,f.rg AS rg_familiar, fa.parentesco, f.telefone, f.email, f.endereco
from assistidos a inner join familiarassistido fa on a.id_assistido = fa.id_assistido
inner join familiares f on fa.id_familiar = f.id_familiar;



-- filtrar view
SELECT * FROM vw_saude WHERE id_assistido = 1;


 -- Criando Triggers
 
 DELIMITER // 
 
 CREATE TRIGGER tr_familiar BEFORE INSERT ON familiarassistido
 FOR EACH ROW 
 BEGIN
 
	IF(	NEW.id_assistido = OLD.id_assistido AND NEW.id_familiar = OLD.id_familiar) THEN
 
		SET NEW.id_assistido = null;
		
		SET NEW.id_familiar = null;
        
	END IF;


END;

//
