'use strict';

const getInput = require('../getInput.js');
const input = getInput('../inputs/2.txt');
const requiredMatchLength = input[0].length - 1;

while (input.length > 1) {
  const row = input.splice(0, 1)[0];
  let matches = 0;

  input.forEach((compareRow) => {
    matches = 0;
    let noMatch = null;
    for (let i = 0; i < compareRow.length; i++) {
      const rowLetter = row.charAt(i);
      const compareRowLetter = compareRow.charAt(i);
      if (rowLetter === compareRowLetter) {
        matches++;
      } else {
        noMatch = i;
      }

      if (matches === requiredMatchLength) {
        console.log(row, compareRow);
        console.log(row.substr(0, noMatch) + row.substr(noMatch + 1));
      }
    }
  });
}
