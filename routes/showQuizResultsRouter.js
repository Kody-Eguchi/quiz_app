const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/queryHelpers');


router.get('/:quiz_result_id', async(req, res) => {

  const userEmail = req.cookies.username;
  if (!userEmail) {
    return res.redirect('/login');
  }
  const username = await userQueries.getUserNameByEmail(userEmail);
  const templatedVars ={
    username: username
  };
  res.render('show_quiz_results', templatedVars);
});

router.get('/:quiz_result_id/json', (req, res) => {
  res.json(req.body);
})

module.exports = router;
