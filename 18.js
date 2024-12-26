import { readInput, create2DArray } from './utils.js';
import { Deque } from './collections.js';

const width = 70;
const height = 70;
const s = 70;

const input = await readInput('./input-18.txt');
const data = input.split('\n').map((el) => {
  let matches = el.match(/(\d+)/g);
  return [parseInt(matches[0]), parseInt(matches[1])];
});

function checkIfCoordinatesInArray(x, y, array) {
  function equalToXY(arr) {
    return arr[0] === x && arr[1] === y;
  }
  return array.some(equalToXY);
}

const grid = create2DArray(71, 71);
data.forEach((el) => (grid[el[0]][el[1]] = 1));

const visited = new Set();
visited.add('0,0');

const dq = new Deque();
dq.addFront([0, 0, 0]);
while (dq.peekFront()) {
  console.log('while loop running..');
  let q = dq.removeFront();
  console.log(q);
  let r = q[0];
  let c = q[1];
  let d = q[2];
  for (const [nr, nc] of [
    [r + 1, c],
    [r, c + 1],
    [r - 1, c],
    [r, c - 1],
  ]) {
    if (nr < 0 || nc < 0 || nr > s || nc > s) continue;
    if (grid[nr][nc] === 1) continue;
    if (visited.has(`${nr},${nc}`)) continue;
    if (nr === nc && nr === s) {
      console.log(d + 1);
      break;
    } else {
      visited.add(`${nr},${nc}`);
      dq.addFront([nr, nc, d + 1]);
    }
  }
}

// console.log(data);

// console.log(checkIfCoordinatesInArray(19, 47, data));
