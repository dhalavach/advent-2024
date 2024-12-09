import fs from 'fs';

const data = fs.readFileSync('input-7.txt', 'utf-8').split('\n');
const testValues = data.map((line) => parseInt(line.match(/(\d+)(?=:)/)[0]));
const numbers = data.map((line) => line.match(/(\s)(\d+)(?!=:)/g).map((element) => parseInt(element)));
const operations = ['+', '*'];
const validTestValues = [];

for (let i = 0; i < numbers.length; i++) {
  const temp = applyOperations(numbers[i], operations);
  if (temp.some((value) => value === testValues[i])) {
    validTestValues.push(testValues[i]);
  }
}

const result = validTestValues.reduce((a, b) => a + b, 0);
console.log(result);

function applyOperations(arr, operations) {
  if (arr.length === 1) {
    return arr;
  }

  const first = arr[0];
  const second = arr[1];

  let results = [];

  operations.forEach((op) => {
    let newValue;
    if (op === '+') {
      newValue = first + second;
    } else if (op === '*') {
      newValue = first * second;
    }

    const subResults = applyOperations([newValue, ...arr.slice(2)], operations);

    results = results.concat(subResults);
  });

  return results;
}
