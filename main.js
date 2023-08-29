// JavaScript Code for Frame 1 (Minesweeper board)
// create Minesweeper board element
const board = document.querySelector('.board');
const timerDisplay = document.querySelector('.timer-display');

// define constants for right click toggles
const flagEmoji = '🚩';
const questionMarkEmoji = '❓';
const blankValue = '';

// define constants for difficulty
let easy = 'Easy';
let medium = 'Medium';
let hard = 'Hard';

const bombEmoji = '💣';
let isFirstClick = true;

// Initialize timer elements
let startTime = 0; 
let intervalId = null;

// Access mine display
const mineDisplay = document.querySelector('.mine-display');

// default difficulty and sizes when game first launches
let difficulty = easy; 
let gridRowSize = 8;
let gridColSize = 8;
let totalMines = 10;

// Initialize game over check
let gameOver = false;

function selectDifficulty() {
    const difficultySelector = document.querySelector('.difficulty-selector');
    let previousDifficulty = difficulty;
    // add event listener for drop-down difficulty selection
    difficultySelector.addEventListener('change', () => {

        // Set confirmation dialog with difficulty is changed.
        const confirmation = window.confirm('Are you sure you want to change difficulties? This will reset the game! ');

        if (confirmation) {
            difficulty = difficultySelector.value;
            // grid row and col sizes will change when difficulty changes
            if (difficulty === easy) {
                gridRowSize = 8;
                gridColSize = 8;
                totalMines = 10;
                resetGame();
            } else if (difficulty === medium) {
                gridRowSize = 16;
                gridColSize = 16;
                totalMines = 40;
                resetGame();
            } else if (difficulty === hard) {
                gridRowSize = 16;
                gridColSize = 30;
                totalMines = 99;
                resetGame();
            } else { //custom difficulty
                const customModal = document.getElementById('custom-difficulty-modal');
                customModal.showModal();
                const customConfirm = document.getElementById('custom-confirm');
                customConfirm.addEventListener('click', () => {
                    const customRows = document.getElementById('custom-rows');
                    let customRowValue = customRows.value;
                    const customCols = document.getElementById('custom-cols');
                    let customColValue = customCols.value;
                    const customMines = document.getElementById('custom-mines');
                    let customMineValue = customMines.value;
                    console.log(`custom row value is ${customRowValue}`);
                    gridRowSize = customRowValue;
                    gridColSize = customColValue;
                    totalMines = customMineValue;
                    resetGame();
                })
                const customCancel = document.getElementById('custom-cancel');
                customCancel.addEventListener('click', () => {
                    difficultySelector.value = previousDifficulty;
                })
            }
        } else {
            difficultySelector.value = previousDifficulty;
        }
    });
}

function updateTimer() {
    const currentTime = Date.now(); // Get the current time in milliseconds
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    timerDisplay.textContent = elapsedTime;
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
}

