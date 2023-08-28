// JavaScript Code for Frame 1 (Minesweeper board)
// create Minesweeper board element
const board = document.querySelector('.board');
const timerDisplay = document.querySelector('.timer-display');
const rightClickValues = ['🚩', '?', '']
const highScoreButton = document.querySelector('.high-score');
let isFirstClick = true;
let flagCount = 0;


// Initialize timer elements
let startTime = 0; 
let intervalId = null;

// For right click cycling
let rightClickValuesIndex = 0;

// Access mine display
const mineDisplay = document.querySelector('.mine-display');
let originalMineCount = parseInt(mineDisplay.textContent);

// grid row and col sizes will change when difficulty changes
let gridRowSize = 12; 
let gridColSize = 12;

// Initialize game over check
let gameOver = false;


function updateTimer() {
    const currentTime = Date.now(); // Get the current time in milliseconds
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    timerDisplay.textContent = elapsedTime;
}

function createButton(row, col) {
  const button = document.createElement('button');
  button.textContent = `${row},${col}`;
  button.classList.add('button');
  button.setAttribute('data-row', row); // Set data attribute for row
  button.setAttribute('data-col', col); // Set data attribute for column
  // create event listener for cell left click.
  button.addEventListener('click', (event) => {
    // exit event listener if button has already been clicked.
    // exit event listener if 🚩 or ? has been placed on cell
    if (button.classList.contains('clicked') || button.textContent === '🚩' || button.textContent === '?') {
        return
    }
    const clickedRow = event.target.getAttribute('data-row');
    const clickedCol = event.target.getAttribute('data-col');
    if (isFirstClick) {
        // Start timer on first left click
        if (intervalId === null) {
            startTime = Date.now();
            intervalId = setInterval(updateTimer, 1000);
        }
        alert(`Button clicked: Row ${row}, Column ${col}`);
        console.log(`button clickedRow is ${clickedRow}, button clickedCol is ${clickedCol}`)
        spawnMine(clickedRow, clickedCol);
        floodFill(parseInt(clickedRow), parseInt(clickedCol));
        isFirstClick = false;
    } else {
        // exit event listener if gameOver
        if (gameOver) {
            return
        }
        console.log(`button clickedRow is ${clickedRow}, button clickedCol is ${clickedCol}`)
        // trigger game over if user clicks on a cell with a mine
        if (button.classList.contains('bomb')) {
            alert('You clicked on a mine, Game Over :(')
            const bombCellList = document.querySelectorAll('.bomb');
            bombCellList.forEach(bombCell => {
                bombCell.textContent = '💣💣';
            });
            gameOver = true;

        } else {
            floodFill(parseInt(clickedRow), parseInt(clickedCol));
        }
    }
  });

  // Event listener for right click
  button.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // prevent the right click menu from appearing
    // exit event listener if button has already been left clicked
    // also exits event listener if user has not made the first left click
    if (button.classList.contains('clicked') || isFirstClick || gameOver) {
        return
    }
    // cycles clicked cell between  🚩, ?, and empty
    button.textContent = rightClickValues[rightClickValuesIndex]
    rightClickValuesIndex = (rightClickValuesIndex + 1) % rightClickValues.length;

    // Update mine display based on number of flags
    flagCount = 0;
    mineDisplayUpdate();

  });

  return button;
}

function setBoardSize(rows, cols) {
    // set row gridsize in CSS
    document.documentElement.style.setProperty('--board-row-size', gridRowSize);
    // set col gridsize in CSS
    document.documentElement.style.setProperty('--board-col-size', gridColSize);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const button = createButton(i, j);
            board.appendChild(button);
        }
    }
}

// used by the spawnMines function to generate mines randomly
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // Output will be a random integer between min and max (exclusive)
}

// spawn mines randomly on the board, number depends on difficulty.
function spawnMine(clickedRow, clickedCol) {
    // create array that will represent the row & col coordinates to spawn mines.
    const mineArray = [];
    while (mineArray.length < 10) {
        mineCoordinates = [getRandomInt(0, gridRowSize), getRandomInt(0, gridColSize)]
        console.log(`mine coordinates are ${mineCoordinates}`);

        // Check that mineCoordinates are not at clicked cell
        if (mineCoordinates[0] !== clickedRow && mineCoordinates[1] !== clickedCol) {
            // Add mineCoordinates into mineArray only if coordinates do not exist in array.
            if (!mineArray.some(coord => coord[0] === mineCoordinates[0] && coord[1] === mineCoordinates[1])) { 
                mineArray.push(mineCoordinates);
            }
        }    
    }

    // Update the buttons corresponding to mine coordinates
    for (const [row, col] of mineArray) {
        const button = board.querySelector(`button[data-row="${row}"][data-col="${col}"]`);
        if (button) {
            button.textContent = '💣'; // Update button text content to indicate a mine
            button.classList.add('bomb'); // add the bomb class to cells with mines.
        }
    }

    for (i = 0; i < mineArray.length; i++) {
        console.log(mineArray[i])
    }
}

