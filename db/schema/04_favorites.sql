DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  favorited BOOLEAN NOT NULL DEFAULT true
);
