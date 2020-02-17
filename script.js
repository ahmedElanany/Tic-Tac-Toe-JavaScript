const X_CLASS ='x'
const Circle_CLASS = 'circle'
const Winning_Compination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(Circle_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? Circle_CLASS : X_CLASS
    placemark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame (draw) { 
    if(draw) { 
        winningMessage.innerText = 'Draw!'
    } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() { 
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(Circle_CLASS)
    })
}

// PLACE MARK 
function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}
// swap Turns
function swapTurns() {
    circleTurn = !circleTurn
}
    // for Hovering
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(Circle_CLASS)
    if (circleTurn) {
        board.classList.add(Circle_CLASS)
    }else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return Winning_Compination.some(compination => {
        return compination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}