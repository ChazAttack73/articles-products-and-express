\timing

DROP USER IF EXISTS chaz;

CREATE USER chaz WITH ENCRYPTED PASSWORD 'postgres';

DROP DATABASE IF EXISTS products_and_articles;

CREATE DATABASE products_and_articles;

\c products_and_articles


DROP TABLE IF EXISTS product_list;

CREATE TABLE product_list
(
  "id" serial NOT NULL,
  PRIMARY KEY ( "id" ),
  "name" varchar( 100 ) NOT NULL,
  "price" int NOT NULL,
  "inventory" int NOT NULL DEFAULT 0
);


DROP TABLE IF EXISTS author_list;

CREATE TABLE author_list
(
  "id" serial NOT NULL,
  PRIMARY KEY ( "id" ),
  "first_name" varchar( 80 ) NOT NULL,
  "last_name" varchar( 80 ) DEFAULT NULL
);


DROP TABLE IF EXISTS article_list;

CREATE TABLE article_list
(
  "id" serial NOT NULL,
  PRIMARY KEY ( "id" ),
  "title" varchar( 100 ) NOT NULL,
  "content" text NOT NULL,
  "url_title" varchar( 255 ) DEFAULT NULL,
  "author_list_id" int NOT NULL REFERENCES author_list MATCH FULL
);


INSERT INTO product_list ( name, price, inventory )
VALUES
  ( 'beer', 1000, 10 ),
  ( 'boxed-wine', 2000, 20 ),
  ( 'wine', 3000, 30 ),
  ( 'sake', 4000, 40 ),
  ( 'snake sake', 5000, 50 ),
  ( 'soju', 6000, 60 )
;


INSERT INTO author_list ( first_name, last_name )
VALUES
  ( 'JK', 'Rowling' ),
  ( 'Edgar Allen', 'Poe' ),
  ( 'Malcom', 'Gladwell' ),
  ( 'Tim', 'Ferris' ),
  ( 'Joe', 'Mama' )
;


INSERT INTO article_list ( title, content, author_list_id )
VALUES
  ( 'The Title', 'This is my conent', 5 ),
  ( 'Harry Potter', 'Muggles!', 1 ),
  ( 'Outliers', 'Numbers are hard', 3 ),
  ( 'Blink', '20,000 hours', 3 ),
  ( 'Harry Potter 2', 'Petronum', 1 ),
  ( 'Harry Potter 3', 'Dubledore, he ded', 1 ),
  ( 'Stuff About Crows', 'Evermore', 2 ),
  ( '4-Hour Work Week', 'Work smart, not hard', 4 ),
  ( '4-Hour Chef', 'Learn how to learn', 4 ),
  ( 'Your Mother is Fat', 'Do not talk about my mama!', 5 )
;


SELECT * FROM product_list;
SELECT * FROM author_list;
SELECT * FROM article_list;