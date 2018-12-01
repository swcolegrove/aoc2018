'use strict';

const fs = require('fs');

module.exports = (filePath) => {
  const input = fs.readFileSync(filePath).toString().split('\n');
  return input;
};
