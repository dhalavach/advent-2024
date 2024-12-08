import fs from 'fs/promises';

async function solve(pathToInput) {
  let gridSize = 0;
  let guard;
  const obstacles = new Map();
  const path = [];
  const data = await fs.readFile(pathToInput, 'utf-8');
  const formattedData = data.split('\r\n');
  const obstacleSymbol = '#';

  for (const line of formattedData) {
    const l = line.toString();

    for (let i = 0; i < l.length; i++) {
      const vec = { x: i, y: gridSize };

      if (l[i] === '^') {
        guard = { ...vec, dir: '^' };
      }

      if (l[i] === obstacleSymbol) {
        if (obstacles.has(vec.x)) obstacles.get(vec.x).push(vec.y);
        else obstacles.set(vec.x, [vec.y]);
      }
    }

    gridSize++;
  }

  function isOutOfBounds(vec) {
    return vec.x < 0 || vec.x >= gridSize || vec.y < 0 || vec.y >= gridSize;
  }

  function containsObstacle(vec) {
    return obstacles.has(vec.x) && obstacles.get(vec.x).includes(vec.y);
  }

  function getNext() {
    if (guard.dir === '^') return { x: guard.x, y: guard.y - 1 };
    if (guard.dir === '>') return { x: guard.x + 1, y: guard.y };
    if (guard.dir === 'v') return { x: guard.x, y: guard.y + 1 };
    if (guard.dir === '<') return { x: guard.x - 1, y: guard.y };
  }

  function turn() {
    if (guard.dir === '^') guard.dir = '>';
    else if (guard.dir === '>') guard.dir = 'v';
    else if (guard.dir === 'v') guard.dir = '<';
    else if (guard.dir === '<') guard.dir = '^';
  }

  function recordPath() {
    if (path.some((p) => p.x === guard.x && p.y === guard.y)) return;
    path.push({ x: guard.x, y: guard.y });
  }

  function move() {
    recordPath();

    const next = getNext();

    if (isOutOfBounds(next)) {
      return;
    }

    if (containsObstacle(next)) {
      turn();
    } else {
      guard.x = next.x;
      guard.y = next.y;
    }

    move();
  }

  move();

  console.log('positions:', path.length);
}

solve('input-6.txt');
