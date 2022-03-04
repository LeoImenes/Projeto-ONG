drop database if exists caixa;
create database caixa;
use caixa;
create table entradas(
	id INTEGER not null PRIMARY key auto_increment,
	data Date not null,
	descricao varchar(50) not null,
	valor DECIMAL(7,2)
);

create table saidas(
	id INTEGER not null PRIMARY key auto_increment,
	data Date not null,
	descricao varchar(50) not null,
	valor DECIMAL(7,2)
);

insert into entradas VALUES
(default, "Doação em dinheiro", curdate(), 100),
(default, "Rifa", curdate(), 200),
(default, "Doação PIX", curdate(),200),
(default, "Venda de pastal", curdate(),100);

insert into saidas VALUES
(default, "Conta de Luz", curdate(),100),
(default, "Aluguel", curdate(),1100),
(default, "Telefone/Internet", curdate(),100),
(default, "Conta de água", curdate(),30);

show tables;
select * from entradas;
select * from saidas;

select sum(valor) from entradas;
select sum(valor) from saidas;
select 
	sum(e.valor) as entradas,
	sum(s.valor) as saidas,
	sum(e.valor) - sum(s.valor) as saldo
	from entradas e inner join saidas s 
	on e.data = s.data;