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

  // Fill the grid with numbers from 1 to majorWidth*majorHeight.
  initilize() {
    for (let i = 0; i < this.majorWidth; ++i) {
      for (let j = 0; j < this.majorHeight; ++j) {
        this.grid[i][j] = this.randomPossibleNumber(i, j);
      }
    }
  }

  // Return a random number that is allowed in that space.
  randomPossibleNumber(x, y) {
    let listOfPossibleNumbers = this.possibleNumbers(x, y);
    let randomIndex = Math.floor(Math.random() * listOfPossibleNumbers.length);
    return listOfPossibleNumbers[randomIndex];
  }

  // Return a list of numbers that could fit in the space.
  possibleNumbers(x, y) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}
