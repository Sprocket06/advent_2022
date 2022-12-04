const fs = require('node:fs')

var file = fs.readFileSync("c:/Users/sprocket/source/advent_2022/day_3/input.txt").toString()

var prio = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
var sum = 0;

file.split("\n").map(l => l.trim()).forEach(line => {
  if(line == "")return;
  var l = line.length / 2;
  var firstHalf = line.slice(0, l);
  var secondHalf = line.slice(l);

  var commonLetters = firstHalf.split("").filter(c => secondHalf.includes(c));
  commonLetters = [... new Set(commonLetters)]
  sum += (prio.indexOf(commonLetters[0]) + 1)
})

//console.log(sum)

// PART 2

var lines = file.split("\n").filter(_=> _!="\r").map(l=>l.trim());
var p2Sum = 0;

for(var i = 0; i < 300; i+=3)
{
  var e1 = lines[i]
  , e2 = lines[i+1]
  , e3 = lines[i+2];

  var item = e1.split("").filter(c => e2.includes(c) && e3.includes(c));
  item = [...new Set(item)];
  p2Sum += (prio.indexOf(item[0])+1)
}

console.log(p2Sum)
