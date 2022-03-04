drop database if exists caixa;
create database caixa;
use caixa;
create table lancamentos(
	id INTEGER not null PRIMARY key auto_increment,
	tipo varchar(10),
	data Date not null,
	descricao varchar(50) not null,
	valor DECIMAL(7,2)
);

insert into lancamentos VALUES
(default, "entrada", "Doação em dinheiro", curdate(), 100),
(default, "entrada", "Rifa", curdate(), 200),
(default, "entrada", "Doação PIX", curdate(),200),
(default, "entrada", "Venda de pastal", curdate(),100),
(default, "saida", "Conta de Luz", curdate(),100),
(default, "saida", "Aluguel", curdate(),1100),
(default, "saida","Telefone/Internet", curdate(),100),
(default, "saida", "Conta de água", curdate(),30);

show tables;
select * from lancamentos;

select * from lancamentos where tipo = "entrada";
select * from lancamentos where tipo = "saida";
select sum(valor) as entradas from lancamentos where tipo = "entrada";
select sum(valor) as saidas from lancamentos where tipo = "saida";
select tipo, sum(valor) as total from lancamentos group by tipo;