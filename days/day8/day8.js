import fs from 'fs';
// const input = fs.readFileSync('./day8.in', 'utf-8');
const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const [nav, netStr] = input.split(/\r?\n\r?\n/);

const netArray = netStr.split(/\r?\n/).map((str) => {
  const [src, dests] = str.split(' = ');
  const [destL, destR] = dests
    .replaceAll('(', '')
    .replaceAll(')', '')
    .split(',')
    .map((s) => s.trim());
  return [
    src,
    {
      L: destL,
      R: destR,
    },
  ];
});

const net = Object.fromEntries(netArray);

let pos = 'AAA';
let found = false;
let i = 0;

while (!found) {
  const dir = nav.charAt(i % nav.length);
  if (net[pos][dir] === 'ZZZ') {
    found = true;
  }
  pos = net[pos][dir];
  i++;
}
console.log(i);
