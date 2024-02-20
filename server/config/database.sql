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

CREATE TABLE users (
    id              SERIAL      PRIMARY KEY,
    username        VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL,
    password        VARCHAR(100) NOT NULL
    );

CREATE TABLE user_cart (
    cart_id         SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id),
    product_id      INTEGER REFERENCES product(product_id) ON DELETE CASCADE,
    quantity        INT
);

CREATE TABLE order (
    order_id            SERIAL PRIMARY KEY,
    cart_id             INTEGER REFERENCES user_cart(cart_id),
    subTotal            INTEGER,
    total               INTEGER,
    shipping_address    JSONB,

)



--  ALTER TABLE product ALTER COLUMN createdAt SET DEFAULT CURRENT_TIMESTAMP;