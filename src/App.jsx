import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSelectedSquare =
      gameBoard[combination[0].row][combination[0].column];
    const secondSelectedSquare =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSelectedSquare =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSelectedSquare &&
      firstSelectedSquare === secondSelectedSquare &&
      firstSelectedSquare === thirdSelectedSquare
    ) {
      winner = players[firstSelectedSquare];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedColumn(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      const updatedBoard = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return updatedBoard;
    });
  }

  function handlePlayersName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayersName}
          />
          <Player
            playerName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayersName}
          />
        </ol>
        <GameBoard board={gameBoard} onChangePlayer={handleSelectedColumn} />

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={setGameTurns} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
