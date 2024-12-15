import fs from 'fs/promises';
const input = await fs.readFile('input-13.txt', 'utf-8');

function parseInput(input) {
  const pattern = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;

  const results = [];
  let match;

  while ((match = pattern.exec(input)) !== null) {
    const buttonA = { vector: { x: parseInt(match[1]), y: parseInt(match[2]) }, cost: 3 }; // Cost can be added separately if needed
    const buttonB = { vector: { x: parseInt(match[3]), y: parseInt(match[4]) }, cost: 1 }; // Cost can be added separately if needed
    const prize = { x: parseInt(match[5]), y: parseInt(match[6]) };

    results.push({ buttonA, buttonB, prize });
  }

  return results;
}

const parsedData = parseInput(input);

function minimizeVectorTraversalCost(targetX, targetY, buttonA, buttonB) {
  const dp = new Map();
  const key = (x, y) => `${x},${y}`;

  dp.set(key(0, 0), 0);

  const moves = [
    { vector: buttonA.vector, cost: buttonA.cost },
    { vector: buttonB.vector, cost: buttonB.cost },
  ];

  const queue = [{ x: 0, y: 0 }];
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const currentCost = dp.get(key(x, y));

    for (const move of moves) {
      const newX = x + move.vector.x;
      const newY = y + move.vector.y;
      const newCost = currentCost + move.cost;

      if (Math.abs(newX) > Math.abs(targetX) || Math.abs(newY) > Math.abs(targetY)) {
        continue;
      }

      if (!dp.has(key(newX, newY)) || newCost < dp.get(key(newX, newY))) {
        dp.set(key(newX, newY), newCost);
        queue.push({ x: newX, y: newY });
      }
    }
  }

  return dp.get(key(targetX, targetY)) ?? false; // If unreachable, return false
}

const costs = parsedData
  .map((machineProps) => {
    return minimizeVectorTraversalCost(
      machineProps.prize.x,
      machineProps.prize.y,
      machineProps.buttonA,
      machineProps.buttonB
    );
  })
  .filter((result) => result !== false);

const result = costs.reduce((a, b) => a + b, 0);
console.log(result);
