const boxes = Array.from(document.getElementsByClassName('box'));
const gameText = document.getElementById('gameText');
const turnText = document.getElementById('turn');
const restartBtn = document.getElementById('restart');
const spaces = [null, null, null, null, null, null, null, null];
const O_Player = "O";
const X_Player = "X";
let tied = 1;
let currentPlayer = O_Player;

turnText.innerText = `${currentPlayer}'s turn!`
const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid var(--main-color);`;
        }
        if (index % 3 == 0) {
            styleString += `border-right: 3px solid var(--main-color);`;
        }
        if (index % 3 == 2) {
            styleString += `border-left: 3px solid var(--main-color);`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid var(--main-color);`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
}

const boxClicked = (e) => {
    // id stores the id of the touched box
    const id = e.target.id;
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        e.target.style.color = currentPlayer === O_Player ? '#000' : '#e6d5b8';
        if(playerHasWon(currentPlayer)) {
            turnText.innerText = '';
            gameText.innerText = `${currentPlayer} has won!`;
            return;
        }
        if(currentPlayer === O_Player) {
            currentPlayer = X_Player;
        } else {
            currentPlayer = O_Player;
        }
    }
    tied = 1;
    for(var i = 0; i < spaces.length; i++) {
        if(spaces[i] === null) {
            tied = 0;
        }
    }
    if(tied == 1) {
        turnText.innerText = '';
        gameText.innerText = 'Tied!';
        return;
    }
    console.log(currentPlayer);
    turnText.innerText = `${currentPlayer}'s turn!`
}

const playerHasWon = () => {
    if(spaces[0] === currentPlayer) {
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            return true;
        }
    }
    if(spaces[4] === currentPlayer) {
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            return true;
        }
    }
    if(spaces[8] === currentPlayer) {
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            return true;
        }
    }
}

const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    boxes.forEach(box => {
        box.innerText = '';
    })
    gameText.innerText = 'Welcome to Tic Tac Toe!';
    currentPlayer = O_Player;
}

restartBtn.addEventListener('click', restart);

restart();
drawBoard();