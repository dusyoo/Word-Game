import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
// import { FaBackspace } from 'react-icons/fa'

function Key( { keyVal, enterKey, backspaceKey } ) {
  const { board, setBoard, currAttempt, setCurrAttempt, onClickLetter, onDelete, onEnter  } = 
    useContext(AppContext);

  const clickLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
      // if (currAttempt.letterPos !== 5) return;
      // setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0 });
    } else if (keyVal === "DELETE") {
    // } else if (keyVal === <FaBackspace />) {
      onDelete();
      // if (currAttempt.letterPos === 0) return;
      // newBoard[currAttempt.attemptVal][currAttempt.letterPos - 1] = "";
      // setBoard(newBoard);
      // setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
    } else {
      onClickLetter(keyVal);
      // if (currAttempt.letterPos === 5) return;
      // newBoard[currAttempt.attemptVal][currAttempt.letterPos] = keyVal;
      // setBoard(newBoard);
      // setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
    }
  }
  return (
    <div className="key" id={enterKey ? 
                          enterKey && "enterKey" 
                          : backspaceKey && "backspaceKey"}
                          onClick={clickLetter}>
      {keyVal}
    </div>
  )
}

export default Key