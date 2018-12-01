'use strict';

const getInput = require('../getInput.js');
const input = getInput('../inputs/1.txt');

let output = 0;

input.forEach((frequencuy) => {
  const isNegative = frequencuy.substr(0, 1) === '-';
  const value = parseInt(frequencuy.substr(1), 10);

  output = isNegative ? output - value : output + value;
});

console.log(output);
