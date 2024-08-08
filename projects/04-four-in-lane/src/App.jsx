import './App.css'
import { useState } from 'react'
import { checkSpace, checkWinner } from './logic/checkSpace'
import { TURNS, checkEndGame } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import confetti from "canvas-confetti"
import Magnet from '../../sounds/Magnets.mp3'
import Point from '../../sounds/punto.mp3'
import useSound from 'use-sound'


function App() {
  const [board, setBoard] = useState(
    Array(25).fill(null)
  )

  const [play, { stop }] = useSound(Magnet)
  const [state, setState] = useState(false)
  const musicButton = () => {
    if (!state) {
      play()
      setState(!state)
    } else if (state) {
      stop()
      setState(!state)
    }
  }

  const [playPoint] = useSound(Point)
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [counterRed, setCounterRed] = useState(0)
  const [counterYellow, setCounterYellow] = useState(0)


  const resetGame = () => {
    setBoard(Array(25).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    checkSpace(newBoard, index, turn)
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      playPoint()
      setWinner(newWinner)
      if (newWinner === TURNS.X) {
        setCounterRed(prevCount => prevCount + 1)
      } else if (newWinner === TURNS.O) {
        setCounterYellow(prevCount => prevCount + 1)
      }
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Triqui</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <section className='counter'>
          <Square >{counterRed}</Square>
        </section>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <button onClick={musicButton}>{state ? 'Stop Music': 'Play music'}</button>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
        <section className='counter'>
          <Square >{counterYellow}</Square>
        </section>
      </section>
      <section>
        <WinnerModal winner={winner}
        resetGame={resetGame}/>
      </section>
    </main>
  )
}

export default App

