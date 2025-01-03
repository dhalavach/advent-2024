import { readInput } from './utils.js';

const input = (await readInput('./input-23.txt')).trim().split('\n');

const record = new Map();

input.forEach((line) => {
  const [a, b] = line.split('-');

  [a, b].forEach((node, idx) => {
    const neighbor = idx === 0 ? b : a;
    if (!record.has(node)) record.set(node, new Set());
    record.get(node).add(neighbor);
  });
});

const intersection = (set1, set2) => new Set([...set1].filter((item) => set2.has(item)));

const loops = new Set();
record.forEach((neighbors, key) => {
  if (key.startsWith('t')) {
    neighbors.forEach((lan) => {
      const common = intersection(record.get(lan), neighbors);

      common.forEach((loop) => {
        loops.add([loop, lan, key].sort().join('-'));
      });
    });
  }
});

console.log(loops.size);
