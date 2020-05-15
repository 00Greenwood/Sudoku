var canvas = document.getElementById("sudokuCanvas");
var ctx = canvas.getContext("2d");
var gridSize = 75;
var textSize = 66;

function draw(majorGrid) {
  let minorGridWidth = gridSize * majorGrid.grid[0][0].width;
  let minorGridHeight = gridSize * majorGrid.grid[0][0].height;

  // Update canvas width and height
  canvas.width = majorGrid.width * minorGridWidth + 1;
  canvas.height = majorGrid.height * minorGridHeight + 1;

  drawMajorGrid(minorGridWidth, minorGridHeight);
  drawMinorGrid();
  drawNumbers(majorGrid);
}

function drawMajorGrid(width, height) {
  let w = canvas.width;
  let h = canvas.height;
  ctx.strokeStyle = "#DEDEDE";
  ctx.lineWidth = 2;
  for (let x = 0.5; x <= w; x += width) {
    for (let y = 0.5; y <= h; y += height) {
      ctx.strokeRect(x, y, width, height);
    }
  }
}

function drawMinorGrid() {
  let w = canvas.width;
  let h = canvas.height;
  ctx.strokeStyle = "#DEDEDE";
  ctx.lineWidth = 1;
  for (let x = 0.5; x <= w; x += gridSize) {
    for (let y = 0.5; y <= h; y += gridSize) {
      ctx.strokeRect(x, y, gridSize, gridSize);
    }
  }
}

function drawNumbers(majorGrid) {
  ctx.font = textSize.toString() + "px Roboto-Regular";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < majorGrid.width; ++i) {
    for (let j = 0; j < majorGrid.height; ++j) {
      let minorGrid = majorGrid.grid[i][j];
      for (let k = 0; k < minorGrid.width; ++k) {
        for (let l = 0; l < minorGrid.height; ++l) {
          let number = minorGrid.grid[k][l];
          if (number != 0) {
            ctx.fillText(
              number.toString(),
              0.5 + (0.5 + i * minorGrid.width + k) * gridSize,
              0.5 + (0.59 + j * minorGrid.height + l) * gridSize
            );
          }
        }
      }
    }
  }
}
