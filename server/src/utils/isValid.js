const Filter = require('bad-words');

const filter = new Filter();

function isValid(name) {
  return name
    && name.toString().trim().length >= 3
    && name.toString().trim().length <= 20
    && !filter.isProfane(name);
}

module.exports = isValid;
