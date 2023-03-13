const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM questions;`;
  console.log(query);
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

module.exports = router;
