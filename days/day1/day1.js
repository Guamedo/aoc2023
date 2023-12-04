import fs from 'fs';
// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

const input = fs.readFileSync('./day1.in', { encoding: 'utf-8' });
const lines = input.split('\n').filter((l) => l);

console.log(
  'First Start:',
  lines
    .map((line) => line.split('').filter((c) => /\d/.test(c)))
    .map((line) => parseInt(line.at(0) + line.at(-1)))
    .reduce((a, c) => a + c)
);

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const parsedLines = lines.map((line) => {
  numbers.forEach((n, i) => (line = line.replaceAll(n, n + (i + 1) + n)));
  return line.split('').filter((c) => /\d/.test(c));
});

const values = parsedLines.map((line) => {
  return parseInt(line.at(0) + line.at(-1));
});

console.log(
  'Second Start:',
  values.reduce((a, c) => a + c)
);
