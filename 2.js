import fs from 'fs/promises';

async function solve(pathToInput) {
  const data = JSON.stringify(await fs.readFile(pathToInput, 'utf-8'));
  let safeLevelCount = 0;

  function isIncreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] <= arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
  
  function isDecreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] >= arr[i - 1]) return false;
    }
    return true;
  }

  function isDifferenceWithinLimit(arr, limit) {
    for (let i = 1; i < arr.length; i++) {
      if (Math.abs(arr[i] - arr[i - 1]) > limit) {
        return false;
      }
    }
    return true;
  }

  const levels = data
    .replace(/^"|"$/g, '')
    .split('\\n')
    .map((line) => line.split(' '))
    .map((arr) => arr.map((el) => Number(el)));

  levels.forEach((arr) => {
    if (isIncreasing(arr) || isDecreasing(arr)) {
      if (isDifferenceWithinLimit(arr, 3)) safeLevelCount++;
    }
  });

  console.log(safeLevelCount);
}

solve('input-2.txt');
