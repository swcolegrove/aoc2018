'use strict';

const getInput = require('../getInput.js');
const input = getInput('../inputs/3.txt');
const plots = {};

const claims = input.map((str) => {
  str = str.replace(' ', '');
  str = str.replace(/#/g, '');
  const arr = str.split(/[\s,@:x]+/);
  return {
    id: parseInt(arr[0], 10),
    left: parseInt(arr[1], 10),
    top: parseInt(arr[2], 10),
    width: parseInt(arr[3], 10),
    height: parseInt(arr[4], 10),
  };
});

claims.forEach((claim) => {
  for (let x = claim.left; x < claim.left + claim.width; x++) {
    for (let y = claim.top; y < claim.top + claim.height; y++) {
      const plot = `${x}.${y}`;
      plots[plot] = (plots[plot] || 0) + 1;
    }
  }
});

const overlaps = Object.values(plots).filter(claim => claim > 1).length;

console.log(overlaps);
