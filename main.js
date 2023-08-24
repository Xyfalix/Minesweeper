// Pseudocode here

// Html and CSS code for Frame 1 (Minesweeper board)
// 1. Create the 8 x 8 board (Placeholder to be overwritten with Js)
// 2. Create the Mines Left and Timer interface
// 3. Create the name text, entries and change name buttons
// 4. Create the difficulty level text and difficulty level selector
// 5. Create the View High Scores Text

// JavaScript Code for Frame 1 (Minesweeper board)
// 1. Create click functionality for each cell in the 8 x 8 board
// 2. Spawn mines (10 in easy mode) randomly in the remaining cells after user left clicks the first cell. First cell will not contain a mine.
// 3. Create timer to start counting in seconds once user clicks on the first cell.
// 4a. If cell left clicked on does not have any mines in its adjacent cells (8 in total), open all of its adjacent cells.
// 4b. Repeat step 4a for any adjacent cell that does not have mines in its adjacent cells. 
// 4c. Steps 4a and 4b is the flood functionality in Minesweeper.
// 5. Create right click funcionality for each cell.
// 5a. The first right click will flag the cell as a mine.
// 5b. Right clicking the same cell will change cell marking to a ?.
// 5c. Right clicking the same cell again will reset the cell marking.
// 6. Create board for medium difficulty (16 x 16 with 40 mines) and hard difficulty (30 x 16 with 99 mines)
// 7. Create functionality for the Change Name button

// 8. Create dropdown functionality for difficulty level selection. 
// Once difficulty level different from current difficulty is selected, prompt user that switching difficulty will reset the game.
// If user accepts, reset game and switch difficulties.
// If user declines, return to game.

// 9. Create button functionality for View High Scores. To use console log as a placeholder.
// Link to actual high score page once it is ready.

// Javascript Code for Frame 2 (High Scores Page)
// 1. Create 3 arrays (Easy Medium and Hard difficulties) that contains objects with properties of rank, name and time taken.
// 2. Each array will have a maximum of 10 objects.
// 3. After player completes a game, create new object with the above key-value pairs.
// 4. Sort array based on time taken to complete game (ascending order).
// 5. If most recent game timing managed to make top 10, highlight it.
// 6. If not, show the timing at the bottom of the top 10, but this value gets deleted once user goes back to Frame 1.
// 7. Create button functionality for Go Back button
// 8. Create button functionality for Reset High Scores Button

// HTML Code for Frame 3 (MineSweeper Start Page)
// 1. Create Minesweeper text
// 2. Create instructions text
// 3. Create entry to enter name
// 4. Create Play! button functionality. Set restriction that name entry has at least 3 characters before player can access Frame 1.
// If not, show a prompt telling player that at least 3 characters is required for name.

// Misc JavaScript Code
// Hide elements from inactive frames.

