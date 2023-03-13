const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM answered_questions;`;
  console.log(query);
  db.query(query)
    .then(data => {
      const answeredQuestions = data.rows;
      res.json({ answeredQuestions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
