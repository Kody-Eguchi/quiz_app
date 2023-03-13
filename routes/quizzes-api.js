/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const questionsApiRoutes = require('./questions-api');



router.get('/', (req, res) => {
  const query = `SELECT * FROM quizzes WHERE is_public = TRUE;`;
  console.log(query);
  db.query(query)
    .then(data => {
      const quizzes = data.rows;
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { 'quiz-name': name, 'quiz-category': category, 'quiz-description': description, 'quiz-is_public': is_public } = req.body;
  // res.status(200).end();
  const queryParams = [name, category, description, is_public];
      db.query(`INSERT INTO quizzes (name, category, description, is_public)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, queryParams)
        .then(function(result) {
          console.log(result.rows[0]);
          res.status(200).json(result.rows[0]);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        })
});


router.use('/', questionsApiRoutes);
module.exports = router;
