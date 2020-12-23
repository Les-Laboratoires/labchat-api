CREATE TABLE "user" {
    id varchar default generate_uuid_v4() not null,
    bot boolean not null,
    username varchar not null,
    password varchar not null,
    created_at date not null,
    owner_id varchar references "user"("id")
}

CREATE TABLE "guild" {
    id varchar default generate_uuid_v4() not null,
    name varchar(64) not null,
    icon varchar(1024) not null,
    owner_id varchar references "user"("id") not null,
    hash varchar(64) not null,
    created_at date
}

CREATE TABLE "member" {
    id varchar default generate_uuid_v4() not null,
    guild_id varchar references "guild"("id") not null,
    user_id references "user"("id") not null,
    nickname varchar(64),
    created_at date
}

CREATE TABLE "network" {
    id varchar default generate_uuid_v4() not null,
    name varchar(64) not null,
    password varchar(64),
    icon varchar(64) not null,
    description varchar(2048) not null,
    owner_id varchar references "user"("id"),
    created_at date
    
}

CREATE TABLE "channel" {
    id varchar default generate_uuid_v4() not null,
    parent_id varchar references "channel"("id"),
    name varchar(64) not null,
    guild_id references "guild"("id") not null,
    position integer not null,
    network_id references "network"("id"),
    created_at date
}

CREATE TABLE "message" {
    id varchar default generate_uuid_v4() not null,
    parent_id varchar references message("uuid"),
    content varchar not null,
    author_id varchar references "user"("id") not null,
    channel_id varchar references "channel"("id") not null
}
