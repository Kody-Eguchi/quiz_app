DROP TABLE IF EXISTS quiz_results CASCADE;

CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  participant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  number_of_correct_answer INTEGER NOT NULL,
  number_of_wrong_answer INTEGER NOT NULL,
  result INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT Now(),
  num_of_attempt INTEGER DEFAULT 1
);
