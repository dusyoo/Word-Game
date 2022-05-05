import React from 'react';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { boardDefault, generateWordSet } from './WordsBoard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attemptVal: 0, letterPos: 0});
  const updateBoard = [...board];
  const [correctWord, setCorrectWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());
  const [gameOver, setGameOver] = useState({gameOver: false, wordFound: false});

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);


  // User clicks letter on keyboard
  const onClickLetter = (keyVal) => {
    if (currAttempt.letterPos === 5) return;
    updateBoard[currAttempt.attemptVal][currAttempt.letterPos] = keyVal;
    setBoard(updateBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  }

  // User presses Enter key
  const onEnter = () => {
    console.log(correctWord);
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attemptVal][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attemptVal: currAttempt.attemptVal + 1, letterPos: 0 });
    } else {
      alert("Word does not exist");
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({gameOver: true, wordFound: true});
    } else if (currAttempt.attemptVal === 5) {
      setGameOver({gameOver: true, wordFound: false});
    }
    setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0 });
  }

  // User presses Backspace key
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    updateBoard[currAttempt.attemptVal][currAttempt.letterPos - 1] = "";
    setBoard(updateBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
  }

  
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {/* Creating context to pass board, attempt, and keys to components */}
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onClickLetter, onDelete, onEnter, gameOver, setGameOver, correctWord }}>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
