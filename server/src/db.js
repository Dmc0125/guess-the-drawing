const monk = require('monk');

const db = monk(process.env.MONGO_URI || 'localhost/guessthedrawing');

const usersDB = db.get('users');

module.exports = {
  usersDB,
};
