DROP DATABASE IF EXISTS my_db ;
CREATE DATABASE my_db ;
USE my_db
CREATE TABLE users (
    id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    secretinfo varchar(150) NOT NULL,
    password varchar(250) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);