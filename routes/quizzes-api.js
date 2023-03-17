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

const getUserIdByEmail = function(email) {
  const queryString = `SELECT id FROM users WHERE email = $1;`;
  const queryParams = [email];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].id;
    })
}




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
  console.log(req.body);
  const userEmail = req.cookies.username;
  getUserIdByEmail(userEmail)
  .then(data => {
    console.log(data);
    const { 'quiz-name': name, 'quiz-category': category, 'quiz-description': description, 'quiz-is_public': is_public, } = req.body;
    const queryParams = [name, data, category, description, is_public];
       return db.query(`INSERT INTO quizzes (name, creator_id, category, description, is_public)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
          `, queryParams)
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
