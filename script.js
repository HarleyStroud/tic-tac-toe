

function Gameboard () {
    const board = [];

    for(let i = 0; i < 3; i++) {
        board[i] = [];
    }


    const setBoard = () => {
        for(let i = 0; i < 3; i++) {
            for(let k = 0; k < 3; k++) {
                board[i][k] = "";
            }
        }
    }
    setBoard();

    const getBoard = () => board;

    const placeToken = (rowPosition, columnPosition, player) => {
        if(board[rowPosition][columnPosition] === "") {
            board[rowPosition][columnPosition] = player;
        }
    }


    

    const printBoard = () => {
        for(let i = 0; i < 3; i++) {
            console.log(board[i]);
        }
    }

    return {getBoard, placeToken, printBoard, setBoard};
}



function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const gameState = {turnsTaken: 0, isGameOver: false, isDraw: false, winner: ""};

    // Array of player objects.
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];


    let activePlayer = players[0];


    const switchPlayerTurn = () => {
        if(activePlayer === players[0]) {
            activePlayer = players[1];
        }
        else {
            activePlayer = players[0];
        }
    }


    const getActivePlayer = () => {
        return activePlayer;
    }


    const getGameState = () => {
        return gameState;
    }

    const resetGameState = () => {
        board.setBoard();
        activePlayer = players[0];
        gameState.turnsTaken = 0;
        gameState.isGameOver = false;
        gameState.isDraw = false;
        gameState.winner = "";
    }


    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }


    printNewRound();


    const playRound = (rowPosition, columnPosition) => {
        if(gameState.isGameOver) {
            return;
        }

        if(board.getBoard()[rowPosition][columnPosition] !== "") {
            return
        }

        board.placeToken(rowPosition, columnPosition, activePlayer.token);
        gameState.turnsTaken++;
        let playerHasWon = false;
        // First check 3 in a row
        /*
            [xxx]
            [   ]
            [   ]
        */
        
        for(let i = 0; i < 3; i++) {
            let tokenCountInRow = 0;
            for(let k = 0; k < 3; k++) {
                if(board.getBoard()[i][k] === activePlayer.token) {
                    tokenCountInRow++;
                }
            }

            if(tokenCountInRow === 3) {
                playerHasWon = true;
                console.log(`${activePlayer.name} Wins!`);
            }
        }

        // Check 3 in the same column.
        /*
            [x  ]
            [x  ]
            [x  ]
        */

        for(let columnPosition = 0; columnPosition < 3; columnPosition++) {
            let tokenCountInColumn = 0;

            for(let rowPosition = 0; rowPosition < 3; rowPosition++) {
                if(board.getBoard()[rowPosition][columnPosition] == activePlayer.token) {
                    tokenCountInColumn++;
                }
                else {
                    // Can stop checking if the first position in a column (the square at the "top" of the board) does not match the players token, 
                    // since the first position must match the players token in order for them to win with 3 in one column.
                    break;  
                }
            }
            
            if(tokenCountInColumn === 3) {
                playerHasWon = true;
                console.log(`${activePlayer.name} Wins!`);
            }
        }


        // Check 3 diagonally.
        /*
            [x  ]
            [ x ]  
            [  x]
        or
            [  x]
            [ x ]
            [x  ]
        */

        // First check middle position of the board, since this piece always needs to match the players token in order for a diagonal win to occur.
        if(board.getBoard()[1][1] == activePlayer.token) {
            // Check each corner position.
            if(board.getBoard()[0][0] == activePlayer.token) {
                if(board.getBoard()[2][2] == activePlayer.token) {
                    console.log(`${activePlayer.name} Wins!`);
                    playerHasWon = true;
                }
            }
            else if(board.getBoard()[0][2] == activePlayer.token) {
                if(board.getBoard()[2][0] == activePlayer.token) {
                    console.log(`${activePlayer.name} Wins!`);
                    playerHasWon = true;
                }
            }
        }

        if(playerHasWon) {
           gameState.isGameOver = true;
           gameState.winner = activePlayer.name; 
        }
        else if(gameState.turnsTaken === 9) {
            gameState.isGameOver = true;
            gameState.isDraw = true;
        }
        else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    return {playRound, getActivePlayer, getBoard: board.getBoard, getGameState, resetGameState};
}



function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const playAgainBtn = document.querySelector('.play_again_btn');


    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const gameState = game.getGameState();
        const activePlayer = game.getActivePlayer();
        
        if(gameState.isGameOver) {
            if(gameState.isDraw) {
                playerTurnDiv.textContent = "DRAW!";
            }
            else {
                playerTurnDiv.textContent = `${gameState.winner} WINS!`;
            }
        }
        else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
        }
        

        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;

                cellButton.textContent = board[rowIndex][columnIndex];
                boardDiv.appendChild(cellButton);
            })
            
        });
    }

    boardDiv.addEventListener('click', (event) => {
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;

        if(!selectedRow) {
            return;
        }

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    })


    playAgainBtn.addEventListener('click', (event) => {
        game.resetGameState();
        updateScreen();
    });

    updateScreen();
}




ScreenController();
