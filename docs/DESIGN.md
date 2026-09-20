# Design

## Reading of the Brief

The brief describes a two-player, 3×3 Tic-Tac-Toe game with X and O taking alternating turns. It also requires:

* No draw
* No terminal state where neither player has won
* The game must always terminate
* The game should remain recognisably Tic-Tac-Toe

The main ambiguity is the **no-draw requirement**. Standard Tic-Tac-Toe allows a full board with no winner, which conflicts with the requirement that every terminal game has a winner.

### Resolution

I kept the standard Tic-Tac-Toe winning condition: **three matching symbols in a row wins immediately**.

To remove the possibility of a draw, I added one rule:

> If no player has won before the board is full, the player who makes the 9th move wins.

This preserves the familiar Tic-Tac-Toe gameplay while satisfying the no-draw requirement.

---

## Rule Sets Considered

### 1. Standard Tic-Tac-Toe

**Rejected.**

The standard rules allow a draw when all 9 spaces are occupied without a winning line. This conflicts with the requirement that the game cannot end without a winner.

### 2. Last Move Always Wins

**Rejected.**

Under this rule, a player would only win by making the final move, making the normal three-in-a-row objective irrelevant. This makes the game less recognisably Tic-Tac-Toe.

### 3. Three-in-a-Row + 9th Move Wins

**Selected.**

This keeps the standard winning condition while providing a deterministic outcome when no winning line exists.

* Three in a row → immediate win
* No winner after 8 moves → 9th player wins

---

## Why a Draw Is Impossible

There are exactly **9 spaces**, and every valid move fills one previously empty space.

Therefore, at most 9 valid moves can be made.

There are only two possible ways for the game to finish:

1. A player creates a three-in-a-row before the board is full.
2. Nobody creates a three-in-a-row, so the 9th move is made and its player wins.

The second rule specifically removes the only draw condition from standard Tic-Tac-Toe: a full board with no winner.

Therefore, **a draw is impossible**.

---

## Why Play Always Terminates

Each valid move increases `moveCount` by exactly 1.

Since the board contains only 9 spaces:

```text
moveCount ≤ 9
```

A game must therefore reach a terminal state within at most 9 valid moves.

* If a winning line appears earlier, the game ends immediately.
* Otherwise, the 9th move ends the game.

Invalid moves do not increase `moveCount`, because occupied cells cannot be played.

Therefore, there is no possible infinite sequence of valid moves, and **every game terminates after at most 9 valid moves**.

---

## Class Design

The implementation separates **game logic** from **UI logic**.

### `TicTacToeGame`

Responsible for the game state and rules. It does not directly interact with the DOM.

| Type     | Name                     | Description                                                    |
| -------- | ------------------------ | -------------------------------------------------------------- |
| Variable | `BOARD_SIZE`             | Number of spaces on the board (`9`).                           |
| Variable | `PLAYERS`                | The two available players: X and O.                            |
| Variable | `WINNING_COMBINATIONS`   | All possible horizontal, vertical, and diagonal winning lines. |
| Variable | `board`                  | Stores the current value of each board space.                  |
| Variable | `currentPlayerIndex`     | Tracks which player is currently playing.                      |
| Variable | `moveCount`              | Number of valid moves made.                                    |
| Variable | `gameOver`               | Indicates whether the game has ended.                          |
| Function | `constructor()`          | Initializes a new game.                                        |
| Function | `reset()`                | Resets the board and all game state.                           |
| Function | `getCurrentPlayer()`     | Returns the player whose turn it is.                           |
| Function | `makeMove(index)`        | Validates and performs a move, then checks for a game result.  |
| Function | `getGameResult(player)`  | Determines whether the current move ends the game.             |
| Function | `hasWinningLine(player)` | Checks whether the player has created a winning line.          |

### `TicTacToeUI`

Responsible for user interaction and updating the browser UI. It delegates game rules to `TicTacToeGame`.

| Type     | Name                       | Description                                               |
| -------- | -------------------------- | --------------------------------------------------------- |
| Variable | `game`                     | Reference to the `TicTacToeGame` instance.                |
| Variable | `cells`                    | References to the 9 board buttons in the HTML.            |
| Variable | `turnIndicator`            | Displays the current player's turn or the winner.         |
| Variable | `resetButton`              | Reference to the reset button.                            |
| Function | `constructor(game)`        | Connects the game logic to the UI and initializes the UI. |
| Function | `setupEventListeners()`    | Registers click handlers for the board and reset button.  |
| Function | `handleCellClick(index)`   | Sends the selected cell to the game and updates the UI.   |
| Function | `updateBoard()`            | Synchronizes the HTML board with the game state.          |
| Function | `updateTurnIndicator()`    | Displays the current player's turn.                       |
| Function | `handleGameResult(winner)` | Displays the winning player.                              |
| Function | `resetGame()`              | Resets the game state and refreshes the UI.               |

---

## Separation of Responsibilities

```text
User Input
    ↓
TicTacToeUI
    ↓
TicTacToeGame
    ↓
Game State / Rules
    ↓
TicTacToeUI
    ↓
Updated Display
```

`TicTacToeGame` is responsible for **what is allowed to happen**.

`TicTacToeUI` is responsible for **what the player sees and interacts with**.

This separation keeps the game rules independent from the browser UI and makes the logic easier to understand, test, and modify.
