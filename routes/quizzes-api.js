const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const questionsApiRoutes = require('./questions-api');
const userQueries = require('../db/queries/queryHelpers');

router.get('/', (req, res) => {
  const query = `SELECT quizzes.id, creator_id, created_at, description, category, quizzes.name, num_of_question, is_public, users.name AS username FROM quizzes JOIN users ON users.id =  creator_id WHERE is_public = TRUE;`;
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
  const userEmail = req.cookies.username;
  userQueries.getUserIdByEmail(userEmail)
  .then(data => {
    const { 'quiz-name': name, 'quiz-category': category, 'quiz-description': description, 'quiz-is_public': is_public, } = req.body;
    const queryParams = [name, data, category, description, is_public];
    const queryString = `INSERT INTO quizzes (name, creator_id, category, description, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING * `;
    return db.query(queryString, queryParams)
          .then(function(result) {
            res.status(200).json(result.rows[0]);
          })
          .catch((err) => {
            res.status(500).send(err);
          })
  });

});
router.use('/', questionsApiRoutes);
module.exports = router;
