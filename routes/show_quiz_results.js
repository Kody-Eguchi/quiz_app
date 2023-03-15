const express = require('express');
const router  = express.Router();

router.get('/:quiz_result_id', (req, res) => {
  res.render('show_quiz_results');
});

router.get('/api/quiz_results', (req, res) => {
  res.json(req.body);
})

module.exports = router;
