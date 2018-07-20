const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const data = {
    title: 'Celebrities and Movies'
  }
  res.render('index', data);
});

module.exports = router;
