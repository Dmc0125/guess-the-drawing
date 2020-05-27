const express = require('express');

const { get, post, deleteHandler } = require('./handlers');

const router = express.Router();

router.get('/', get);
router.post('/', post);
router.delete('/', deleteHandler);

module.exports = router;
