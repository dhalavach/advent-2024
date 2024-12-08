import fs from 'fs';

function solve(matrix, obstacleSymbol) {
  const data = fs.readFileSync(matrix, 'utf-8');
  const formattedData = data.split('\r\n');
  const width = formattedData[0].length;
  const height = formattedData.length;
  const map = new Map();
  const uniqueTraversedPositions = [];
  let position;
  let currentRowIndex = 0;
  const Direction = {
    UP: '^',
    RIGHT: '>',
    DOWN: 'v',
    LEFT: '<',
  };

  function getNextDirection(initialDirection) {
    switch (initialDirection) {
      case Direction.UP: {
        return Direction.RIGHT;
      }
      case Direction.RIGHT: {
        return Direction.DOWN;
      }
      case Direction.DOWN: {
        return Direction.LEFT;
      }
      case Direction.LEFT: {
        return Direction.UP;
      }
      default: {
        console.error('Invalid argument passed to the next direction function');
        break;
      }
    }
  }

  function getNextPosition() {
    if (position.direction === Direction.UP) return { x: position.x, y: position.y - 1 };
    if (position.direction === Direction.RIGHT) return { x: position.x + 1, y: position.y };
    if (position.direction === Direction.DOWN) return { x: position.x, y: position.y + 1 };
    if (position.direction === Direction.LEFT) return { x: position.x - 1, y: position.y };
  }

  function isOutOfBounds(vector) {
    return vector.x < 0 || vector.x >= currentRowIndex || vector.y < 0 || vector.y >= currentRowIndex;
  }

  function hasObstacle(vector) {
    return map.has(vector.x) && map.get(vector.x).includes(vector.y);
  }

  for (let row of formattedData) {
    for (let i = 0; i < width; i++) {
      const vector = { x: i, y: currentRowIndex };

      if (row.charAt(i) === Direction.UP) {
        position = { ...vector, direction: Direction.UP };
      }
      if (row.charAt(i) === Direction.DOWN) {
        position = { ...vector, direction: Direction.DOWN };
      }
      if (row.charAt(i) === Direction.RIGHT) {
        position = { ...vector, direction: Direction.RIGHT };
      }
      if (row.charAt(i) === Direction.LEFT) {
        position = { ...vector, direction: Direction.LEFT };
      }

      if (row[i] === obstacleSymbol) {
        if (map.has(vector.x)) map.get(vector.x).push(vector.y);
        else map.set(vector.x, [vector.y]);
      }
    }
    currentRowIndex++;
  }

  function saveTraversedPositions() {
    if (uniqueTraversedPositions.some((p) => p.x === position.x && p.y === position.y)) return;
    uniqueTraversedPositions.push({ x: position.x, y: position.y });
  }

  function go() {
    saveTraversedPositions();

    const next = getNextPosition();

    if (isOutOfBounds(next)) {
      return;
    }

    if (hasObstacle(next)) {
      position.direction = getNextDirection(position.direction);
    } else {
      position.x = next.x;
      position.y = next.y;
    }
    go();
  }

  go();

  const result = uniqueTraversedPositions.length;
  return result;
}

console.log(solve('input-6.txt', '#'));
