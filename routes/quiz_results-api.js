const express = require('express');
const router  = express.Router();
const db = require('../db/connection');



const getUserIdByEmail = function(email) {
  const queryString = `SELECT id FROM users WHERE email = $1;`;
  const queryParams = [email];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].id;
    })
}



router.get('/', (req, res) => {

  const query = `SELECT * FROM quiz_results;`;

  db.query(query)
    .then(data => {
      const quizResults = data.rows;
      res.json({ quizResults });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



router.get('/:quiz_result_id', (req, res) => {
  const { quiz_result_id } = req.params;
  const useremail = req.cookies.username;
  getUserIdByEmail(useremail)
  .then(userId => {
    const queryString = `SELECT * FROM quiz_results WHERE id = $1 AND participant_id = $2`;
    return db.query(queryString, [quiz_result_id, userId])

  })
  .then(data => {
    console.log(data.rows);
    res.json(data.rows);
  }
  )
  .catch();



});


module.exports = router;
