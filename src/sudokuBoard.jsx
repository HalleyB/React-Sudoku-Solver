import React from 'react';
import axios from 'axios';


const SudokuBoard = (props) => {

  let board = props.copyBoard(props.board);

  const saveBoard = () => {
    axios.post('/sudoku', sudokuArr)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }


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
  }

  const watchSolve = (callback) => {

    let findSpot = findEmptySpot();

    if (!findSpot) {
      return callback(true);
    } else {
      let row = findSpot[0];
      let col = findSpot[1];

      let i = 1;

      const nextStep = () => {
        if (i < 10) {
          board[row][col] = i;
          props.setBoard(props.copyBoard(board))
          if (checkIfValidNum(i, row, col)) {
            watchSolve(function (solved) {
              if (solved) {
                callback(true);
              } else {
                board[row][col] = 0;
                i++;
                setTimeout(nextStep, 50);
              }
            });
          } else {
            i++
            setTimeout(nextStep, 50);
          }
        } else {
          board[row][col] = 0;
          callback(false)
        }
      }
      nextStep();

    }
  }

  const findEmptySpot = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return false;
  }

  const checkIfValidNum = (num, row, col) => {
    row = Number(row);
    col = Number(col);

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
      if(checkIfValidNum(num, row, col)) {
        board[row][col] = num;
      }
    }
    props.setBoard(props.copyBoard(board));
  }

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = 0;
      }
    }
    props.setBoard(props.copyBoard(board));
  }

  return (
    <div id="sudoku-board">
      <table className='sudoku-table'>
        <tbody>
        {props.board.map((row, rIndex) => {
          return (<tr id={(rIndex+ 1) % 3 === 0 ? 'rowBorder' : ''} key={rIndex}>
            {props.board[rIndex].map((column, cIndex) => {
              return <td key={rIndex + cIndex} id={(cIndex + 1) % 3 === 0 ? 'colBorder' : ''}>
                <input onChange={e => changeBoard(rIndex, cIndex, e)} className="square" value={props.board[rIndex][cIndex] === 0 ? '' : props.board[rIndex][cIndex]} id="square"></input>
              </td>
            })}
          </tr>)
        })}

        </tbody>
      </table>
    <button onClick={e => {solve(); props.setBoard(props.copyBoard(board));}}>Solve</button>
    <button onClick={e => {watchSolve((solved) =>  {
      if (solved){
        props.setBoard(props.copyBoard(board))
      }})}}>Watch Solve</button>
    <button onClick={e => {saveBoard()}}>Save Board</button>
    <button onClick={e => reset()}>Reset</button>

    </div>
  )
}

export default SudokuBoard;