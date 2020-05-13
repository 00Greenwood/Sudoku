// The class representation of themajor grid of a sudoku.
// A major grid is a width by height grid of minor grids of size height by width.
class MajorGrid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    // Fill the grid with minor grids
    this.grid = [];
    for (let i = 0; i < this.width; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.height; ++j) {
        // Swap width and height to make sudoku square.
        this.grid[i][j] = new MinorGrid(this.height, this.width, i, j);
      }
    }
  }
}
