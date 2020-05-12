// The class representation of the sudoku grid.
// minor grid is a width by height grid of numbers.
// major grid is a height by width grid of minor grids.
class Grid {
  constructor(width, height) {
    this.minorWidth = width;
    this.minorHeight = height;
    this.majorWidth = width * this.minorHeight;
    this.majorHeight = height * this.minorWidth;
    // Fill the grid with 0's
    this.grid = [];
    for (let i = 0; i < this.majorWidth; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.majorHeight; ++j) {
        this.grid[i][j] = 0;
      }
    }
  }
}
