var canvas = document.getElementById("sudokuCanvas");
var ctx = canvas.getContext("2d");
var gridSize = 50;
var textSize = 42;
var sudokuGrid = new Grid(3, 3);
var w = sudokuGrid.majorWidth * gridSize + 1;
var h = sudokuGrid.majorHeight * gridSize + 1;

// Update canvas width and height
canvas.width = w;
canvas.height = h;

draw();

function draw() {
  drawMajorGrid();
  drawMinorGrid();
  drawNumbers();
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
  for (let y = 0.5; y <= h; y += gridSize * sudokuGrid.minorHeight) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

function drawNumbers() {
  ctx.font = textSize.toString() + "px Roboto-Regular";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < sudokuGrid.majorWidth; ++i) {
    for (let j = 0; j < sudokuGrid.majorHeight; ++j) {
      ctx.fillText(
        sudokuGrid.grid[i][j].toString(),
        gridSize / 2 + i * gridSize,
        gridSize / 2 + gridSize * 0.08 + j * gridSize
      );
    }
  }
}
