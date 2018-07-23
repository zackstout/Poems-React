
create table poems (
    poem_id serial primary key,
    author varchar(100),
    title varchar(300),
    linecount int
);

create table lines (
    line_id serial primary key,
    poem_id int references poems,
    line varchar(400),
    lineNo int
);

create table user_poems (
    id serial primary key,
    user_poem_id int,
    original_line_id int references lines,
    author varchar(100),
    title varchar(100)
);

create table poem_likes (
    id serial primary key,
    poem_id int references user_poems,
    likes int default 0
);