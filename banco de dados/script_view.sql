



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
a.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro, s.data_de_registro, c.comorbidade, c.tipo
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;

CREATE VIEW vw_saude02 AS
select a.nome_completo, a.nome_social, s.data_de_registro, c.comorbidade, c.tipo
from assistidos a inner join saude s on a.id_assistido = s.id_assistido
inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;


CREATE VIEW vw_familiar AS
select a.id_assistido, a.id_funcionario, a.nome_completo, a.nome_social, a.rg, a.cpf, a.antecedente_criminal, a.data_nascimento, a.estado_civil, a.naturalidade,
a.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro AS data_cadastro_assistido, fa.data_cadastro, f.nome_completo AS nome_familiar,f.rg AS rg_familiar, f.parentesco, f.telefone, f.email, f.endereco
from assistidos a inner join familiarassistido fa on a.id_assistido = fa.id_assistido
inner join familiares f on fa.id_familiar = f.id_familiar;



-- filtrar view
SELECT * FROM vw_saude WHERE id_assistido = 1;

