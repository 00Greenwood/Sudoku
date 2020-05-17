// Returns a number number between 0 and x - 1
function randomInt(x) {
  return Math.floor(Math.random() * x);
}

// Recursively reduce the matix you 
function KnuthsAlgorithmX(matrix) {
  let columnWithLeastOnes = findColumnWithLeastOnes(matrix);
  for (let i = 0; i < matrix.length; ++i) {
    if (matrix[i][columnWithLeastOnes] == 1){
      let reducdedMatrix = reduceMatrix(matrix, i, columnWithLeastOnes);
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

function reduceMatrix(matrix, i, j) {
  
}