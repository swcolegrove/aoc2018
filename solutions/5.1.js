'use strict';

const util = require('util');
const getInput = require('../getInput.js');
const input = getInput('../inputs/5.txt', false);
const log = obj => console.log(util.inspect(obj, false, null, true));

// Remove all characters in the input where a capital is next to its lowercase self
// aA Bb will be removed. Remove all of these until there are none left

const isUpper = letter => letter === letter.toUpperCase();
const isSameLetter = (a, b) => a.toLowerCase() === b.toLowerCase();
const isDestroyed = (a, b) => isSameLetter(a, b) && !(isUpper(a) === isUpper(b));

const chars = input.split('');
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

log(chars.length);
