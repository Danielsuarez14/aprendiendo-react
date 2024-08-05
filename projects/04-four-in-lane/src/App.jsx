import './App.css'
import { useState } from 'react'
import { checkSpace, checkWinner } from './logic/checkSpace'
import { TURNS, checkEndGame } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import confetti from "canvas-confetti"


function App() {
  const [board, setBoard] = useState(
    Array(25).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
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
    if (newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)) {
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
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section>
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </section>
    </main>
  )
}

export default App

