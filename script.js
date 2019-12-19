var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
canvas.height=500;
canvas.width=500;

ctx.lineWidth = 25;
ctx.strokeStyle="#FFFFFF"

ctx.beginPath();
ctx.fillStyle="#00008B";

ctx.arc(300,200,200,0,Math.PI*2);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle="#FFFFFF";
ctx.moveTo(200,26);
ctx.lineTo(200,200);
ctx.lineTo(300,250);
ctx.lineTo(300,500);
ctx.lineTo(300,250);
ctx.lineTo(400,200);
ctx.lineTo(400,50);
ctx.lineTo(300,0);
ctx.lineTo(200,50);
ctx.stroke();

ctx.beginPath();
ctx.fillStyle="#FFFFFF";
ctx.arc(300,120,45,0,Math.PI*2);
ctx.fill();
ctx.stroke();
