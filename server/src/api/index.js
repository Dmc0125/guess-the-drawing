const express = require('express');

const players = require('./players/players.routes');

const router = express.Router();

router.use('/players', players);

module.exports = router;
