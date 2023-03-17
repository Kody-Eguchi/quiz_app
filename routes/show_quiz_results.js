const express = require('express');
const router  = express.Router();

router.get('/:quiz_result_id', (req, res) => {

  res.render('show_quiz_results');
});

router.get('/:quiz_result_id/json', (req, res) => {
  res.json(req.body);
})

module.exports = router;
