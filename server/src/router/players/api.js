const express = require('express');
const Filter = require('bad-words');

const { usersDB } = require('../../db.js');
const { sendError, messageTypes } = require('./errorMessages');

const router = express.Router();
const filter = new Filter();

const getHandler = async (req, res) => {
  if (req.query.name && isValid(req.query.name)) {
    const { name } = req.query;

    const player = await usersDB.findOne({ name });

    if (player) {
      res.json({
        player,
      });
      return;
    }
  }

  const players = await usersDB.find({});

  res.json({
    players,
  });
};

const postHandler = async (req, res, next) => {
  const { name } = req.body;

  if (!isValid(name)) {
    sendError(next, res, 422, messageTypes.NOT_VALID);
    return;
  }

  const foundName = await findName(name);

  if (foundName) {
    sendError(next, res, 409, messageTypes.ALREADY_EXISTS);
    return;
  }

  usersDB.insert({
    name,
    points: 0,
  });

  res.json({
    name,
  });
};

const patchHandler = async (req, res, next) => {
  const { socketId, name } = req.body;

  const foundName = await findName(name);

  if (!foundName) {
    sendError(next, res, 404, messageTypes.NOT_FOUND);
    return;
  }

  usersDB.update({ name }, { $set: { socketId } });

  res.json({
    name,
    socketId,
  });
};

const deleteHandler = async (req, res, next) => {
  const { name } = req.body;

  console.log(name);

  const foundName = await findName(name);

  if (!foundName) {
    sendError(next, res, 404, messageTypes.NOT_FOUND);
    return;
  }

  usersDB.remove({ name });

  res.status(200);
  res.json({});
};

async function findName(name) {
  const user = await usersDB.findOne({ name });
  return user;
}

function isValid(name) {
  return name
    && name.toString().trim().length >= 3
    && name.toString().trim().length <= 20
    && !filter.isProfane(name);
}

router.get('/', getHandler);
router.post('/', postHandler);
router.patch('/', patchHandler);
router.delete('/', deleteHandler);

module.exports = router;
