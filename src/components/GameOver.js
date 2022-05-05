import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.wordFound ? "You found the word!" : "You failed to find the word."}</h3>
      <h1>Word: {correctWord}</h1>
      <h3>{currAttempt.attemptVal} attempts</h3>
    </div>
  )
}

export default GameOver