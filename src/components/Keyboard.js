import React from 'react';
import { useEffect } from 'react';
import Key from './Key';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useCallback } from 'react';

// import { FaBackspace } from 'react-icons/fa'

function Keyboard() {
  const { onClickLetter, onEnter, onDelete, wordFound, currAttempt } = useContext(AppContext);

  const keyrow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyrow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyrow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // using useCallback hook to prevent constantly updating functions in components
  const handleKeyboard = useCallback((e) => {
    if (wordFound) {
      document.removeEventListener("keydown", handleKeyboard);
    } else if(e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
      onDelete();
    } else {
      keyrow1.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onClickLetter(key);
        }
      });
      keyrow2.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onClickLetter(key);
        }
      });
      keyrow3.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onClickLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keyrow1.map((key) => {
          return <Key keyVal={key}/>;
        })}
      </div>
      <div className="line2">
        {keyrow2.map((key) => {
          return <Key keyVal={key}/>;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} enterKey/>
        {keyrow3.map((key) => {
          return <Key keyVal={key}/>;
        })}
        <Key keyVal={"DELETE"} backspaceKey/>
        {/* <Key keyVal={<FaBackspace />} backspaceKey/> */}
      </div>
    </div>
  )
}

export default Keyboard