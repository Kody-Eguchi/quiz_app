const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


router.get('/', (req, res) => {
  res.render('quiz_results');
});

// URL should be wildcard /:id
router.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);

//   const queryStringOne = `
//     INSERT INTO answered_questions (question_id, given_answer)
//     VALUES ($1, $2);
//   `;
// db.query()
// .then()
// .catch();

})


module.exports = router;
