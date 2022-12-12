const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();

var lines = file.split("\r\n").filter(_=>_!='');

var monkeys = []
var activityScores = []

for(var i = 0; i < lines.length; i++)
{
  if(lines[i].startsWith("Monkey"))
  {
    var heldItems = lines[i+1].match(/\d+/g).map(_=>(parseInt(_)))
    var op = lines[i+2].match(/new = .+/)[0];
    var divTest = (parseInt(lines[i+3].split(" ").pop()));
    var trueBranch = parseInt(lines[i+4].split(" ").pop());
    var falseBranch = parseInt(lines[i+5].split(" ").pop());
    
    var monkey = {
      items: heldItems,
      op: op,
      divTest,
      trueBranch,
      falseBranch
    }

    monkeys.push(monkey)
    activityScores.push(0)
    i += 5;
  }
}

var lcm = monkeys.map(m=> m.divTest).reduce((a,b)=> a * b)

//console.log(monkeys)

//monkeys.forEach(m => console.log(doOp(m.op, 1)))

for(var i = 0; i < 10000; i++)
{
  for(var mI = 0; mI < monkeys.length; mI++)
  {
    doTurn(mI);
  }
}

console.log(monkeys.map(_=> _.items))
console.log(activityScores)

var highest = Math.max(...activityScores);
activityScores.splice(activityScores.indexOf(highest),1);
var second = Math.max(...activityScores);

console.log(highest * second)

function doTurn(monkeyIndex)
{
  var monkey = monkeys[monkeyIndex]
  var itemThrows = []
  activityScores[monkeyIndex] += monkey.items.length;
  monkey.items.forEach(item => {
    // inspect item
    var newItem = doOp(monkey.op, item);
    newItem %= lcm;
    // boredom
    //newItem = Math.floor(newItem/3);
    // test
    var throwTarget = ( newItem % monkey.divTest == 0) ? monkey.trueBranch : monkey.falseBranch;
    itemThrows.push([throwTarget, newItem]);
  })

  monkey.items = []

  itemThrows.forEach(t => {
    //console.log(t)
    monkeys[t[0]].items.push(t[1]);
  })
}

function doOp(op, cVal)
{
  var expr = op.split("=")[1].trim();
  //console.log(expr)
  if(expr.includes("*"))
  {
    var terms = expr.split(" * ").map(t => t == "old" ? cVal : (parseInt(t)));
    //console.log(terms, cVal)
    return terms[0] * terms[1];
  }
  else
  {
    var terms = expr.split(" + ").map(t => t == "old" ? cVal : (parseInt(t)));
    return terms[0] + terms[1];
  }
}
