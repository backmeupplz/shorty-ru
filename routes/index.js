const express = require('express');
const router = express.Router();
const db = require('../helpers/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET to long url */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = `https://🔥🦄.ws/${id}`;
  const long = await db.findLongAddress(fullUrl)
  if (!long) {
    return next();
  }
  res.writeHead(301, {
    Location: long.original_url,
  });
  res.end();
});

module.exports = router;
