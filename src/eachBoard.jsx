import React from 'react';

const EachBoard = (props) => {

  const [reRender, setReRender] = React.useState([]);

  return (
    <div onClick={e => {props.setAppBoard(props.sudokuArr); props.forceRender()}}>
      <table className='other-tables'>
        <tbody>
        {props.sudokuArr.map((row, rIndex) => {
          return (<tr id={(rIndex+ 1) % 3 === 0 ? 'rowBorder' : ''} key={rIndex}>
            {props.sudokuArr[rIndex].map((column, cIndex) => {
              return <td key={rIndex + cIndex} id={(cIndex + 1) % 3 === 0 ? 'colBorder' : ''}>
                <input className='square-two' id='square-two' value={props.sudokuArr[rIndex][cIndex] === 0 ? '' : props.sudokuArr[rIndex][cIndex]} disabled></input>
              </td>
            })}
          </tr>)
        })}

        </tbody>
      </table>
    </div>
  )
}

export default EachBoard;