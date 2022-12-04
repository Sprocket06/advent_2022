const fs = require('node:fs');

var file = fs.readFileSync("C:\\Users\\sprocket\\source\\advent_2022\\day_1\\input_1.txt").toString();
/*var file = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
*/

var elves = [];
var elf = 0;

file.split("\n").forEach(line => {
  if(line == "\r")
  {
    elves.push(elf);
    elf = 0;
  }
  else
  {
    elf += parseInt(line);
  }
})

elves.sort((a, b) => a < b ? 1 : -1);

console.log("Part 1:")
console.log(elves[0])

console.log("Part 2")
console.log(elves[0] + elves[1] + elves[2])
