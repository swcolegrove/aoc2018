'use strict';

const getInput = require('../getInput.js');
const input = getInput('../inputs/1.txt');

let output = 0;
let searching = true;
const frequencies = [0];

const runInput = () => {
  for (let i = 0; i < input.length; i++) {
    const change = input[i];

    const isNegative = change.substr(0, 1) === '-';
    const value = parseInt(change.substr(1), 10);

    output = isNegative ? output - value : output + value;
    if (!frequencies.includes(output)) {
      frequencies.push(output);
    } else {
      console.log(output);
      searching = false;
      break;
    }
  }
};

while (searching) {
  runInput();
}
