'use strict';

const fs = require('fs');

module.exports = (filePath, split = true) => {
  let input = fs.readFileSync(filePath).toString();
  if (split) {
    input = input.split('\n');
  }
  return input.trim();
};
