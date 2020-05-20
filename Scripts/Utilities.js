// Returns a number number between 0 and x - 1
function randomInt(x) {
  return Math.floor(Math.random() * x);
}

// Recursively reduce the matix you 
function KnuthsAlgorithmX(matrix) {
  let columnWithLeastOnes = findColumnWithLeastOnes(matrix);
  for (let i = 0; i < matrix.length; ++i) {
    if (matrix[i][columnWithLeastOnes] == 1) {
      let toRemove = columnsAndRowstoRemove(matrix, i);
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

function columnsAndRowstoRemove(matrix, rowIndex) {
  let toRemove = [[], []];
  for (let i = 0; i < matrix[rowIndex].length; ++i) {
    if (matrix[rowIndex][i] == 1) {
      toRemove[0].push(i);
    }
  }
  for (let i = 0; i < toRemove[0].length; ++i) {
    for (let j = 0; j < matrix.length; ++j) {
      if (matrix[j][toRemove[0][i]] == 1) {
        if (!toRemove[1].includes(j)) {
          toRemove[1].push(j);
        }
      }
    }
  }
  return toRemove;
}