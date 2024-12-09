import fs from 'fs';
const filePath = 'input-8.txt';

const input = fs.readFileSync(filePath, 'utf-8');

const antinodes = new Set();
const grid = input
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line !== ''); // Remove empty lines

const N = grid.length;
const M = grid[0].length;

const nodes = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const char = grid[i][j];
    if (char !== '.') {
      if (!nodes[char]) {
        nodes[char] = [];
      }
      nodes[char].push([i, j]);
    }
  }
}

function calculateAntinode(pr1, pr2) {
  const [x1, y1] = pr1;
  const [x2, y2] = pr2;

  const newX = x2 + (x2 - x1);
  const newY = y2 + (y2 - y1);

  if (newX >= 0 && newX < N && newY >= 0 && newY < M) {
    antinodes.add(`${newX},${newY}`); // Use a string to represent the coordinate pair
  }
}

for (const key in nodes) {
  const nodeList = nodes[key];
  const L = nodeList.length;

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < i; j++) {
      const node1 = nodeList[i];
      const node2 = nodeList[j];

      calculateAntinode(node1, node2);
      calculateAntinode(node2, node1);
    }
  }
}

console.log(antinodes.size);
