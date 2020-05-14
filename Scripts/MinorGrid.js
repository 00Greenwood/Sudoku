// The class representation of the minor grid in a sudoku.
// A minor grid is a width by height grid of numbers.
class MinorGrid {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    // Position in the major grid
    this.majorX = x;
    this.majorY = y;
    // Fill the grid with 0's
    this.grid = [];
    for (let i = 0; i < this.width; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.height; ++j) {
        this.grid[i][j] = this.calculateNumber(i,j);
      }
    }
  }

  calculateNumber(x, y){
    let rowModifier = this.majorX * this.width + x;
    let columnModifier = this.majorY + y * this.width;
    let number = rowModifier + columnModifier;
    let maximumNumber = this.width * this.height;
    return (number % maximumNumber) + 1;
  }

  permuteRows(i, j) {
    if (i == j) {
      return;
    }

  }

  permuteColumns(i, j) {
    if (i == j) {
      return;
    }
  }
}
