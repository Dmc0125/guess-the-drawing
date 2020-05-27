const monk = require('monk');

const db = monk(process.env.MONGO_URI || 'localhost/guessthedrawing');
const users = db.get('users');

module.exports = users;
