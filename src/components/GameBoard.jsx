let initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, board }) {
    // we can also maintain seperate state for gameboard in 2d array like below but it couldnot be used
    // for log component bcz it not store turns in order so another state of turns need to be maintained
    // to avoid that we only maintain that state of turns [{squareInfo, symbol}, {}, ...] and derive gameBoard
    // from that single state of turns

    // const [gameBoard, setgameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {

    //     setgameBoard((prevGameBoard) => {

    //         const updatedBoard = [
    //             ...prevGameBoard.map((initialArray) => {
    //                 return [...initialArray];
    //             }),
    //         ];

    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        <button
                                            disabled={playerSymbol !== null}
                                            onClick={() =>
                                                onSelectSquare(
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                        >
                                            {playerSymbol}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
