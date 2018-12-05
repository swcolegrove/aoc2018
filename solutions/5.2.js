'use strict';

const util = require('util');
const getInput = require('../getInput.js');
const input = getInput('../inputs/5.txt', false);
const log = obj => console.log(util.inspect(obj, false, null, true));
const letterString = 'abcdefghijklmnopqrstuvqxyz';
const letters = letterString.split('');
const letterLength = [];

letters.forEach((letter) => {
  const regStr = `(${letter}|${letter.toUpperCase()})`;
  const reg = new RegExp(regStr, 'g');
  const newInput = input.replace(reg, '');

  letterLength.push({
    letter,
    count: 0,
    newInput,
  });
});


const isUpper = letter => letter === letter.toUpperCase();
const isSameLetter = (a, b) => a.toLowerCase() === b.toLowerCase();
const isDestroyed = (a, b) => isSameLetter(a, b) && !(isUpper(a) === isUpper(b));

let shortest;
letterLength.forEach((letter) => {
  log(`Running: ${letter.letter}`);
  const chars = letter.newInput.split('');
  let charIndex = 0;

  while (charIndex < chars.length - 1) {
    const char = chars[charIndex];
    const nextChar = chars[charIndex + 1];

    if (isDestroyed(char, nextChar)) {
      // Characters are the same, but not the same case
      chars.splice(charIndex, 2);
      charIndex = -1;
    }
    charIndex++;
  }

  letter.count = chars.length;
  if (!shortest || (letter.count < shortest.count)) {
    shortest = {
      letter: letter.letter,
      count: letter.count,
    };
  }
});

log(shortest);
