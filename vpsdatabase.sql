-- name,calories,total_fat,saturated_fat,cholesterol,sodium,carbohydrate,fiber,sugars

CREATE TABLE movies (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL
);
CREATE TABLE books (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL
);

INSERT INTO movies (title)
VALUES  
  ('Gladiator'),
  ('Braveheart'),
  ('Forrest Gump'),
  ('Blood Diamond'),
  ('Lord of War'),
  ('Law Abiding Citizen'),
  ('The Departed');
INSERT INTO books (title)
VALUES  
 ('A Tale of Two Cities'),
 ('Harry Potter and the Sorceror''s Stone'),
 ('Red Mars'),
 ('Redwall'),
 ('A Hitchhiker''s Guide to the Galaxy'),
 ('Guinness Book of World Records'),
 ('The DaVinci Code');


