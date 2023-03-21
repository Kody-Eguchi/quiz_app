const { query, response } = require('express');
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:quiz_id', (req, res) => {
  const quiz_id = req.params.quiz_id;
  const query = `
    SELECT questions.id, quiz_id, question, option_1, option_2, option_3, option_4, quizzes.name, quizzes.num_of_question, quizzes.category FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE quiz_id = ${quiz_id};
  `;

  db.query(query)
    .then(data => {
      const questions = data.rows;
      res.json({ questions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

router.post('/:quiz_id', (req, res) => {

  const { question, option1, option2, option3, option4, 'correct-answer': correctAnswer } = req.body;
  const { quiz_id } = req.params;
  const queryParams = [quiz_id, question, correctAnswer, option1, option2, option3, option4];

  db.query(`INSERT INTO questions (quiz_id, question, correct_answer, option_1, option_2, option_3, option_4)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`, queryParams)
  .then(data => {
    db.query(`
      UPDATE quizzes
      SET num_of_question = (
        SELECT count(questions.*) AS num_of_question
        FROM quizzes JOIN questions ON quiz_id = quizzes.id
        WHERE quiz_id = ${quiz_id})
      WHERE id = ${quiz_id};`);
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send('error', err.message);
  })
  ;


})
module.exports = router;
