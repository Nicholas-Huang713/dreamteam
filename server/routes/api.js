const express = require('express');
const users = require('./user');
const articles = require('./article');
const router = express.Router();

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;