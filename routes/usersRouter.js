const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/queryHelpers');

router.get('/', async(req, res) => {
  res.render('users');

});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  const queryParams = [name, email, password];
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING * `;
  db.query(queryString, queryParams)
   .then(response => {
    res.status(200)
    res.cookie('username', email)
    res.redirect('/');
  })
   .catch(err => console.log('Error: ', err));
});

module.exports = router;
