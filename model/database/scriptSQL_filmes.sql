#Cria o data base do projeto de filmes
create database db_filmes_20261;

#Ativa o uso do database de filmes
use db_filmes_20261;

#cria a tabela de filmes
create table tbl_filme (
	id				 int not null primary key auto_increment,
    nome 			 varchar(80) not null,
    data_lancamento  date not null,
    duracao 		 time not null,
    sinopse 		 text not null,
    avaliacao 		 decimal (3,2) default null,
    valor 			 decimal(5,2) not null default 0,
    capa 			 varchar(255)

);
show tables;

#Inserir dados
insert into tbl_filme(
						nome,
                        data_lancamento,
                        duracao,
                        sinopse,
                        avaliacao,
                        valor,
                        capa)
						values (
                        'Super Mario Galaxy: O Filme',
                        '2026-04-02',
                        '01:39:00',
                        'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
                        '3',
                        '50.70',
                        'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'
                        );
                        
select * from tbl_filme;   
select * from tbl_filme order by id desc;     # Mostra a tabela de filmes de tras para frente ;   

delete from tbl_filme where id > 0 ;
delete from tbl_filme where id = 15;

create table tbl_classificacao(
	id 						int not null primary key auto_increment,
    descricao_indicativa	varchar(45) not null,		
    idade					int not null
);

insert into tbl_classificacao(
	descricao_indicativa,
    idade)
    values(
    'Conteúdo com violência fantasiosa ou leve',
    '12'
    );
desc tbl_classificacao;
SELECT * FROM tbl_classificacao;
