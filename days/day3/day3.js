import fs from 'fs';
const input = fs.readFileSync('./day3.in', 'utf-8');
// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

const lines = input.split(/\r?\n/).filter((line) => line.length > 0);

let re = /\d+/g;
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let match;
  while ((match = re.exec(line)) !== null) {
    const i0 = match.index - 1;
    const i1 = match.index + match[0].length + 1;

    const l1 = (lines[i - 1] ?? '').substring(i0, i1);
    const l2 = lines[i].substring(i0, i1);
    const l3 = (lines[i + 1] ?? '').substring(i0, i1);

    const isSymbolRE = /[^\d\.]/;
    if (isSymbolRE.test(l1) || isSymbolRE.test(l2) || isSymbolRE.test(l3)) {
      sum += parseInt(match[0]);
    }
  }
}
console.log('First Star:', sum);

re = /\d+/g;
sum = 0;
let d = {};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let match;
  while ((match = re.exec(line)) !== null) {
    const i0 = match.index - 1;
    const i1 = match.index + match[0].length + 1;

    const l1 = (lines[i - 1] ?? '').substring(i0, i1);
    const l2 = lines[i].substring(i0, i1);
    const l3 = (lines[i + 1] ?? '').substring(i0, i1);

    let r = /\*/g;
    let m;
    while ((m = r.exec(l1)) !== null) {
      const indexAbs = m.index + (i0 >= 0 ? i0 : 0);
      if (!d[`${i - 1},${indexAbs}`]) {
        d[`${i - 1},${indexAbs}`] = [parseInt(match[0])];
      } else {
        d[`${i - 1},${indexAbs}`].push(parseInt(match[0]));
      }
    }

    r.lastIndex = 0;
    while ((m = r.exec(l2)) !== null) {
      const indexAbs = m.index + (i0 >= 0 ? i0 : 0);
      if (!d[`${i},${indexAbs}`]) {
        d[`${i},${indexAbs}`] = [parseInt(match[0])];
      } else {
        d[`${i},${indexAbs}`].push(parseInt(match[0]));
      }
    }

    r.lastIndex = 0;
    while ((m = r.exec(l3)) !== null) {
      const indexAbs = m.index + (i0 >= 0 ? i0 : 0);
      if (!d[`${i + 1},${indexAbs}`]) {
        d[`${i + 1},${indexAbs}`] = [parseInt(match[0])];
      } else {
        d[`${i + 1},${indexAbs}`].push(parseInt(match[0]));
      }
    }
  }
}

for (let key in d) {
  if (d[key].length > 1) {
    sum += d[key].reduce((a, b) => a * b, 1);
  }
}
console.log('Second Star:', sum);
