import React from 'react'

const SudokuBoard = (props) => {

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const [sudokuArr, setSudokuArr] = React.useState(board)


  const solve = () => {

    let findSpot = findEmptySpot();

    if (!findSpot) {
      return true;
    } else {
      let row = findSpot[0];
      let col = findSpot[1];

      for (let i = 1; i < 10; i++) {
        if (checkIfValidNum(i, row, col)) {
          board[row][col] = i;
          if (solve()) {
            return true;
          }
          board[row][col] = 0
        }
      }

      return false;

    }
    setSudokuArr([...board]);

  }

  const checkIfValidNum = (num, row, col) => {

    row = Number(row);
    col = Number(col);

    board[row][col] = num;
    setSudokuArr([...board]);

    // Check row
    for (let i = 0; i < board[0].length; i++) {
      if(board[row][i] === num && col !== i) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < board.length; i++) {
      if(board[i][col] === num && row !== i) {
        return false;
      }
    }

    // Determine the 'box' that we are in
    let boxX = Math.floor(col / 3);
    let boxY = Math.floor(row / 3);

    // Check the box
    for (let i = (boxY * 3); i < ((boxY * 3) + 3); i++) {
      for (let j = (boxX * 3); j < ((boxX * 3) + 3); j++) {
        if (board[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }

    // if none of the tests fail, return true
    return true;
  }

  const changeBoard = (row, col, e) => {
    let num = parseInt(e.target.value) || 0;
    if (num > -1 && num < 10) {
      board[row][col] = num;
    }
    setSudokuArr(board);
  }

  return (
    <div id="sudoku-board">
      <table>
        <tbody>
        {rows.map((row, rIndex) => {
          return (<tr id={(row + 1) % 3 === 0 ? 'rowBorder' : ''} key={rIndex}>
            {columns.map((column, cIndex) => {
              return <td key={rIndex + cIndex} id={(column + 1) % 3 === 0 ? 'colBorder' : ''}>
                <input onChange={e => changeBoard(row, column, e)} defaultValue={sudokuArr[row][column] === 0 ? '' : sudokuArr[row][column]} className="square"></input>
              </td>
            })}
          </tr>)
        })}

        </tbody>
      </table>
    <button onClick={e => {solve(); setSudokuArr([...board]);}}>Solve</button>

    </div>
  )
}

export default SudokuBoard;