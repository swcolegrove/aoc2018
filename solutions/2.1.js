'use strict';

const getInput = require('../getInput.js');
const input = getInput('../inputs/2.txt');

let twos = 0;
let threes = 0;

for (let i = 0; i < input.length; i++) {
  const row = input[i];
  let hasTwo = false;
  let hasThree = false;
  const uniqueLetters = row.split('').filter((item, index, arr) => arr.indexOf(item) === index);

  uniqueLetters.forEach((letter) => {
    const reg = new RegExp(letter, 'g');
    const count = (row.match(reg) || []).length;

    if (count === 3 && !hasThree) {
      threes += 1;
      hasThree = true;
    } else if (count === 2 && !hasTwo) {
      twos += 1;
      hasTwo = true;
    }
  });
}

console.log(twos * threes);
