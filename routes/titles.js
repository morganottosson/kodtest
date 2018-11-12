const router = require('express').Router();
const axios = require('axios');

const apiKey = 'apikey=1925addd';

router.get('/', (req, res, next) => {
  const title = req.query.input;
  axios.get(`http://www.omdbapi.com?${apiKey}`, {
      params: {
          s: title,
          r:'json',
      }
  })
  .then(response => {
      res.send(response.data.Search);
  })
  .catch(err => {
    res.status(500).end();
  })
});

module.exports = router;