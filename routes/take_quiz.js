const express = require('express');
const router  = express.Router();

router.get('/:quiz_id', (req, res) => {
  res.render('take_quiz');
});

// router.post('/quiz_results', (req, res) => {
//   const pathname = window.location.pathname.split('/')
//   const quizId = pathname[pathname.length - 1]
//   res.redirect(`/show_quiz_results/${quizId}`);
// })

module.exports = router;
