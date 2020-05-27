const Filter = require('bad-words');

const db = require('../../db.js');

const filter = new Filter();

const get = async (req, res) => {
  if (req.query.name && isValid(req.query.name)) {
    const { name } = req.query;

    const player = await db.findOne({ name });

    if (player) {
      res.json({
        player,
      });
      return;
    }
  }

  const players = await db.find({});

  res.json({
    players,
  });
};

const post = async (req, res, next) => {
  const { name } = req.body;

  if (!isValid(name)) {
    res.statusCode = 422;
    next(new Error('Name is not valid'));
    return;
  }

  const foundName = await db.findOne({ name });

  if (foundName) {
    res.statusCode = 409;
    next(new Error('Name already exists, please choose different one.'));
    return;
  }

  db.insert({ name });

  res.json({
    name,
  });
};

const deleteHandler = async (req, res, next) => {
  const { name } = req.body;

  console.log(name);

  const foundName = await db.findOne({ name });

  if (!foundName) {
    res.statusCode = 404;
    next(new Error('Provided name was not found!'));
    return;
  }

  db.remove({ name });

  res.status(200);
  res.json({});
};

function isValid(name) {
  return name
    && name.toString().trim().length >= 3
    && name.toString().trim().length <= 20
    && !filter.isProfane(name);
}

module.exports = {
  get,
  post,
  deleteHandler,
};
