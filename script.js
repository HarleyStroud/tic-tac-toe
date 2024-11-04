

function Gameboard () {
    const board = [null, null, null, null, null, null, null, null, null];

    const getBoard = () => board;


    const placeToken = (position, player) => {

    }


    const printBoard = () => {
        for(let i = 0; i < 9; i++) {
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

        // TODO: check winner.

        switchPlayerTurn();
        printNewRound();
    }


    return {playRound, getActivePlayer};
}


const gameController = GameController();