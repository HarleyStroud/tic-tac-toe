

function Gameboard () {
    const board = [];

    for(let i = 0; i < 3; i++) {
        board[i] = [];
    }

    for(let i = 0; i < 3; i++) {
        for(let k = 0; k < 3; k++) {
            board[i][k] = "";
        }
    }

    const getBoard = () => board;

    const placeToken = (position, player) => {

        let positionNumber = 0;
        for(let i = 0; i < 3; i++) {

            for(let k = 0; k < 3; k++) {
                if(positionNumber === position) {
                    if(board[i][k] === "") {
                        board[i][k] = player;
                    }   
                }

                positionNumber++;
            }
        }

    }

    const printBoard = () => {
        for(let i = 0; i < 3; i++) {
            console.log(board[i]);
        }
    }

    return {getBoard, placeToken, printBoard};
}



function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

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


    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }


    printNewRound();


    const playRound = (position) => {
        board.placeToken(position, activePlayer.token);

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
                }
            }
            else if(board.getBoard()[0][2] == activePlayer.token) {
                if(board.getBoard()[2][0] == activePlayer.token) {
                    console.log(`${activePlayer.name} Wins!`);
                }
            }
        }
        

        switchPlayerTurn();
        printNewRound();
    }

    return {playRound, getActivePlayer};
}


function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
}


const gameController = GameController();
gameController.playRound(0);
gameController.playRound(2);
gameController.playRound(3);
gameController.playRound(8);
gameController.playRound(6);
