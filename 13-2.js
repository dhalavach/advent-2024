import fs from 'fs/promises';
const input = await fs.readFile('input-13.txt', 'utf-8');

function parseInput(input) {
  const pattern = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;

  const results = [];
  let match;

  while ((match = pattern.exec(input)) !== null) {
    const buttonA = { vector: { x: parseInt(match[1]), y: parseInt(match[2]) }, cost: 3 };
    const buttonB = { vector: { x: parseInt(match[3]), y: parseInt(match[4]) }, cost: 1 };
    const prize = { x: parseInt(match[5]) + 10000000000000, y: parseInt(match[6]) + 10000000000000 };
    results.push({ buttonA, buttonB, prize });
  }

  return results;
}

const parsedData = parseInput(input);

function getMinimalCost(targetX, targetY, buttonA, buttonB) {
  const tolerance = 0.000001;
  let total = 0;
  const A =
    (buttonB.vector.x * targetY - buttonB.vector.y * targetX) /
    (buttonB.vector.x * buttonA.vector.y - buttonB.vector.y * buttonA.vector.x);
  const B = (targetX - buttonA.vector.x * A) / buttonB.vector.x;

  if (Math.abs(A - Math.round(A)) < tolerance && Math.abs(B - Math.round(B)) < tolerance) {
    total += 3 * A + B;
  }

  return Math.floor(total);
}

const costs = parsedData.map((machineProps) => {
  return getMinimalCost(machineProps.prize.x, machineProps.prize.y, machineProps.buttonA, machineProps.buttonB);
});
const result = costs.reduce((a, b) => a + b, 0);
console.log(result);
