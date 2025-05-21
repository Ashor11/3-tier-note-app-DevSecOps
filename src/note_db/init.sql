CREATE DATABASE note;

\c note;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text TEXT
);