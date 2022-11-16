import React from 'react';
import axios from 'axios';
import EachBoard from './eachBoard.jsx';

const OtherBoards = (props) => {


  return (
    <div className='other-boards-div'>
      {props.boards.map(board => {
        return <EachBoard key={board} sudokuArr={board} setAppBoard={props.setAppBoard} forceRender={props.forceRender}/>
      })}

    </div>
  )
}

export default OtherBoards;