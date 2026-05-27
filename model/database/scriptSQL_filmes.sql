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
desc tbl_genero;
SELECT * FROM tbl_classificacao des;

UPDATE tbl_classificacao SET
    descricao_indicativa = 'teste',
    idade = '20'
WHERE id = 5;

SELECT * FROM tbl_classificacao WHERE id = 1;

create table tbl_genero(
	id 						int not null primary key auto_increment,
    nome					varchar(45) not null,		
    descricao				int not null
);

insert into tbl_genero(
	nome,
    descricao)
    values(
    'Teste insert - nome',
    'Teste insert - descricao'
);

create table tbl_plataformas(
	id 						int not null primary key auto_increment,
	img						varchar(250) not null
);

alter table tbl_plataformas add column nome varchar(25) not null;


select * from tbl_filme; 

select tbl_filme.*
                   from  tbl_filme
                        inner join tbl_filme_genero
                          on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                          on tbl_genero.id = tbl_filme_genero.id_genero  
					             where tbl_genero.id = 2;


create table tbl_plataformas_filme(
	id 						int not null primary key auto_increment,	
	id_filme				int not null,
    id_plataformas			int not null,
    
    constraint FK_PLATAFORMASFILME_FILME
    foreign key (id_filme)
	references tbl_filme(id),
    
    constraint FK_PLATAFORMASFILME_PLATAFORMA
    foreign key (id_plataformas)
    references tbl_plataformas(id)
);
select * from tbl_plataformas_filme; 

SELECT tbl_filme.*
FROM tbl_filme
    INNER JOIN tbl_plataformas_filme
        ON tbl_filme.id = tbl_plataformas_filme.id_filme
    INNER JOIN tbl_plataformas
        ON tbl_plataformas.id = tbl_plataformas_filme.id_plataformas
WHERE tbl_plataformas.id = 4;