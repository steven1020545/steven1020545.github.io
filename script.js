var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");

canvas.height=500;
canvas.width=700;

var position_x=canvas.width/2;
var position_y=canvas.height-100;
var ballButtom;
var ballTop;
var ballLeft;
var ballRight;




var dx=6;
var dy=6;

var rightPressed = false;
var leftPressed = false;

var colorNum=3;
var ballColor=["#ADFF2F","#FFD700","#87CEFA","#FFFFFF"];

var brickOffsetTop = 50;
var brickOffsetLeft = 40;
var brickPadding = 20;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = (canvas.width-brickOffsetLeft*2-brickPadding*(brickColumnCount-1))/brickColumnCount;
var brickHeight = canvas.height/10;
var radius=brickHeight/2;
var paddleWidth=radius*4;
var paddleX=canvas.width/2-paddleWidth;


var bricks=[];
var score = 0;
var live=3;
for(var c=0;c<brickRowCount;c++)
{
  bricks[c]=[];
  for(var r=0;r<brickColumnCount;r++)
  {
    bricks[c][r]={ x: 0, y: 0 ,  status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove",mouseMoveHandler);

function keyDownHandler(e)
{
  if(e.keyCode==39)
  {
    rightPressed=true;    
  }
  if(e.keyCode==37)
  {
    leftPressed=true;
  }
}

function keyUpHandler(e)
{
  if(e.keyCode==39)
  {
    rightPressed=false;    
  }
  if(e.keyCode==37)
  {
    leftPressed=false;
  }
}
function mouseMoveHandler(e)
{
  var relativeX=e.clientX-canvas.offsetLeft;
  if(relativeX>0&&relativeX<canvas.width)
    paddleX=relativeX-paddleWidth/2;
}
function drawBall()
{
  ctx.lineWidth=3;
  ctx.fillStyle=ballColor[colorNum];
  ctx.strokeStyle=ballColor[colorNum];
  ctx.beginPath();
  ctx.arc(position_x,position_y,radius,0,Math.PI*2);
  ctx.stroke();
  ctx.fill();
}
function drawPaddle()
{
  ctx.lineWidth=15;
  ctx.strokeStyle="#FF0000";
  ctx.beginPath();
  ctx.moveTo(paddleX,canvas.height);
  ctx.lineTo(paddleX+paddleWidth,canvas.height);
  ctx.stroke();
}
function drawBricks()
{
  for(c=0;c<brickRowCount;c++)
  {
    for(r=0;r<brickColumnCount;r++)
    {
      if(bricks[c][r].status==1)
      {
        var brickX=brickOffsetLeft+r*(brickWidth+brickPadding);
        var brickY=brickOffsetTop+c*(brickHeight+brickPadding);
        bricks[c][r].x=brickX;
        bricks[c][r].y=brickY;
        ctx.beginPath();
        ctx.rect(brickX,brickY,brickWidth,brickHeight);
        ctx.fillStyle="blue";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function collisionDetection() 
{
  for(var c=0; c<brickRowCount; c++) 
  {
    for(var r=0; r<brickColumnCount; r++) 
    {
      var b = bricks[c][r];
      if(b.status==1&&position_x>b.x-radius&&position_x<b.x+brickWidth+radius&&position_y<b.y+radius+brickHeight&&position_y>b.y-radius) 
      {
        dy=-dy;
        b.status=0;
        score++;
      }
    }
  }
}
function drawScore() 
{
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() 
{
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+live, 630, 20);
}
function setPosition()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
  drawLives();
  position_x+=dx;
  position_y-=dy;
  ballButtom=position_y+radius;
  ballTop=position_y-radius;
  ballLeft=position_x-radius;
  ballRight=position_x+radius;
  collisionDetection();
  if(ballRight>canvas.width||ballLeft<0)
  {
    dx=-dx;  
    colorNum=Math.floor(Math.random()*4);
  }
  if(ballTop<0)
  {
    dy=-dy;
    colorNum=Math.floor(Math.random()*4);
  }
  else if(ballButtom>canvas.height)
  {
    if(position_x>paddleX && position_x<paddleX+paddleWidth)
    {
      dy=-dy;
    }
    else
    {

      if(live==0)
        cancelAnimationFrame(request);  
      position_x=canvas.width/2;
      position_y=canvas.height-100;
      dx=6;
      dy=6;
      paddleX = canvas.width/2-paddleWidth;
      live--;
    }
  }
  if(rightPressed && paddleX<canvas.width-paddleWidth)
  {
    paddleX+=7;    
  }
  if(leftPressed && paddleX>0)
  {
    paddleX-=7;    
  }
  if(score == brickColumnCount*brickRowCount) 
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "36px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText("congratulations!", canvas.width/2, canvas.height/2);
    cancelAnimationFrame(request);
  }

  const request = requestAnimationFrame(setPosition);
}
setPosition();