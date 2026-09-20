# Tic-Tac-Toe Rules

## Objective

To win the game, you must satisfy one of these rules:

1. Creates a line of three matching symbols (horizontal/vertical/diagonal), or
2. Makes the 9th and final move if nobody has created a line of three.

## Setup

* The game uses a **3x3 board** with 9 spaces.
* There are two players:

  * **Player 1:** X
  * **Player 2:** O
* Player 1 (X) goes first.

## How to Play

1. Players take turns placing their symbol in an empty space.
2. A space can only be used once.
3. After each move, check whether the player has created a line of three:

   * Horizontal
   * Vertical
   * Diagonal
4. If a player creates a line of three, they **win immediately**.
5. If no player has won before the board is full, the player who makes the 9th move wins.
6. Once there is a winner, the game ends and no further moves can be made.

## Example

A player wins immediately with:

```text
X | X | X
--+---+--
O | O |  
--+---+--
  |   |  
```

If the board is filled without either player creating a line of three, the player making the final (9th) move wins.

There are **no draws**.
