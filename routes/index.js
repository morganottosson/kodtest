const express = require('express');
const router = express.Router();

router.use('/titles', require('./titles'));
router.use('/search', require('./search'))

module.exports = router;