'use strict';

const util = require('util');
const getInput = require('../getInput.js');
const input = getInput('../inputs/4.txt');
const log = obj => console.log(util.inspect(obj, false, null, true));

// Which guard is asleep the most. And which minute does the guard spend asleep most often

// sort entries by date
input.sort((a, b) => {
  const aDate = `${a.substr(1, 16).replace(' ', 'T')}:00`;
  const bDate = `${b.substr(1, 16).replace(' ', 'T')}:00`;
  return new Date(aDate) - new Date(bDate);
});

const guards = {};

let currentGuardId = '';
let sleepStartTimestamp;
input.forEach((logEntry) => {
  const date = new Date(`${logEntry.substr(1, 16).replace(' ', 'T')}:00`);
  const timeStamp = {
    date,
    isAwake: true,
  };
  const activity = logEntry.substr(19).toLowerCase();
  if (activity === 'wakes up') {
    // generate sleep times

    // Log all the time between falling asleep and waking up
    const sleepEnds = timeStamp.date.getTime();
    let sleepStarts = sleepStartTimestamp.date.getTime();
    while (sleepStarts < sleepEnds) {
      sleepStarts += (1000 * 60);
      if (sleepStarts < sleepEnds) {
        const sleepStamp = {
          date: new Date(sleepStarts),
          isAwake: false,
        };
        guards[currentGuardId].timeStamps.push(sleepStamp);
        guards[currentGuardId].sleepCount++;
      }
    }
    guards[currentGuardId].timeStamps.push(timeStamp);
  } else if (activity === 'falls asleep') {
    // counts as asleep
    timeStamp.isAwake = false;
    guards[currentGuardId].timeStamps.push(timeStamp);
    guards[currentGuardId].sleepCount++;
    sleepStartTimestamp = timeStamp;
  } else {
    const guard = activity.replace(/\s/g, '').replace('guard', '').replace('beginsshift', '').replace('#', '');
    currentGuardId = guard;

    if (!guards[currentGuardId]) {
      guards[currentGuardId] = {
        sleepCount: 0,
        timeStamps: [],
      };
    }
    guards[currentGuardId].timeStamps.push(timeStamp);
  }
});

let highest = {
  id: 0,
  sleepCount: 0,
};

Object.keys(guards).forEach((key) => {
  const { sleepCount } = guards[key];
  if (sleepCount > highest.sleepCount) {
    highest = {
      id: key,
      ...guards[key],
    };
  }
});

const minutes = {};
const sleepStamps = highest.timeStamps.filter(stamp => !stamp.isAwake);
sleepStamps.forEach((stamp) => {
  const min = stamp.date.getMinutes();
  if (!minutes[min]) {
    minutes[min] = 0;
  }

  minutes[min]++;
});

let highestMin;
Object.keys(minutes).forEach((min) => {
  if (!highestMin) {
    highestMin = {
      min,
      count: minutes[min],
    };
  }

  if (minutes[min] > highestMin.count) {
    highestMin = {
      min,
      count: minutes[min],
    };
  }
});

console.log(highest.id, highestMin);
console.log(parseInt(highest.id, 10) * parseInt(highestMin.min, 10));
