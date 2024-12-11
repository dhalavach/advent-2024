let stones = [3028, 78, 973951, 5146801, 5, 0, 23533, 857];
//let stones = [125, 17];

function transform(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      res.push(1);
    } else if (arr[i].toString().length % 2 === 0) {
      const str = arr[i].toString();
      const middle = Math.floor(str.length / 2);
      res.push(parseInt(str.slice(0, middle)));
      res.push(parseInt(str.slice(middle)));
      // if (i < arr.length ) i++;
    } else {
      res.push(arr[i] * 2024);
    }
  }

  return res;
}

let blinks = 0;
while (blinks < 25) {
  let newStones = transform(stones);
  stones = newStones;
  blinks++;
}
console.log(stones.length);

