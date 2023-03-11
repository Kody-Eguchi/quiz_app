DROP TABLE IF EXISTS answered_questions CASCADE;
CREATE TABLE answered_questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  given_answer VARCHAR(255) NOT NULL
);
