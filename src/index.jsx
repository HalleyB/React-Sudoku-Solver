import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SudokuBoard from './sudokuBoard.jsx'

const App = () => {
  return(
    <div>
      <SudokuBoard />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))