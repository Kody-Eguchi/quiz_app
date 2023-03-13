const { query } = require('express');
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:quiz_id/questions', (req, res) => {
  // const query = `SELECT * FROM questions;`;
  // console.log(query);
  // db.query(query)
  //   .then(data => {
  //     const questions = data.rows;
  //     res.json({ questions });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });

});

router.post('/:quiz_id/questions', (req, res) => {

  const { question, option1, option2, option3, option4, 'correct-answer': correctAnswer } = req.body;

  const queryParams = [req.params.quiz_id, question, option1, option2, option3, option4, correctAnswer];

  db.query(`INSERT INTO questions (quiz_id, question, correct_answer, option_1, option_2, option_3, option_4)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`, queryParams);
})
module.exports = router;
