import fs from 'fs';
const s = 70;
let n = 1024;

const coordinates = fs
  .readFileSync('input-18.txt', 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.split(',').map(Number));

let low = 0;
let high = coordinates.length - 1;

function checkIfPathExists(coordinates, n) {
  const grid = Array.from({ length: s + 1 }, () => Array(s + 1).fill(0));

  coordinates.slice(0, n).forEach(([c, r]) => {
    grid[r][c] = 1;
  });

  const q = [[0, 0, 0]];
  const visited = new Set(['0,0']);
  while (q.length > 0) {
    const [r, c, d] = q.shift();

    for (const [nr, nc] of [
      [r + 1, c],
      [r, c + 1],
      [r - 1, c],
      [r, c - 1],
    ]) {
      if (nr < 0 || nc < 0 || nr > s || nc > s) continue;
      if (grid[nr][nc] === 1) continue;
      if (visited.has(`${nr},${nc}`)) continue;
      if (nr === s && nc === s) return true;
      visited.add(`${nr},${nc}`);
      q.push([nr, nc, d + 1]);
    }
  }
  return false;
}

while (checkIfPathExists(coordinates, n)) {
  n++;
}
console.log(coordinates[n - 1]);