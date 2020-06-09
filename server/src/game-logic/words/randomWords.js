const words = require('./words');
const generateRandomNum = require('../../utils/randomNum');


const getWords = () => {
  let lastIdx;

  const wordsIdx = Array.from({ length: 3 }, () => {
    let randomIdx = generateRandomNum(words.length);

    while (randomIdx === lastIdx) {
      randomIdx = generateRandomNum(words.length);
    }

    lastIdx = randomIdx;
    return randomIdx;
  });

  return wordsIdx.map(idx => words[idx]);
};

module.exports = getWords;
