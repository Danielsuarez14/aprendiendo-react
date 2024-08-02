import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { TURNS, checkEndGame } from './constants'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import confetti from "canvas-confetti"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [counterBurger, setCounterBurger] = useState(0)
  const [counterCucumber, setCounterCucumber] = useState(0)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringifynewBoard)


    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      if (newWinner === TURNS.X) {
        setCounterBurger(prevCount => prevCount + 1)
         }else if (newWinner === TURNS.O) {
          setCounterCucumber(prevCount => prevCount + 1)
        }
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Triqui</h1>
      <div className='counter'>
        <Square>{counterBurger}</Square>
        <button onClick={resetGame}>Reset del juego</button>
        <Square>{counterCucumber}</Square>
      </div>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
