const messages = require('../constants/messages');

const sendError = (next, res, code, message) => {
  res.statusCode = code;
  const error = new Error(messages[message]);
  next(error);
};

module.exports = sendError;
