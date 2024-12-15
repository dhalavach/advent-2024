import fs from 'fs/promises';
async function solve(pathToInput, iterations) {
  const input = await fs.readFile(pathToInput, 'utf-8');
  const regex = /p=(-?\d{1,3}),(-?\d{1,3}) v=(-?\d{1,3}),(-?\d{1,3})/;
  const height = 103;
  const width = 101;

  function moveWithTeleport(positionX, positionY, stepX, stepY, limitX, limitY, iterations) {
    const newPositionX = (positionX + stepX * iterations + limitX * iterations) % limitX;
    const newPositionY = (positionY + stepY * iterations + limitY * iterations) % limitY;
    return [newPositionX, newPositionY];
  }

  function assignToQuadrantandCalcScore(coordinatesArr, middleX, middleY) {
    let topLeft = 0;
    let topRight = 0;
    let bottomLeft = 0;
    let bottomRight = 0;
    coordinatesArr.map((coordinatePair) => {
      if (coordinatePair[0] === Math.floor(width / 2) || coordinatePair[1] === Math.floor(height / 2)) {
      } else {
        if (coordinatePair[0] < middleX && coordinatePair[1] < middleY) topLeft++;
        if (coordinatePair[0] > middleX && coordinatePair[1] < middleY) topRight++;
        if (coordinatePair[0] < middleX && coordinatePair[1] > middleY) bottomLeft++;
        if (coordinatePair[0] > middleX && coordinatePair[1] > middleY) bottomRight++;
      }
    });

    return topLeft * topRight * bottomLeft * bottomRight;
  }

  const robotCoordinatesArr = input.split('\n').map((line) => {
    const matches = line.match(regex);
    const x = parseInt(matches[1], 10);
    const y = parseInt(matches[2], 10);
    const stepX = parseInt(matches[3], 10);
    const stepY = parseInt(matches[4], 10);
    line = moveWithTeleport(x, y, stepX, stepY, width, height, iterations);
    return line;
  });

  const result = assignToQuadrantandCalcScore(robotCoordinatesArr, Math.floor(width / 2), Math.floor(height / 2));
  return result;
}
console.log(await solve('input-14.txt', 100));
