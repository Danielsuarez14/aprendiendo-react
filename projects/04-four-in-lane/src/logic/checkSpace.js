import { COMBOS_WINNER } from "../constants"

export const checkSpace = (newBoard, index, turn) => {
    newBoard[index] = turn
    let j = index
    let first = j + 20
    let second = j + 15
    let third = j + 10
    let fourth = j + 5
    if (newBoard[first] === null && newBoard[j] !== null) {
      newBoard[first] = newBoard[j]
      newBoard[j] = null
    }
    
    else if (newBoard[second] === null && newBoard[j] !== null) {
      newBoard[second] = newBoard[j]
      newBoard[j] = null
    }
    
    else if (newBoard[third] === null && newBoard[j] !== null) {
      newBoard[third] = newBoard[j]
      newBoard[j] = null
    }
    
    else if (newBoard[fourth] === null && newBoard[j] !== null) {
      newBoard[fourth] = newBoard[j]
      newBoard[j] = null
    }
  }

export const checkWinner = (boardToCheck) => {
  for(const combo of COMBOS_WINNER){
    const [a,b,c,d] = combo
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c] &&
      boardToCheck[a] === boardToCheck[d]
    ){
      return boardToCheck[a]
    }
  }
  return null
}
  
  