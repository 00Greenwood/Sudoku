var canvas = document.getElementById("sudokuCanvas");
var ctx = canvas.getContext("2d");
var gridSize = 50;
var sudokuGrid = new Grid(2, 2);
var w = sudokuGrid.majorWidth * gridSize + 1;
var h = sudokuGrid.majorHeight * gridSize + 1;

// Update canvas width and height
canvas.width = w;
canvas.height = h;

sudokuGrid.initilize();
draw();

function draw() {
  drawMajorGrid();
  drawMinorGrid();
}

function drawMinorGrid() {
  ctx.strokeStyle = "#DEDEDE";
  ctx.lineWidth = 1;
  for (let x = 0.5; x <= w; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0.5; y <= h; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

function drawMajorGrid() {
  ctx.strokeStyle = "#DEDEDE";
  ctx.lineWidth = 3;
  for (let x = 0.5; x <= w; x += gridSize * sudokuGrid.minorWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0.5; y <= h; y += gridSize* sudokuGrid.minorHeight) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

function drawNumbers() {
  ctx.font = gridSize.toString() + "px Roboto-Regular";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Hello World", canvas.width/2, canvas.height/2); 
}
