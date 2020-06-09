const express = require('express');

const { usersDB } = require('../../db.js');
const isValid = require('../../utils/isValid');
const sendError = require('../../utils/sendError');
const messagesTypes = require('../../constants/messagesTypes');

const router = express.Router();

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
    sendError(next, res, 422, messagesTypes.NOT_VALID);
    return;
  }

  const foundName = await findName(name);

  if (foundName) {
    sendError(next, res, 409, messagesTypes.ALREADY_EXISTS);
    return;
  }

  usersDB.insert({
    name,
    points: 0,
    isDrawer: false,
  });

  res.json({
    name,
  });
};

const patchHandler = async (req, res, next) => {
  const { socketId, name } = req.body;

  const foundName = await findName(name);

  if (!foundName) {
    sendError(next, res, 404, messagesTypes.NOT_FOUND);
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

  const foundName = await findName(name);

  if (!foundName) {
    sendError(next, res, 404, messagesTypes.NOT_FOUND);
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

router.get('/', getHandler);
router.post('/', postHandler);
router.patch('/', patchHandler);
router.delete('/', deleteHandler);

module.exports = router;
