# Tic-Tac-Toe Web Game

A simple two-player Tic-Tac-Toe game built with **HTML, CSS, and JavaScript**.

The game uses standard three-in-a-row rules with one variation: if neither player wins after 8 moves, the player making the 9th move wins. This ensures the game can never end in a draw.

## Setup

### Requirements

* A modern web browser
* Python 3 (for the local development server)

### Run Locally

There are two ways to start the local server.

#### Option 1: From the `game` Directory

```bash
cd game
python -m http.server
```

Then open:

```text
http://localhost:8000
```

#### Option 2: From the Repository Root

From the `TicTacToe-WebGame` directory:

```bash
python -m http.server
```

Then open:

```text
http://localhost:8000/game/
```

To stop the server, press `Ctrl + C`.

## Documentation

* [Game Rules](docs/RULES.md)
* [Design & Implementation](docs/DESIGN.md)