function createButton(row, col) {
  const button = document.createElement('button');
  // define right click values for cycling through
  let rightClickValues = [flagEmoji, questionMarkEmoji, blankValue]
  let rightClickIndex = 0;
//   button.textContent = `${row},${col}`;
  button.classList.add('button');
  button.setAttribute('data-row', row); // Set data attribute for row
  button.setAttribute('data-col', col); // Set data attribute for column
  // create event listener for cell left click.
  button.addEventListener('click', (event) => {
    // exit event listener if button has already been clicked.
    // exit event listener if 🚩 or ❓ has been placed on cell
    if (button.classList.contains('clicked') || button.textContent === flagEmoji || button.textContent === questionMarkEmoji) {
        return
    }
    const clickedRow = parseInt(event.target.getAttribute('data-row'));
    const clickedCol = parseInt(event.target.getAttribute('data-col'));
    if (isFirstClick) {
        // Start timer on first left click
        if (intervalId === null) {
            startTime = Date.now();
            intervalId = setInterval(updateTimer, 1000);
        }
        console.log(`button clickedRow is ${clickedRow}, button clickedCol is ${clickedCol}`)
        spawnMine(clickedRow, clickedCol);
        floodFill((clickedRow), (clickedCol));
        isFirstClick = false;
    } else {
        // exit event listener if gameOver
        if (gameOver) {
            return
        }
        console.log(`button clickedRow is ${clickedRow}, button clickedCol is ${clickedCol}`)
        // trigger game over if user clicks on a cell with a mine
        if (button.classList.contains('bomb')) {
            const bombCellList = document.querySelectorAll('.bomb');
            bombCellList.forEach(bombCell => {
                bombCell.textContent = `${bombEmoji} ${bombEmoji}`;
            });
            gameOver = true;
            // stop timer from incrementing
            clearInterval(intervalId);
            // Lose Modal Popup
            const loseModal = document.getElementById('lose-modal');
            loseModal.showModal();
            const losePlayAgain = document.getElementById('lose-play-again');
            losePlayAgain.addEventListener('click', () => {
                console.log("Resetting Game")
                resetGame();
            });
        } else {
            floodFill(parseInt(clickedRow), parseInt(clickedCol));
            checkWin();
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
    if (totalMines - mineDisplayUpdate() > 0) {
        // number of flags < total number of mines
        rightClickValues = [flagEmoji, questionMarkEmoji, blankValue];
        button.textContent = rightClickValues[rightClickIndex];
        rightClickIndex = (rightClickIndex + 1) % rightClickValues.length;
    } else if (totalMines - mineDisplayUpdate() <= 0 && button.textContent === flagEmoji) {
        // number of flags = total number of mines and cell is flagged
        rightClickValues = [flagEmoji, questionMarkEmoji, blankValue];
        button.textContent = rightClickValues[rightClickIndex];
        rightClickIndex = (rightClickIndex + 1) % rightClickValues.length;
    } else {
        // number of flags = total number of mines and cell is question mark or blank
        rightClickValues = [questionMarkEmoji, blankValue];
        button.textContent = rightClickValues[rightClickIndex];
        rightClickIndex = (rightClickIndex + 1) % rightClickValues.length;
    }

    // Update mine display based on number of flags
    console.log(mineDisplayUpdate());
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
    while (mineArray.length < totalMines) {
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
            button.textContent = bombEmoji; // Update button text content to indicate a mine
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
                if (button && button.textContent === bombEmoji) {
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
                    if (!button.classList.contains('clicked') && !button.classList.contains('bomb') && button.textContent !== flagEmoji && button.textContent !== questionMarkEmoji ) {
                        button.classList.add('clicked');
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
    const highScoreButton = document.querySelector('.high-score');
    highScoreButton.addEventListener('click', () => {
        alert('High Score Button was clicked!');
    })
}

// add functionality for reset button
function pressReset() {
    const resetButton = document.querySelector('.reset');    
    resetButton.addEventListener('click', () => {
        const confirmation = window.confirm('Are you sure you want to reset the game? All current progress will be lost!');
        if (confirmation) {
            resetGame();
        }
    });
}

// count number of remaining mines based on flags placed.
function mineDisplayUpdate() {
    const buttons = document.querySelectorAll('button');
    let currentMineCount = parseInt(mineDisplay.textContent);
    console.log(`current mine count is ${currentMineCount}`);
    let flagCount = 0;

    buttons.forEach(button => {
        const buttonText = button.textContent;
        
        if (buttonText === flagEmoji) {
            flagCount += 1;
        }
    });

    console.log(`Flag count is ${flagCount}`)

    currentMineCount = totalMines - flagCount;
    console.log(`new mine count is ${currentMineCount}`);
    mineDisplay.textContent = currentMineCount;
    return flagCount;
}

function resetGame() {
    console.log('Game reset triggered')
    isFirstClick = true;
    gameOver = false;

    // reset timer
    clearInterval(intervalId);
    intervalId = null;
    timerDisplay.textContent = 0;

    // reset mines left
    mineDisplay.textContent = totalMines;

    // clear board
    while(board.firstChild) {
        board.removeChild(board.lastChild);
    }

    console.log(`current difficulty is ${difficulty}`)
    console.log(`row size is ${gridRowSize}, col size is ${gridColSize}`)
    // recreate board based on selected difficulty
    setBoardSize(gridRowSize, gridColSize);
}

function checkWin() {
    const buttons = document.querySelectorAll('button');
    const totalCells = gridColSize * gridRowSize;
    let cellCounter = 0;
    buttons.forEach(button => {
        const hasClickedClass = button.classList.contains('clicked');
        const hasBombClass = button.classList.contains('bomb');

        if(hasClickedClass || hasBombClass) {
            cellCounter += 1;
        }
    });
    if (totalCells === cellCounter) {
        gameOver = true;
        console.log('Player wins!');
        // stop timer from incrementing
        clearInterval(intervalId);
        const winModal = document.getElementById('win-modal');
        const winModalMessage = document.getElementById('win-modal-message');
        winModalMessage.textContent = `You cleared ${difficulty} difficulty in ${formatTime(timerDisplay.textContent)}! You can enter your name in the field below and press submit to save your time in the high scores, or press close if you don't wish to do so.`;
        winModal.showModal();
        const playerNameInput = document.getElementById('player-name');
        const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () => {
            const playerName = playerNameInput.value;
            console.log(`Player name is: ${playerName}`);
            const responseModal = document.getElementById('responseModal');
            responseModal.showModal();
            const viewHighScores = document.getElementById('view-highscores');
            viewHighScores.addEventListener('click', () => {
                console.log("View High Scores Placeholder");
            });
            const winPlayAgain = document.getElementById('win-play-again');
            winPlayAgain.addEventListener('click', () => {
                console.log("Resetting Game")
                resetGame();
            })
            
        })
    }
}

function main() {
    selectDifficulty();
    setBoardSize(gridRowSize, gridColSize);
    checkHighScores();
    pressReset();
}

main();

//? TODO List

// 1. Create custom difficulty and modal popup that prompts user for grid and cols and number of mines. Number of mines cannot exceed (grid * col) - 10

// Javascript Code for Frame 2 (High Scores Page)
// 1. Create 3 arrays (Easy Medium and Hard difficulties) that contains objects with properties of rank, name and time taken.
// 2. Each array will have a maximum of 10 objects.
// 3. After player completes a game, create new object with the above key-value pairs.
// 4. Sort array based on time taken to complete game (ascending order).
// 5. If most recent game timing managed to make top 10, highlight it.
// 6. If not, show the timing at the bottom of the top 10, but this value gets deleted once user goes back to Frame 1.
// 7. Create button functionality for Go Back button
// 8. Create button functionality for Reset High Scores Button

