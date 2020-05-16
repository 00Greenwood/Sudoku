// The class representation of themajor grid of a sudoku.
// A major grid is a width by height grid of minor grids of size height by width.
class MajorGrid {
  constructor(width, height) {
    this.width = width; // minor grid height
    this.height = height; // minor grid width
    // Fill the grid with minor grids.
    this.grid = [];
    for (let i = 0; i < this.width; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.height; ++j) {
        // Swap width and height to make sudoku square.
        this.grid[i][j] = new MinorGrid(this.height, this.width, i, j);
      }
    }
    // Permute the row and columns.
    for (let i = 0; i < Math.pow(this.width * this.height, 3); ++i) {
      this.permute();
    }
    // Whilst solvable remove a random number from the grid.
    while(true) {
      let x = randomInt(this.width);
      let y = randomInt(this.height);
      let minorGrid = this.grid[x][y];
      let i = randomInt(minorGrid.width);
      let j = randomInt(minorGrid.height);
      let number = minorGrid.inputGrid[i][j];
      minorGrid.inputGrid[i][j] = 0;
      if (!this.isSolvable()) {
        minorGrid.inputGrid[i][j] = number;
        break;
      }
      break;
    }
  }

  // Permute a pair of rows or columns.
  permute() {
    switch (randomInt(4)) {
      case 0:
        this.permuteMajorRow();
        break;
      case 1:
        this.permuteMajorColumn();
        break;
      case 2:
        this.permuteMinorRow();
        break;
      case 3:
        this.permuteMinorColumn();
        break;
      default:
        break;
    }
  }

  // Permute a random pair of rows in the Major Grid.
  permuteMajorRow() {
    let i = randomInt(this.height);
    let j = randomInt(this.height);
    if (i == j) {
      return;
    }
    for (let k = 0; k < this.width; ++k) {
      let temp = this.grid[k][i];
      this.grid[k][i] = this.grid[k][j];
      this.grid[k][j] = temp;
    }
  }

  // Permute a random pair of columns in the Major Grid.
  permuteMajorColumn() {
    let i = randomInt(this.width);
    let j = randomInt(this.width);
    if (i == j) {
      return;
    }
    for (let k = 0; k < this.height; ++k) {
      let temp = this.grid[i][k];
      this.grid[i][k] = this.grid[j][k];
      this.grid[j][k] = temp;
    }
  }

  // Permute a pair of rows in a random minor grid.
  permuteMinorRow() {
    let i = randomInt(this.height);
    let j = randomInt(this.width);
    let k = randomInt(this.width);
    for (let l = 0; l < this.width; ++l) {
      this.grid[l][i].permuteRows(j, k);
    }
  }

  // Permute a pair of columns in a random minor grid.
  permuteMinorColumn() {
    let i = randomInt(this.width);
    let j = randomInt(this.height);
    let k = randomInt(this.height);
    for (let l = 0; l < this.height; ++l) {
      this.grid[i][l].permuteColumns(j, k);
    }
  }

  isSolvable(){
    return true;
  }
}
