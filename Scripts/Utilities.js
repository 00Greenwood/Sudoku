// Returns a number number between 0 and x - 1
function randomInt(x) {
  return Math.floor(Math.random() * x);
}

// Recursively reduce the matix you 
function KnuthsAlgorithmX(matrix) {
  let columnWithLeastOnes = findColumnWithLeastOnes(matrix);
  for (let i = 0; i < matrix.length; ++i) {
    if (matrix[i][columnWithLeastOnes] == 1) {
      let reducdedMatrix = reduceMatrix(matrix, i);
    }
  }
}

function findColumnWithLeastOnes(matrix) {
  minimumArray = [];
  for (let i = 0; i < matrix[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < matrix.length; ++j) {
      sum += matrix[j][i]
    }
    minimumArray.push(sum);
  }
  let minimumIndex = 0;
  for (let i = 1; i < minimumArray.length; i++) {
    if (minimumArray[i] < minimumArray[minimumIndex]) {
      minimumIndex = i;
    }
  }
  return minimumIndex;
}

function reduceMatrix(matrix, x) {
  let columnsToRemove = [];
  let rowsToRemove = [];
  for (let i = 0; i < matrix[x].length; ++i) {
    if (matrix[x][i] == 1) {
      columnsToRemove.push(i);
    }
  }
  for (let i = 0; i < columnsToRemove.length; ++i) {
    for (let j = 0; j < matrix[columnsToRemove[i]].length; ++j) {
      if (matrix[j][columnsToRemove[i]] == 1) {
        if (rowsToRemove.includes(j)) {
          rowsToRemove.push(j);
        }
      }
    }
  }
  let reducedMatrix = [];
  for (let i = 0; i < matrix.length; ++i) {
    if (!rowsToRemove.includes(i)) {
      reducedMatrix[i] = [];
      for (let j = 0; j < matrix[i].length; ++j) {
        if (!columnsToRemove.includes(j)) {
          reducedMatrix[i][j] = matrix[i][j];
        }
      }
    }
  }
  return reducedMatrix;
}