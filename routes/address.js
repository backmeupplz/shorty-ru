const express = require('express');
const router = express.Router();
const shorten = require('../helpers/shorten');
const validUrl = require('valid-url');

router.post('/', async (req, res, next) => {
  const longUrl = req.body.long_url;

  if (!longUrl || !validUrl.isUri(longUrl)) {
    return res.send({ 
      success: false,
      error: 'Please provide a valid url',
    });
  }

  try {
    const resultUrl = await shorten.shorten(longUrl);
    res.send({
      success: true,
      result: resultUrl,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
