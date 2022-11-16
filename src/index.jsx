import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import SudokuBoard from './sudokuBoard.jsx';
import OtherBoards from './otherboards.jsx';

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

const App = () => {

  const [reRender, setReRender] = React.useState([]);

  const copyBoard = (bo) => {
    return JSON.parse(JSON.stringify(bo));
  }

  let appBoard = copyBoard(board);

  const setAppBoard = (arr) => {
    appBoard = copyBoard(arr);
  }

  const forceRender = () => {
    setReRender([...reRender]);
  }

  return(
    <div className='app-body'>
      <h1>Sudoku Solver</h1>
      <div>
        <SudokuBoard board={appBoard} copyBoard={copyBoard}/>
      </div>
      <div>
        <OtherBoards setAppBoard={setAppBoard} forceRender={forceRender}/>
      </div>
    </div>
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
