-- create database interactive
--     with owner root;

create table usuarios
(
    id_usuarios serial not null
        constraint usuarios_pk
            primary key,
    nome_usuario varchar(200) not null,
    email varchar(300) not null,
    senha varchar(45) not null,
    ativo boolean default true not null,
    data_cadastro timestamp default CURRENT_TIMESTAMP not null,
    data_atualizacao timestamp
);

comment on table usuarios is 'Tabela de usuários do sistema';

comment on column usuarios.id_usuarios is 'chave prmaria da tabela Usuarios';

comment on column usuarios.nome_usuario is 'Nome completo do usuario';

comment on column usuarios.email is 'E-mail do usuario, tanbem utilizado para login ';

comment on column usuarios.senha is 'senha do usuario criptografaga em bcrypt';

comment on column usuarios.ativo is 'Status do usuario 1 = ativo 0 = inativo';

comment on column usuarios.data_cadastro is 'Data de cadastro do usuario';

comment on column usuarios.data_atualizacao is 'Data de atualizaçao do usuario, esta coluna e sempre altera pela aplicaçao ao aterar os dados do usuario';

alter table usuarios owner to root;

create unique index usuarios_email_uindex
    on usuarios (email);

create table cursos
(
    id_cursos serial not null
        constraint cursos_pk
            primary key,
    nome_curso varchar(100) not null,
    descricao_curso varchar(2000) not null,
    imagem_curso varchar(200) not null,
    ativo boolean default true not null,
    data_cadastro timestamp default CURRENT_TIMESTAMP not null,
    data_atualizacao timestamp default CURRENT_TIMESTAMP
);

comment on table cursos is 'Tabela de cursos do sitema';

comment on column cursos.id_cursos is 'Chave primaaria da tabela de Cursos';

comment on column cursos.nome_curso is 'Nome do curso, deve ser unico.';

comment on column cursos.descricao_curso is 'Descriçao do curso, aqui sera inserido os detalhes do curso';

comment on column cursos.imagem_curso is 'Nome da imagem do curso que ira aparecer no catalogo';

comment on column cursos.ativo is 'Status do curso 1 = ativo 0 = inativo';

comment on column cursos.data_cadastro is 'Data de cadastro do curso';

comment on column cursos.data_atualizacao is 'Data de atualizaçao do curso, esta coluna e sempre altera pela aplicaçao ao aterar os dados do curso';

alter table cursos owner to root;

create unique index cursos_imagemcurso_uindex
    on cursos (imagem_curso);

create unique index cursos_nomecurso_uindex
    on cursos (nome_curso);

create table videos
(
    id_videos serial not null
        constraint videos_pk
            primary key,
    titulo_video varchar(100) not null,
    nome_video varchar(100) null,
    ativo boolean default true not null,
    data_cadastro timestamp default CURRENT_TIMESTAMP not null,
    data_atualizacao timestamp
);

comment on table videos is 'Tabela com os videos d sistema';

comment on column videos.id_videos is 'Chave primaria da tabela de videos';

comment on column videos.titulo_video is 'Titulo do video';

comment on column videos.nome_video is 'Nome do video, deve ser unico, gerado pela aplicacao como md5 do timestamp';

comment on column videos.ativo is 'Status do video 1 = ativo 0 = inativo';

alter table videos owner to root;

create unique index videos_nomevideo_uindex
    on videos (nome_video);

create unique index videos_titulovideo_uindex
    on videos (titulo_video);

create table perguntas
(
    id_perguntas serial not null
        constraint perguntas_pk
            primary key,
    descricao_pergunta varchar(400) not null,
    ativo boolean default true not null,
    data_cadastro timestamp default CURRENT_TIMESTAMP not null,
    data_atualizacao timestamp
);

comment on table perguntas is 'Tabela de perguntas do sistema que aparecem nos videos';

comment on column perguntas.descricao_pergunta is 'Descriçao da pergunta que aparece no video';

comment on column perguntas.ativo is 'Status da pergunta 1 = ativo 0 = inativo';

comment on column perguntas.data_cadastro is 'Data de cadastro da pergunta';

comment on column perguntas.data_atualizacao is 'Data de atualizacao da pergunta, atualizada pelo sistema sempre que a pergunta tiver alteraçao';

alter table perguntas owner to root;

create unique index perguntas_descricaopergunta_uindex
    on perguntas (descricao_pergunta);

create table respostas
(
    id_respostas serial not null
        constraint respostas_pk
            primary key,
    id_perguntas integer not null
        constraint respostas_perguntas_idperguntas_fk
            references perguntas,
    descricao_resposta varchar(50) not null,
    correta boolean default false not null,
    ativo boolean default true,
    data_cadastro timestamp default CURRENT_TIMESTAMP not null,
    data_atualizacao timestamp
);

comment on table respostas is 'Tabela de repostas para as perguntas';

comment on column respostas.id_respostas is 'Chave primaria da tabela de respostas';

comment on column respostas.id_perguntas is 'Chave estrangeira para tabela de perguntas, uma pergunta tem varias respostas';

comment on column respostas.descricao_resposta is 'Descrição da resposta';

comment on column respostas.correta is 'Resposta correta = 1 errada = 0';

comment on column respostas.ativo is 'Status da reposta 1 = ativo 0 = inativo ';

comment on column respostas.data_cadastro is 'Data de cadastro da resposta';

comment on column respostas.data_atualizacao is 'Data de atualizaçao da resposta, atualizado pela aplicaçao sempre que a resposta for alterada';

alter table respostas owner to root;

create table usuario_cursos
(
    id_usuarios integer not null
        constraint usuariocursos_usuarios_idusuarios_fk
            references usuarios,
    id_cursos integer not null
        constraint usuariocursos_cursos_idcursos_fk
            references cursos
);

alter table usuario_cursos owner to root;

create unique index usuariocursos_idsusuarios_idcursos_uindex
    on usuario_cursos (id_usuarios, id_cursos);

create table curso_videos
(
    id_cursos integer
        constraint cursovideos_cursos_idcursos_fk
            references cursos,
    id_videos integer
        constraint cursovideos_videos_idvideos_fk
            references videos
);

alter table curso_videos owner to root;

create unique index cursovideos_idvideos_idcursos_uindex
    on curso_videos (id_videos, id_cursos);

create table videos_perguntas
(
    id_videos integer not null
        constraint videosperguntas_videos_idvideos_fk
            references videos,
    id_perguntas integer not null
        constraint videosperguntas_perguntas_idperguntas_fk
            references perguntas,
    aparecer_em time not null
);

alter table videos_perguntas owner to root;

create unique index videosperguntas_idvideos_idperguntas_uindex
    on videos_perguntas (id_videos, id_perguntas);


