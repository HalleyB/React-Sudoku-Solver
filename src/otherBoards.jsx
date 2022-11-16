import React from 'react';
import axios from 'axios';
import EachBoard from './eachBoard.jsx';

const OtherBoards = (props) => {

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


  return (
    <div className='other-boards-div'>
      {boards.map(board => {
        return <EachBoard key={board} sudokuArr={board} setAppBoard={props.setAppBoard} forceRender={props.forceRender}/>
      })}
      <button onClick={e => getBoards()}>See other boards</button>
    </div>
  )
}

export default OtherBoards;