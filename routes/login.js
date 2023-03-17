const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const queryString = 'SELECT * FROM users WHERE email = $1';

  db.query(queryString, [email])
  .then((data) => {
    if (!data.rows[0]) {
      res.send('Invalid login');
    }

    res.cookie('username', email)
    res.redirect('/');
  })
  .catch(err => {
    console.log('Error: ', err);
  });


})
module.exports = router;
