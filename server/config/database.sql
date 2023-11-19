CREATE DATABASE ecommerce;

CREATE TABLE product_category (
    category_id   SERIAL      PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL
)

CREATE TABLE product (
    product_id      SERIAL      PRIMARY KEY,
    category_id     INTEGER     REFERENCES product_category(category_id),
    product_name    VARCHAR(50) NOT NULL,
    price           INTEGER     NOT NULL,
    description     VARCHAR(300) NOT NULL,
    qty_instock     INTEGER     NOT NULL,
    picture_path    VARCHAR(100) NOT NULL ,
    feature         BOOLEAN, 
    status          BOOLEAN,                  
    createdAt       TIMESTAMP,     
    updatedAt       TIMESTAMP
    );

CREATE TABLE admin (
    id              SERIAL      PRIMARY KEY,
    username        VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL,
    password        VARCHAR(100) NOT NULL
    );
