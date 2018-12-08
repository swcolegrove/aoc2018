'use strict';

const util = require('util');
const getInput = require('../getInput.js');
const input = getInput('../inputs/7.txt');
const log = obj => console.log(util.inspect(obj, false, null, true));

const letters = {};
const befores = {};
let available = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let order = '';

input.forEach((step) => {
  // A must be completed before B can begin
  const a = step.substr(5, 1);
  const b = step.substr(36, 1);
  // Find out the starting letters by removing any that are prerequisites
  available = available.replace(b, '');

  if (!letters[a]) {
    letters[a] = {
      nextLetters: [],
    };
  }

  if (!befores[b]) {
    befores[b] = {
      prevLetters: [],
    };
  }

  letters[a].nextLetters.push(b);
  befores[b].prevLetters.push(a);
});

const isDone = (checkLetter) => {
  // have the required letters for this letter already run
  let add = true;
  befores[checkLetter].prevLetters.forEach((letter) => {
    if (!order.includes(letter)) {
      add = false;
    }
  });
  return add;
};

log(available); // Starting letters
while (available.length > 0) {
  const current = available.substr(0, 1);
  available = available.replace(current, '');
  order += current;

  const addLetters = [];
  if (letters[current]) {
    // Check the next letters that run after this letter and add them to the available next letters
    letters[current].nextLetters.forEach((letter) => {
      available = available.replace(letter, '');
      if (!order.includes(letter) && isDone(letter)) {
        addLetters.push(letter);
      }
    });
    const nextLetters = addLetters.concat(available.split('')).sort();
    available = nextLetters.join('');
  }
}

log(order);
