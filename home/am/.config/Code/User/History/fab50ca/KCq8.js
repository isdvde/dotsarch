var express = require('express');
var router = express.Router();

router.use('/api/v1', require('./v1/router'))

module.exports = router;
