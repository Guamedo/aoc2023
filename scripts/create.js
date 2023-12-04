import fs from 'fs';

const day = process.argv[2];

if (day && !isNaN(parseInt(day))) {
  if (fs.existsSync('./days/day' + process.argv[2])) {
    console.log('\x1b[31m', `Day ${day} already exists`, '\x1b[0m');
  } else {
    fs.mkdirSync('./days/day' + process.argv[2]);
    fs.createWriteStream('./days/day' + process.argv[2] + '/day' + process.argv[2] + '.js').end();
    fs.createWriteStream('./days/day' + process.argv[2] + '/day' + process.argv[2] + '.in').end();

    console.log('\x1b[32m', `Day ${day} created`, '\x1b[0m');
  }
} else {
  console.log('\x1b[31m', 'Please provide a valid day number', '\x1b[0m');
}
