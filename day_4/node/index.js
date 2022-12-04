const fs = require("node:fs")

var file = fs.readFileSync("c:/Users/sprocket/source/advent_2022/day_4/input.txt").toString();
var redundancies = 0;

file.split("\n").filter(_=>_!="\r").map(_=>_.trim()).filter(_=>_!='').forEach(line => {
  var elves = line.split(",")
//  console.log(elves)
  var e1 = elves[0].split("-").map(_=> parseInt(_))
  var e2 = elves[1].split("-").map(_=> parseInt(_))

  /*if(e1[0] == e2[0] || e1[1] == e2[1])
  {
    //console.log(e1, e2)
    redundancies++;
    return;
  }
  if(e1[0] >= e2[0] && e1[1] <= e2[1])
  {
    redundancies++;
    //console.log(e1, e2)
    return;
  }
  if(e2[0] >= e1[0] && e2[1] <= e1[1])
  {
    redundancies++;
    //console.log(e1, e2)
    return;
  }*/

  var r1 = genRange(e1[0], e1[1])
  var r2 = genRange(e2[0], e2[1])

  r1 = r1.filter(n => r2.includes(n))

  if(r1.length)redundancies++;

})

function genRange(min, max){
  var r = []
  for(var i = min; i <= max; i++)
  {
    r.push(i);
  }
  return r;
}

console.log(redundancies)
