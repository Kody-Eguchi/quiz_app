DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT Now(),
  description TEXT,
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  num_of_question INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE
);
