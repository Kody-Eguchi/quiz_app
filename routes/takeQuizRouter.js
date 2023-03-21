const express = require('express');
const router  = express.Router();

router.get('/:quiz_id', (req, res) => {
  res.render('take_quiz');
});

module.exports = router;
