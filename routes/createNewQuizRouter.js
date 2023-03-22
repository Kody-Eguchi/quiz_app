const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/queryHelpers');


router.get('/', async(req, res) => {
  const userEmail = req.cookies.username;
  if (!userEmail) {
    return res.redirect('/login');
  }
  const username = await userQueries.getUserNameByEmail(userEmail);
  const templatedVars ={
    username: username
  };
  res.render('create_new_quiz', templatedVars);
});

router.post('/', (req, res) => {
  res.send(req.body);
})
module.exports = router;
