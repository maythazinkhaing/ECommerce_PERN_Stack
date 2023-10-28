CREATE DATABASE ecommerce;

CREATE TABLE product_category (
    category_id   SERIAL      PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL
)

CREATE TABLE product (
    product_id      SERIAL      PRIMARY KEY,
    category_id     INTEGER     REFERENCES product_category(category_id),
    product_name    VARCHAR(30) NOT NULL,
    description     VARCHAR(50) NOT NULL,
    qty_instock     INTEGER     NOT NULL,
    picture_path    VARCHAR(50) NOT NULL 
    feature         BOOLEAN                     
    createdAt       TIMESTAMP NOW()     
    updatedAt       TIMESTAMP NOW()     
)

