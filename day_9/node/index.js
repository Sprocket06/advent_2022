const fs = require('node:fs')

var file = fs.readFileSync("./input.txt").toString();

/*file = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`*/
var xBounds = [-20,20];
var yBounds = [-20,20];


function printGrid()
{
  var out = ""

  for(var y = yBounds[1]; y >= yBounds[0]; y--)
  {
    for(var x = xBounds[0]; x <= xBounds[1]; x++)
    {
      if(knots.find(k => k.x == x && k.y == y))
      {
        out += knots.findIndex(k => k.x == x && k.y == y)
      }
      else if(x == 0 && y == 0)out+="s"
      else out += ".";
    }
    out += "\n"

  } 
  return out
}
var lines = file.split("\n").filter(_=>_!='');

var head_pos = {x:0, y:0}
var tail_pos = {x:0, y:0}

var knots = [];
var num_knots = 10;

for(var i = 0; i < num_knots; i++)
{
  knots.push({x:0, y:0, pX:0, pY:0});
}

var tail_pos_hist = [];
tail_pos_hist.push([0,0])

for(var i = 0; i < lines.length; i++)
{
  var args = lines[i].split(" ")
  var dir = args[0]
  var len = parseInt(args[1])

  for(var j = 0; j < len; j++)
  {
    //console.log(`Moving ${dir} | ${j}`)
    Move(dir,0)
    //debugger;
  }
}

/*lines.forEach(line => {
  var args = line.split(" ")
  , dir = args[0]
  , length = parseInt(args[1])

  for(var i = 0; i < length; i++)
  {
    Move(dir,0);
  }
})*/

tail_pos_hist = tail_pos_hist.filter((it,i)=>tail_pos_hist.findIndex(arr => arr[0] == it[0] && arr[1] == it[1]) == i)


console.log(printGrid())

//console.log(tail_pos_hist.filter((it,i)=>tail_pos_hist.findIndex(arr => arr[0] == it[0] && arr[1] == it[1]) == i).length)
console.log(tail_pos_hist.length)
//console.log(knots.forEach(knot => console.log(knot.x, knot.y)))

const pos_buf_max = 1;

var last_head_pos = [0,0]

function Move(dir, knotIndex)
{
  var mov_vec = dir == "L" ? [-1,0] : dir == "R" ? [1,0] : dir == "U" ? [0,1] : [0,-1]
  var cKnot = knots[knotIndex];
  cKnot.pX = cKnot.x
  cKnot.pY = cKnot.y
  cKnot.x += mov_vec[0]
  cKnot.y += mov_vec[1]
  
  for(var i = 1; i < num_knots; i++)
  {
    var curr = knots[i]
    var prev = knots[i-1]
    if(dist(prev.x,prev.y,curr.x,curr.y) > Math.sqrt(2))
    {
      //console.log(`${i} too far behind, playing catch-up`)
      curr.pX = curr.x
      curr.pY = curr.y
      if(dist(prev.x,prev.y,curr.x,curr.y) >= Math.sqrt(5))
      {
        //console.log("playing even more catch up")
        var dX = prev.x - prev.pX;
        var dY = prev.y - prev.pY;
        //console.log(dX,dY)
        curr.x += dX
        curr.y += dY
        if(dX == 0)
        {
          curr.x = prev.x
        }
        else if(dY == 0)
        {
          //console.log(prev.y,cKnot.y)
          curr.y = prev.y
        }
        /*if(["L", "R"].includes(dir))
        {
          if(prev.y - curr.y > 0)
          {
            curr.y += 1;
          }
          else curr.y -= 1;
        }
        else
        {
          if(prev.x - curr.x > 0)
          {
            curr.x += 1;
          }
          else curr.y -= 1;
        }*/
      }
      else
      {
        //console.log(dist(prev.x,prev.y,curr.x,curr.y))
        //console.log(prev, curr)
        //console.log(prev.x - prev.pX, prev.y - prev.pY)
        //curr.x += prev.x - prev.pX
        //curr.y += prev.y - prev.pY
        if(curr.x == prev.x)
        {
          curr.y += prev.y - prev.pY
        }
        else
        {
          curr.x += prev.x - prev.pX
        }
      }

      if(i == (num_knots - 1))
      {
        tail_pos_hist.push([curr.x, curr.y])
      }
    } 
  }
  
  
}

function dist(x1,y1,x2,y2)
{
  return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}
