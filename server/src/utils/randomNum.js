const generateRandomNum = (max, min = 0) => Math.floor(Math.random() * max) + min;

module.exports = generateRandomNum;
