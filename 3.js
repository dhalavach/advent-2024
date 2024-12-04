import fs from 'fs/promises';

async function solve(pathToInput) {
  const data = JSON.stringify(await fs.readFile(pathToInput, 'utf-8'));
  //const data = "@mul(33,697)do()what()why()}(#]:mul(3,176)@-don't() )mul(862,540)from.do()mul(2,111)";

  const regexForAllInstructions = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const regexForNumberPairs = /mul\((\d+),(\d+)\)/;
  const matches = data.match(regexForAllInstructions);
  let goFlag = true;
  let result = 0;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i] === "don't()") goFlag = false;
    if (matches[i] === 'do()') goFlag = true;
    if (goFlag) {
      const match = regexForNumberPairs.exec(matches[i]);
      if (match) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);

        result += num1 * num2;
      }
    }
  }

  console.log(result);
}

solve('input-3.txt');
