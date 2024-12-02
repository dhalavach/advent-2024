import fs from 'fs/promises';

async function solve(pathToInput) {
  const data = await fs.readFile(pathToInput, 'utf-8');

  const regex = /(\d+)\s+(\d+)/g;
  

  const firstNumbers = [];
  const secondNumbers = [];
  let match;

  while ((match = regex.exec(data)) !== null) {
    firstNumbers.push(parseInt(match[1], 10));
    secondNumbers.push(parseInt(match[2], 10));
  }

  firstNumbers.sort((a, b) => a - b);
  secondNumbers.sort((a, b) => a - b);

  const result = firstNumbers.reduce((acc, curr, i) => {
    return firstNumbers[i] >= secondNumbers[i]
      ? acc + firstNumbers[i] - secondNumbers[i]
      : acc + secondNumbers[i] - firstNumbers[i];
  }, 0);

  console.log(result);
}

solve('input-1.txt');
