DROP DATABASE IF EXISTS todo_db;

CREATE DATABASE todo_db;

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS completed;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY NOT NULL,
    task TEXT NOT NULL
);

CREATE TABLE completed (
    id SERIAL PRIMARY KEY NOT NULL,
    completedtask TEXT NOT NULL
);
