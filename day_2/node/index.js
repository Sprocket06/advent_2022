const fs = require('fs')

var file = fs.readFileSync("c:/Users/sprocket/source/advent_2022/day_2/input_1.txt").toString();

var opp_moves = ["A", "B", "C"]
var your_moves = ["X", "Y", "Z"]

var total_score = 0;

file.split("\n").forEach(line => {
  var l = line.split(" ").map(_=>_.trim())
  if(l[0] == '')return;
  total_score += getPoints(getNeededMove(l[1], l[0]), l[0]);
})

console.log(total_score)

function getNeededMove(you, opp)
{
  var opp_index = opp_moves.indexOf(opp);
  var your_move = 0;
  if(you == "Z")
  {
    your_move = your_moves[(opp_index+1)%3];
  }
  if(you == "Y")
  {
    your_move = your_moves[opp_index];
  }
  if(you == "X")
  {
    your_move = your_moves[(((opp_index - 1) + 3) % 3)];
  }

  return your_move;
}

function getPoints(you, opp)
{
  if(opp == "A")
  {
    if(you == "Y")return 6+2;
    if(you == "X")return 3+1;
    return 3;
  }
  if(opp == "B")
  {
    if(you == "Z")return 6+3;
    if(you == "Y")return 3+2;
    return 1;
  }
  if(opp == "C")
  {
    if(you == "X")return 7;
    if(you == "Z")return 6;
    return 2;
  }
}
