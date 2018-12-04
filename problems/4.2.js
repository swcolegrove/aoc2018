'use strict';

const util = require('util');
const getInput = require('../getInput.js');
const input = getInput('../inputs/4.txt');
const log = obj => console.log(util.inspect(obj, false, null, true));

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

Object.keys(guards).forEach((guardId) => {
  guards[guardId].minuteCounts = {};
  const sleepStamps = guards[guardId].timeStamps.filter(stamp => !stamp.isAwake);
  sleepStamps.forEach((stamp) => {
    const min = stamp.date.getMinutes();
    if (!guards[guardId].minuteCounts[min]) {
      guards[guardId].minuteCounts[min] = 0;
    }
    guards[guardId].minuteCounts[min]++;
  });

  let highest;
  Object.keys(guards[guardId].minuteCounts).forEach((key) => {
    if (!highest) {
      highest = key;
    }

    if (guards[guardId].minuteCounts[key] > guards[guardId].minuteCounts[highest]) {
      highest = key;
    }
  });
  guards[guardId].highest = {
    min: highest,
    count: guards[guardId].minuteCounts[highest],
  };
});

let mostSleep;
Object.keys(guards).forEach((key) => {
  if (!mostSleep) {
    mostSleep = {
      id: key,
      ...guards[key].highest,
    };
  }

  if (guards[key].highest.count > mostSleep.count) {
    mostSleep = {
      id: key,
      ...guards[key].highest,
    };
  }
});

log(mostSleep);
console.log(parseInt(mostSleep.id, 10) * parseInt(mostSleep.min, 10));
