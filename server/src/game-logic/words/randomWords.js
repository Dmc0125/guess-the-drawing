const words = require('./words');

const generateRandomNum = (max, min = 0) => Math.floor(Math.random() * max) + min;

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
