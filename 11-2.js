const MAX_SAFE_ARRAY_LENGTH = 4294967295;

function transform(frequencies) {
  const newFrequencies = {};

  for (const [number, count] of Object.entries(frequencies)) {
    const num = parseInt(number, 10);

    if (num === 0) {
      newFrequencies[1] = (newFrequencies[1] || 0) + count;
    } else if (num.toString().length % 2 === 0) {
      const str = num.toString();
      const middle = Math.floor(str.length / 2);
      const part1 = parseInt(str.slice(0, middle), 10);
      const part2 = parseInt(str.slice(middle), 10);

      newFrequencies[part1] = (newFrequencies[part1] || 0) + count;
      newFrequencies[part2] = (newFrequencies[part2] || 0) + count;
    } else {
      const transformed = num * 2024;
      newFrequencies[transformed] = (newFrequencies[transformed] || 0) + count;
    }
  }

  return newFrequencies;
}

let stones = [3028, 78, 973951, 5146801, 5, 0, 23533, 857];
let frequencies = stones.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {});

let blinks = 0;
while (blinks < 75) {
  frequencies = transform(frequencies);

  const totalElements = Object.values(frequencies).reduce((sum, freq) => sum + freq, 0);
  if (totalElements > MAX_SAFE_ARRAY_LENGTH) {
    //throw new Error('Exceeded safe array length!');
  }

  blinks++;
}

const finalSize = Object.values(frequencies).reduce((sum, freq) => sum + freq, 0);
console.log('Final size of transformed array:', finalSize);
