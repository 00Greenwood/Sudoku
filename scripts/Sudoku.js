var lightColor = "#f8f9fa";
var darkColor = "#6c757d";
var gridSize = 0;
var textSize = 0;

// The class representation of the sudoku.
class Sudoku {
  constructor(size) {
    this.width = size;
    this.height = size;
    this.numbers = size; // Sudoku contains 1 to numbers
    gridSize = (canvas.width - 1) / size;
    textSize = 0.75 * (canvas.width - 1) / size;
    this.inFocus = [-1, -1];
    // Fill the grid with minor grids.
    this.grid = [];
    for (let i = 0; i < this.width; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.height; ++j) {
        this.grid[i][j] = 0;
      }
    }
  }

  draw() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawGrid(ctx);
    this.drawNumbers(ctx);
  }

  drawGrid(ctx) {
    let w = canvas.width;
    let h = canvas.height;
    ctx.strokeStyle = lightColor;
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        ctx.strokeRect(
          0.5 + x * gridSize,
          0.5 + y * gridSize,
          gridSize,
          gridSize
        );
      }
    }
    ctx.lineWidth = 3;
    let minorWidth = Math.sqrt(this.width);
    let minorHeight = Math.sqrt(this.height);
    for (let x = 0; x < minorWidth; ++x) {
      for (let y = 0; y < minorHeight; ++y) {
        ctx.strokeRect(
          0.5 + x * minorWidth * gridSize,
          0.5 + y * minorHeight * gridSize,
          minorWidth * gridSize,
          minorHeight * gridSize
        );
      }
    }
    ctx.fillStyle = lightColor;
    ctx.fillRect(
      0.5 + this.inFocus[0] * gridSize,
      0.5 + this.inFocus[1] * gridSize,
      gridSize,
      gridSize
    );

  }

  drawNumbers(ctx) {
    ctx.font = textSize.toString() + "px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        if (x == this.inFocus[0] && y == this.inFocus[1]) {
          ctx.fillStyle = darkColor;
        }
        let number = this.grid[x][y];
        if (number != 0) {
          ctx.fillText(
            number.toString(),
            0.5 + Math.floor((0.5 + x) * gridSize),
            0.5 + Math.floor((0.59 + y) * gridSize)
          );
        }
        ctx.fillStyle = lightColor;
      }
    }
  }

  onUpdateFocus(x, y) {
    this.inFocus = [Math.floor(x / gridSize), Math.floor(y / gridSize)];
    this.draw();
  }

  onButtonClick(number) {
    this.grid[this.inFocus[0]][this.inFocus[1]] = number;
    this.draw();
  }

  onSolve() {
    this.recursivelyFindSoltuion(0);
  }

  recursivelyFindSoltuion(position) {
    if (position == this.width * this.height) {
      return true;
    }
    let x = position % this.width;
    let y = Math.floor(position / this.width);
    if (this.grid[x][y] != 0) {
      if (this.isValid()) {
        return this.recursivelyFindSoltuion(position + 1);
      }
      return false;
    }
    for (let i = 1; i <= this.numbers; ++i) {
      this.grid[x][y] = i;
      this.draw();
      if (this.isValid()) {
        if (this.recursivelyFindSoltuion(position + 1)) {
          return true;
        }
      }
    }
    return false;
  }

  isValid() {
    for (let x = 0; x < this.width; ++x) {
      this.isValidColumn(x);
      for (let y = 0; y < this.height; ++y) {
        this.isValidRow(y);
        this.isValidBox(x, y);
      }
    }
    return true;
  }

  isValidColumn(x) {
    let check = [];
    for (let i = 0; i < this.height; ++i) {
      if (this.grid[x][i] != 0) {
        if (check.includes(this.grid[x][i])) {
          return false;
        }
        check.push(this.grid[x][i]);
      }
    }
    return true;
  }

  isValidRow(y) {
    let check = [];
    for (let i = 0; i < this.width; ++i) {
      if (this.grid[i][y] != 0) {
        if (check.includes(this.grid[i][y])) {
          return false;
        }
        check.push(this.grid[i][y]);
      }
    }
    return true;
  }

  isValidBox(x, y) {
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        this.grid[x][y];
      }
    }
    return true;
  }
}
