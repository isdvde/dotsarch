var express = require('express');
var router = express.Router();

router.use('/v1', require('./v1/router'))

module.exports = router;
