const program = [22817223, 0, 0, 2, 4, 1, 2, 7, 5, 4, 5, 0, 3, 1, 7, 5, 5, 3, 0];

let [a, b, c, ...instructions] = program;
let pointer = 0;
let output = [];

function combo(operand) {
  if (operand >= 0 && operand <= 3) return operand;
  if (operand === 4) return a;
  if (operand === 5) return b;
  if (operand === 6) return c;
  throw new Error(`wrong operand ${operand}`);
}

while (pointer < instructions.length) {
  const ins = instructions[pointer];
  const operand = instructions[pointer + 1];

  switch (ins) {
    case 0: // adv
      a = a >> combo(operand);
      break;
    case 1: // bxl
      b = b ^ operand;
      break;
    case 2: // bst
      b = combo(operand) % 8;
      break;
    case 3: // jnz
      if (a !== 0) {
        pointer = operand;
        continue;
      }
      break;
    case 4: // bxc
      b = b ^ c;
      break;
    case 5: // out
      output.push(combo(operand) % 8);
      break;
    case 6: // bdv
      b = a >> combo(operand);
      break;
    case 7: // cdv
      c = a >> combo(operand);
      break;
    default:
      throw new Error(`wrong instruction ${ins}`);
  }

  pointer += 2;
}

console.log(output.join(','));