// count the number of adjacent mines on the clicked cell. Arguments for clicked row and col must be specified.
function mineAdjacentCheck(clickedRow, clickedCol) {
    let mineCounter = 0;
    console.log(`clickedRow is ${clickedRow}, clickedCol is ${clickedCol}`);
    for (let i = clickedRow - 1; i <= clickedRow + 1; i++) {
        for (let j = clickedCol - 1; j <= clickedCol + 1; j++) {
            if (!(i === clickedRow && j === clickedCol)) {
                console.log(`mineAdjCheck row is ${i}, mineAdjCheck col is ${j}.`)
                const button = board.querySelector(`button[data-row="${i}"][data-col="${j}"]`);
                if (button && button.textContent === '💣') {
                    mineCounter += 1; 
                }
            }
        }
    }

    return mineCounter;
}   

// recursive function that will open all adjacent squares if clicked square has no mines.
function floodFill(clickedRow, clickedCol) {
    // Base Case: if any adjacent square has a mine, show the number of adjacent mines on clicked square.
    const adjMineCount = mineAdjacentCheck(clickedRow, clickedCol);
    console.log(`floodFill triggered on row ${clickedRow}, col ${clickedCol}. Adjacent mine count is ${adjMineCount}.`)
    if (adjMineCount > 0) {
        console.log('Base case triggered.');
        const clickedButton = board.querySelector(`button[data-row="${clickedRow}"][data-col="${clickedCol}"]`);
        clickedButton.classList.add('clicked');
        // remove box shadow so button looks pressed down
        clickedButton.style.boxShadow = '0px 0px grey';
        clickedButton.textContent = adjMineCount.toString();
        return;

    } else {
         // Recursive Case: Uncover all adjacent cells if clicked cell has no adjacent mines
         console.log('Recursive Case Triggered');
        for (let i = clickedRow - 1; i <= clickedRow + 1; i++) {
            for (let j = clickedCol - 1; j <= clickedCol + 1; j++) {
                const button = board.querySelector(`button[data-row="${i}"][data-col="${j}"]`);
                // check that button exists
                if (button) {  
                    console.log(`floodFill button row is ${i} and floodFill col is ${j}`);
                    // check that button is unclicked and is not a mine.
                    if (!button.classList.contains('clicked') && button.textContent !== '💣' ) {
                        button.classList.add('clicked');
                        // remove box shadow so button looks pressed down
                        button.style.boxShadow = '0px 0px grey';
                        button.textContent = adjMineCount.toString();
                        floodFill(i, j);
                    }
                }    
            }
        }
    }
}   

// add functionality for high score button
function checkHighScores() {
    highScoreButton.addEventListener('click', () => {
        alert('High Score Button was clicked!');
    })
}


// count number of remaining mines based on flags placed.
function mineDisplayUpdate() {
    const buttons = document.querySelectorAll('.button');
    let currentMineCount = parseInt(mineDisplay.textContent);
    console.log(`current mine count is ${currentMineCount}`);

    buttons.forEach(button => {
        const buttonText = button.textContent;
        
        if (buttonText === '🚩') {
            flagCount += 1;
        }
    });

    console.log(`Flag count is ${flagCount}`)

    currentMineCount = originalMineCount - flagCount;
    console.log(`new mine count is ${currentMineCount}`);
    mineDisplay.textContent = currentMineCount;
}

setBoardSize(gridRowSize, gridColSize);
checkHighScores();

//? TODO List

// 8. Create dropdown functionality for difficulty level selection. 
// Once difficulty level different from current difficulty is selected, prompt user that switching difficulty will reset the game.
// If user accepts, reset game and switch difficulties.
// If user declines, return to game.


// 10. Add Game winning criteria. When entire board has either been flagged or left clicked on, player wins

// 11. When player clicks on a mine, trigger game over alert.


// Javascript Code for Frame 2 (High Scores Page)
// 1. Create 3 arrays (Easy Medium and Hard difficulties) that contains objects with properties of rank, name and time taken.
// 2. Each array will have a maximum of 10 objects.
// 3. After player completes a game, create new object with the above key-value pairs.
// 4. Sort array based on time taken to complete game (ascending order).
// 5. If most recent game timing managed to make top 10, highlight it.
// 6. If not, show the timing at the bottom of the top 10, but this value gets deleted once user goes back to Frame 1.
// 7. Create button functionality for Go Back button
// 8. Create button functionality for Reset High Scores Button


// Misc JavaScript Code
// Hide elements from inactive frames.

