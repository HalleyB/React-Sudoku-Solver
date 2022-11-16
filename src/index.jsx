import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import SudokuBoard from './sudokuBoard.jsx';
import OtherBoards from './otherboards.jsx';


const App = () => {

  const [reRender, setReRender] = React.useState([]);

  const copyBoard = (bo) => {
    return JSON.parse(JSON.stringify(bo));
  }

  const [appBoard, setAppBoard] = React.useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ])

  const [boards, setBoards] = React.useState([]);

  const getBoards = () => {
    axios.get('/sudoku')
    .then(boardsData => {
      let boardsArray = [];
      for (let i = 0; i < boardsData.data.length; i++) {
        let curBoard = []
        for (let key in boardsData.data[i]) {
          if (key !== '_id' && key !== '__v') {
            curBoard.push(boardsData.data[i][key]);
          }
        }
        boardsArray.push(curBoard);
      }
      setBoards(boardsArray);
    })
  }

  React.useEffect(() => {
    getBoards()
  }, [])

  const forceRender = () => {
    setReRender([...reRender]);
  }

  return(
    <div className='app-body'>
      <h1>Sudoku Solver</h1>
      <div className='flex-container'>
        <div className='flex-sudoku'>
          <SudokuBoard board={appBoard} setBoard={setAppBoard} copyBoard={copyBoard} getBoards={getBoards}/>
        </div>
        <div className='flex-other'>
          <OtherBoards setAppBoard={setAppBoard} forceRender={forceRender} boards={boards}/>
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
