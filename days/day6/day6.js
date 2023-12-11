import fs from 'fs';
const input = fs.readFileSync('./day6.in', 'utf-8');
// const input = `Time:      7  15   30
// Distance:  9  40  200`;

const lines = input.split(/\r?\n/);

const times = lines[0]
  .replace('Time: ', '')
  .trim()
  .split(/[^\d]+/)
  .map((x) => parseInt(x));
const distances = lines[1]
  .replace('Distance: ', '')
  .trim()
  .split(/[^\d]+/)
  .map((x) => parseInt(x));

let mul = 1;
for (let i = 0; i < times.length; i++) {
  const t = times[i];
  const d = distances[i];

  const z1 = Math.floor((-t + Math.sqrt(t ** 2 - 4 * d)) / -2) + 1;
  const z2 = Math.ceil((-t - Math.sqrt(t ** 2 - 4 * d)) / -2) - 1;
  mul *= z2 - z1 + 1;
}
console.log('First Star:', mul);

const time = times.join('');
const distance = distances.join('');

const z1 = Math.floor((-time + Math.sqrt(time ** 2 - 4 * distance)) / -2) + 1;
const z2 = Math.ceil((-time - Math.sqrt(time ** 2 - 4 * distance)) / -2) - 1;
console.log('Second Star:', z2 - z1 + 1);
