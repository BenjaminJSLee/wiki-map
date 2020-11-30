DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  img_url VARCHAR(255),
  lat FLOAT NOT NULL,
  long FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
