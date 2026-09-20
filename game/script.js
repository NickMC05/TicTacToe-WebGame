class TicTacToeGame {
    static BOARD_SIZE = 9;
    static PLAYERS = ["X", "O"];
    static WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Vertical
        [0, 4, 8], [2, 4, 6]                // Diagonal
    ];

    constructor() {
        this.reset();
    }

    reset() {
        this.board = Array(TicTacToeGame.BOARD_SIZE).fill("");
        this.currentPlayerIndex = 0;
        this.moveCount = 0;
        this.gameOver = false;
    }

    getCurrentPlayer() {
        return TicTacToeGame.PLAYERS[this.currentPlayerIndex];
    }

    makeMove(index) {
        if (this.gameOver || this.board[index] !== "") {
            return null;
        }

        const player = this.getCurrentPlayer();

        this.board[index] = player;
        this.moveCount++;

        const result = this.getGameResult(player);

        if (result !== null) {
            this.gameOver = true;
            return result;
        }

        // Switch player
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) %
            TicTacToeGame.PLAYERS.length;

        return null;
    }

    getGameResult(player) {
        if (this.hasWinningLine(player)) {
            return player;
        }

        /*
         * Anti-draw rule:
         * If the board is full without a normal winning line,
         * the player who made the final move wins.
         */
        if (this.moveCount === TicTacToeGame.BOARD_SIZE) {
            return player;
        }

        return null;
    }

    hasWinningLine(player) {
        return TicTacToeGame.WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => this.board[index] === player);
        });
    }

    isDraw() {
        /*
         * A draw should never occur under the variant rules.
         * This method exists as a defensive check.
         */
        return (
            this.moveCount === TicTacToeGame.BOARD_SIZE &&
            !this.hasWinningLine("X") &&
            !this.hasWinningLine("O")
        );
    }
}

class TicTacToeUI {
    constructor(game) {
        this.game = game;

        this.cells = document.querySelectorAll(".cell");
        this.turnIndicator = document.querySelector("#turn-indicator");
        this.resetButton = document.querySelector("#reset-button");

        this.setupEventListeners();
        this.updateTurnIndicator();
    }

    setupEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const index = Number(cell.dataset.index);

                this.handleCellClick(index);
            });
        });

        this.resetButton.addEventListener("click", () => {
            this.resetGame();
        });
    }

    handleCellClick(index) {
        const result = this.game.makeMove(index);

        this.updateBoard();

        if (result !== null) {
            this.handleGameResult(result);
            return;
        }

        this.updateTurnIndicator();
    }

    updateBoard() {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.game.board[index];

            cell.disabled =
                this.game.board[index] !== "" ||
                this.game.gameOver;
        });
    }

    updateTurnIndicator() {
        const player = this.game.getCurrentPlayer();

        const playerNumber =
            player === "X" ? 1 : 2;

        this.turnIndicator.textContent =
            `Player ${playerNumber} (${player})'s turn`;
    }

    handleGameResult(winner) {
        if (this.game.isDraw()) {
            alert("Draw!");
            return;
        }

        const playerNumber =
            winner === "X" ? 1 : 2;

        alert(`Player ${playerNumber} (${winner}) wins!`);

        this.turnIndicator.textContent =
            `Player ${playerNumber} (${winner}) wins!`;
    }

    resetGame() {
        this.game.reset();

        this.updateBoard();
        this.updateTurnIndicator();
    }
}


const game = new TicTacToeGame();
const ui = new TicTacToeUI(game);