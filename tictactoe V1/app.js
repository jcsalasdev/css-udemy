const boxes = document.querySelectorAll(".cell");
const cellElements = document.querySelectorAll('[data-cell]')
const boxesArray = Array.from(boxes);
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset-btn");
const prevH = document.querySelector(".prev-btn");
const nextH = document.querySelector(".next-btn");
const board = document.getElementById("board");

let circleTurn
const player1 = "circle";
const player2 = "x";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
drawBoard()

function drawBoard() {
  boxesArray.forEach((box, index) => {
    let border = "";

    if (index < 3) {
      border += "border-bottom: 5px solid;";
    }

    if (index % 3 === 0) {
      border += "border-right: 5px solid;";
    }

    if (index % 3 === 2) {
      border += "border-left: 5px solid;";
    }

    if (index > 5) {
      border += "border-top: 5px solid;";
    }
    box.style = border;

  });
 
}

startGame()

resetBtn.addEventListener('click', startGame)

function startGame() {
  circleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove(player1)
    cell.classList.remove(player2)
    cell.classList.remove('won')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })

  result.innerText = "Tic-Tac-Toe"
  prevH.classList.add('prev-btn')
  nextH.classList.add('next-btn')
 
  setBoardHoverClass()
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? player1: player2;
  result.innerText = circleTurn ? "x turn": "circle turn"
  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    result.innerText = 'Draw!'
  } else {
    result.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    boxes.forEach(boxes => boxes.removeEventListener("click", handleClick));
  }
  prevH.classList.remove('prev-btn')
  nextH.classList.remove('next-btn')


}

function isDraw() {
 
  return [...cellElements].every(cell => {
    return cell.classList.contains(player1) || cell.classList.contains(player2)
   
  })

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(player1)
  board.classList.remove(player2)
  if (circleTurn) {
    board.classList.add(player1)
  } else {
    board.classList.add(player2)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    const winStyle = combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    });

    if (winStyle) {
      combination.forEach(index => {
        boxes[index].classList.add("won");
      });
      return true;
    } else {
      return false;
    }
  });
 
}


