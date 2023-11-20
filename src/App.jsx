import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";
import { useState } from "react";

let initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    // derive current playe from last move in gameTurns
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X")
        currentPlayer = "O";

    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    // creating deep copy of initialGameBoard to get new array after reseting the game
    let gameBoard = [...initialGameBoard.map((array) => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    // checking winning combinations for same symbol to find winner
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const SecondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const ThirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === SecondSquareSymbol &&
            firstSquareSymbol === ThirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function App() {
    // we can keep track of active player state and toggle btw two players on each click
    // but we use gameTurns state to derive active player as it start from 'X' and on each turn flip using deriveActivePlayer()
    // const [activePlayer, setIsActivePlayer] = useState("X");

    // store info of each turn in form of [{squareInfo, player}, {...}, ...]
    // this gameTurns state can be used to derive both playerSymbol and gameBoard state
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({
        X: "PLAYER1",
        O: "PLAYER2",
    });

    // deriving current gameboard from info in gameTurns array here bcz its needed to derive winner on each turn
    const gameBoard = deriveGameBoard(gameTurns);

    // checking winning combinations for same symbol to find winner on each turn since gameTurns state update
    // on each turn so on each turn winner is checked
    const winner = deriveWinner(gameBoard, players);

    // if no winner(undefined) but all moves played
    const hasDraw = !winner && gameTurns.length === 9;

    const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex) {
        // store info of each turn in form of [{squareInfo, player}, {...}, ...]
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            return [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];
        });
    }

    function handleRestart() {
        // reset the gameTurns state as its the only state from which all other things are derived
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, name) {
        // recieve player name and corresponding symbol from Player component and set players state
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: name,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={players.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    ></Player>

                    <Player
                        initialName={players.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    ></Player>
                </ol>

                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={handleRestart} />
                )}

                <GameBoard
                    board={gameBoard}
                    onSelectSquare={handleSelectSquare}
                />
            </div>

            <Log turns={gameTurns} players={players}></Log>
        </main>
    );
}

export default App;
