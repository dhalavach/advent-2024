import { readInput } from './utils.js';
const input = await readInput('./input-22.txt');
//console.log(input);

function process(n) {
  n ^= (n << 6) & 0xffffff; // Multiply by 64
  n ^= (n >>> 5) & 0xffffff; // Divide by 32
  n ^= (n << 11) & 0xffffff; // Multiply by 2048
  return n & 0xffffffff; // Ensure the result is within a 32-bit range
}

function iterate(secret, n) {
  return Array.from({ length: n }).reduce((s) => process(s), secret);
}

function part1(input) {
  const arr = input.split('\n').map((n) => iterate(Number(n), 2000));
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum;
}

const result = part1(input);
console.log(result);
