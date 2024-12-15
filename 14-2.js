import fs from 'fs/promises';

async function solve(pathToInput) {
  const input = await fs.readFile(pathToInput, 'utf-8');
  const regex = /p=(-?\d{1,3}),(-?\d{1,3}) v=(-?\d{1,3}),(-?\d{1,3})/;
  const HEIGHT = 103;
  const WIDTH = 101;

  function moveWithTeleport(positionX, positionY, stepX, stepY, limitX, limitY, iterations) {
    const newPositionX = (positionX + stepX * iterations + limitX * iterations) % limitX;
    const newPositionY = (positionY + stepY * iterations + limitY * iterations) % limitY;
    return [newPositionX, newPositionY, stepX, stepY];
  }

  let robotCoordinates = input.split('\n').map((line) => {
    const matches = line.match(regex);
    const x = parseInt(matches[1], 10);
    const y = parseInt(matches[2], 10);
    const stepX = parseInt(matches[3], 10);
    const stepY = parseInt(matches[4], 10);
    line = [x, y, stepX, stepY];
    return line;
  });

  function findEdge(input) {
    const coordinates = input.map((item) => [item[0], item[1]]);

    const coordinateSet = new Set(coordinates.map((coord) => coord.join(',')));
    const visited = new Set();

    function dfs(x, y, direction, count) {
      const key = `${x},${y}`;
      if (!coordinateSet.has(key) || visited.has(key)) return count;

      visited.add(key);

      if (direction === 'horizontal') {
        return dfs(x + 1, y, direction, count + 1);
      } else if (direction === 'vertical') {
        return dfs(x, y + 1, direction, count + 1);
      }

      return count;
    }

    for (const [x, y] of coordinates) {
      const key = `${x},${y}`;
      if (visited.has(key)) continue;

      const horizontalCount = dfs(x, y, 'horizontal', 0);
      const verticalCount = dfs(x, y, 'vertical', 0);

      if (horizontalCount >= 10 || verticalCount >= 10) {
        return true;
      }
    }

    return false;
  }

  let edgeFound = false;
  let minNumberOfIterations = 0;

  while (!edgeFound) {
    robotCoordinates = robotCoordinates.map((line) => {
      return moveWithTeleport(line[0], line[1], line[2], line[3], WIDTH, HEIGHT, 1);
    });
    minNumberOfIterations++;
    edgeFound = findEdge(robotCoordinates);
  }

  return minNumberOfIterations;
}
console.log(await solve('input-14.txt'));
