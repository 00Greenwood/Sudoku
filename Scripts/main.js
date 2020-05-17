var height = 2;
var width = 2;
var totalHeight = width * height;
var totalWidth =  height * width;
var sudokuNumbers = totalHeight;
var sudokuGrid = new MajorGrid(width, height);
// Create a solvable sudoku.
// Add some starting numbers, height * width - 1 is the minimum number of preset input required. 
while (sudokuGrid.countInputs() < height * width - 1) {
  let i = randomInt(totalWidth);
  let j = randomInt(totalHeight);
  sudokuGrid.setInputNumber(i, j, sudokuGrid.getNumber(i, j));
}
// Check the sudoku is unique, if not, add a number.
//while (!sudokuGrid.hasUniqueSolution()) {

//}

draw(sudokuGrid);
