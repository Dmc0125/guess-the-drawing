const messageTypes = {
  NOT_FOUND: 'NOT_FOUND',
  NOT_VALID: 'NOT_VALID',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
};

const messages = {
  NOT_FOUND: 'Provided name was not found!',
  NOT_VALID: 'Name is not valid!',
  ALREADY_EXISTS: 'Name already exists, please choose different one.',
};

const sendError = (next, res, code, message) => {
  res.statusCode = code;
  const error = new Error(messages[message]);
  next(error);
};

module.exports = {
  sendError,
  messageTypes,
};
