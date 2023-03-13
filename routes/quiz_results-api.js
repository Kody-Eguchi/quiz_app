const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM quiz_results;`;
  console.log(query);
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

module.exports = router;
