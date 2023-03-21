const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/queryHelpers');

router.get('/', (req, res) => {
  res.render('quiz_results');
});

router.post('/:quiz_id', (req, res) => {

  const submittedAnswers = req.body;
  const {quiz_id} = req.params;
  const userEmail = req.cookies.username;

  userQueries.markQuiz(userEmail, submittedAnswers)
  .then(async () => {
    await Promise.all(userQueries.storeAnswers(submittedAnswers));
    res.redirect(301, `/show_quiz_results/${quiz_id}`);
  })
  .catch(err => {
    res.status(500);
  });
});


module.exports = router;
