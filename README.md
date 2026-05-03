# Tic-Tac-Toe

A visually appealing and interactive Tic-Tac-Toe game built with HTML, CSS, and Vanilla JavaScript.

## Features
- **Interactive UI**: Beautiful fixed background with sleek grid design.
- **Dynamic Gameplay**: Alternating turns between 'X' and 'O' with smooth `pop-in` animations.
- **Win Detection**: Automatically detects row, column, and diagonal wins.
- **Draw Detection**: Declares a draw when the board is full without a winner.
- **Reset Functionality**: Easily restart the game with a single click.

## How It's Made
This project is built using standard front-end web technologies:

1. **HTML5**: Used for structuring the game board and layout. The board is defined by a central `div` container holding 9 individual cell elements.
2. **CSS3**: Handles the visual presentation and aesthetics. Key implementations include:
   - **CSS Grid**: Used to create the perfect 3x3 layout for the board (`grid-template-columns: repeat(3, 100px)`).
   - **Keyframe Animations**: A custom `@keyframes popInAnimation` provides a smooth bouncy entry effect when a player places their mark.
   - **Responsive Design**: Centralized content and modern styling for a premium feel.
3. **Vanilla JavaScript**: Drives the core game mechanics, including:
   - **Event Handling**: Listens for clicks on individual cells and the reset button.
   - **State Management**: Tracks the number of turns to alternate between 'X' (odd clicks) and 'O' (even clicks).
   - **Win Validation**: Checks the current board state against a pre-defined array of 8 winning patterns (rows, columns, and diagonals) after every move.
   - **DOM Manipulation**: Dynamically injects SVG images into the clicked cells and displays win/draw messages.

## How to Play
1. Open the `index.html` file in any modern web browser.
2. The game always starts with Player 1 (**X**). Click on any empty white square to place your symbol.
3. Player 2 (**O**) then takes their turn by clicking another empty square.
4. The first player to align 3 of their symbols horizontally, vertically, or diagonally wins the game!
5. If all 9 squares are filled and no one has achieved a 3-in-a-row, the game ends in a draw.
6. Click the green **Reset** button at any time to clear the board and start a new match.

## Screenshots

### Initial Game State
![Initial State](Images/intial.png)

### Player Win State
![Win State](Images/win.png)

### Draw State
![Draw State](Images/draw.png)
