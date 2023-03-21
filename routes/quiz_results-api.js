const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const userQueries = require('../db/queries/queryHelpers');

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
  userQueries.getUserIdByEmail(useremail)
  .then(userId => {
    const queryString = `SELECT * FROM quiz_results
                          WHERE quiz_id = $1
                          AND participant_id = $2
                          ORDER BY completed_at DESC
                          LIMIT 1`;
    return db.query(queryString, [quiz_result_id, userId])
  })
  .then(data => {
    res.json(data.rows);
  })
  .catch();
});


module.exports = router;
