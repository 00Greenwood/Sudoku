// The class representation of themajor grid of a sudoku.
// A major grid is a width by height grid of minor grids of size height by width.
class MajorGrid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.minorWidth = height;
    this.minorHeight = width;
    this.numbers = width * height; // Grid contains 1 to numbers
    // Fill the grid with minor grids.
    this.grid = [];
    for (let i = 0; i < this.width; ++i) {
      this.grid[i] = [];
      for (let j = 0; j < this.height; ++j) {
        this.grid[i][j] = new MinorGrid(this.minorWidth, this.minorHeight, i, j);
      }
    }
    // Permute the row and columns, mixing up the grid.
    for (let i = 0; i < Math.pow(this.numbers, 4); ++i) {
      this.permute();
    }
  }

  // Permute a pair of rows or columns.
  permute() {
    switch (randomInt(5)) {
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
      case 4:
        this.permuteNumbers();
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
    let j = randomInt(this.minorHeight);
    let k = randomInt(this.minorHeight);
    for (let l = 0; l < this.width; ++l) {
      this.grid[l][i].permuteRows(j, k);
    }
  }

  // Permute a pair of columns in a random minor grid.
  permuteMinorColumn() {
    let i = randomInt(this.width);
    let j = randomInt(this.minorWidth);
    let k = randomInt(this.minorWidth);
    for (let l = 0; l < this.height; ++l) {
      this.grid[i][l].permuteColumns(j, k);
    }
  }

  // Permute a pair of numbers.
  permuteNumbers() {
    let i = 1 + randomInt(this.numbers);
    let j = 1 + randomInt(this.numbers);
    for (let k = 0; k < this.width; ++k) {
      for (let l = 0; l < this.height; ++l) {
        this.grid[k][l].permuteNumbers(i, j);
      }
    }
  }

  countInputs() {
    let sum = 0;
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        sum += this.grid[i][j].countInputs();
      }
    }
    return sum;
  }

  getInputNumber(i, j) {
    let x = Math.floor(i / this.minorWidth);
    let y = Math.floor(j / this.minorHeight);
    let minorX = i % this.minorWidth;
    let minorY = j % this.minorHeight;
    return this.grid[x][y].inputGrid[minorX][minorY];
  }

  setInputNumber(i, j, number) {
    let x = Math.floor(i / this.minorWidth);
    let y = Math.floor(j / this.minorHeight);
    let minorX = i % this.minorWidth;
    let minorY = j % this.minorHeight;
    this.grid[x][y].inputGrid[minorX][minorY] = number;
  }

  getNumber(i, j) {
    let x = Math.floor(i / this.minorWidth);
    let y = Math.floor(j / this.minorHeight);
    let minorX = i % this.minorWidth;
    let minorY = j % this.minorHeight;
    return this.grid[x][y].grid[minorX][minorY];
  }

  hasUniqueSolution() {
    // Initial exact cover matrix with 1's and 0's.
    let exactCoverMatrix = [];
    for (let i = 0; i < this.numbers; ++i) {
      for (let j = 0; j < this.numbers; ++j) {
        for (let k = 0; k < this.numbers; ++k) {
          let index = k + j * this.numbers + i * this.numbers * this.numbers;
          exactCoverMatrix[index] = [];
          for (let l = 0; l < 4 * Math.pow(this.numbers, 2); ++l) {
            if (this.getInputNumber(i, j) == 0) {
              exactCoverMatrix[index][l] = this.calculate1or0(i, j, k, l);
            } else if (this.getInputNumber(i, j) == k + 1) {
              exactCoverMatrix[index][l] = this.calculate1or0(i, j, k, l);
            } else {
              exactCoverMatrix[index][l] = 0;
            }
          }
        }
      }
    }
    // Perform Knuth's Algorithm X recursivly.
    let reducedMatrix = KnuthsAlgorithmX(exactCoverMatrix);


    return true;
  }

  calculate1or0(rowIndex, columnIndex, numberIndex, constraintIndex) {
    let minorX = Math.floor(columnIndex / this.minorWidth);
    let minorY = Math.floor(rowIndex / this.minorHeight);
    let boxIndex = minorY + this.width * minorX;
    let constraintGroup = Math.floor(constraintIndex / Math.pow(this.numbers, 2));
    let constraintSubIndex = constraintIndex % Math.pow(this.numbers, 2);
    switch (constraintGroup) {
      case 0:
        // If the constriant index lines up with the column index and row index, return 1.
        if (constraintSubIndex == columnIndex + rowIndex * this.numbers) {
          return 1;
        }
        break;
      case 1:
        // If the constriant index lines up with the row index and number index, return 1.
        if (constraintSubIndex == numberIndex + rowIndex * this.numbers) {
          return 1;
        }
        break;
      case 2:
        // If the constriant index lines up with the column index and number index, return 1.
        if (constraintSubIndex == numberIndex + columnIndex * this.numbers) {
          return 1;
        }
        break;
      case 3:
        // If the constriant index lines up with the box index and number index, return 1.
        if (constraintSubIndex == numberIndex + boxIndex * this.numbers) {
          return 1;
        }
        break;
      default:
        break;
    }
    return 0;
  }
}
