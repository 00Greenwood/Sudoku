var sudoku = new Sudoku(9);
sudoku.draw();

function onUpdateFocus(e) {
  sudoku.onUpdateFocus(e.offsetX, e.offsetY);
}

function onButtonClick(e, number) {
  sudoku.onButtonClick(number);
}