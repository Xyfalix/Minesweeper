# SEI-46 Project 1 - Minesweeper

## Project Brief
**MVP - Minimum Viable Product** 
- Built with HTML, CSS and JavaScript
- Use Javascript for DOM manipulation
- Hosted on Github pages
- Commits to Github frequently
- A README.md file with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.
- Be displayed in the browser
- Have some kind of user interaction via mouseclick or keypress

## Timeframe
5 - 6 days

## Technologies & Tools Used
- HTML
- CSS
- JavaScript
- Git & GitHub

<br>

## Description
This is a recreation of the Minesweeper game prevalent in Microsoft Windows machines since their inception in 1990.

<br>

## Deployment
You can access the game from the link below.

https://xyfalix.github.io/Minesweeper/

<br>

## How To Play
(Information adapted from Wikipedia)
A game of Minesweeper begins when the player first selects a cell on a board by left clicking it. For my version of the game, the first click is guaranteed to be safe. When clicking a cell, there are a few possible outcomes.

**Outcome 1**

The clicked tile has no mine, and its adjacent squares (8 in total including the diagonals) all have no mines. This will trigger the floodfill function, where the adjacent tiles with no mines will likewise have its adjacent tiles checked for mines and this continues until the base case is reached (clicked tile has at least 1 adjacent mine)

![Screenshot 2023-08-30 at 11 07 16 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/dc32b2c7-6c8d-467c-bd92-83c59935b25c)

<br>

**Outcome 2**

The clicked tile has no mine, and for this example, 1 of its adjacent squares has a mine. (highlighted by the red square). The indicator can range from 1 to 8.

![Screenshot 2023-08-30 at 11 11 30 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/098be29a-2229-499d-a6b1-9128e2bed7e8)

<br>

**Outcome 3**

The clicked tile has a mine. The player loses when a mine has been clicked on. All tiles with mines will be revealed once a mine has been clicked on.

![Screenshot 2023-08-30 at 11 27 16 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/cf76c30c-023d-4b17-ad0a-dc6f6223526b)![Screenshot 2023-08-30 at 11 28 28 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/ae127dc4-80bd-45c9-b448-54a749803d61)

To win a game of Minesweeper, all non-mine cells must be opened without opening a mine. There is no score, however there is a timer recording the time taken to finish the game. For my version of the game, there are 4 difficulties, which are described below.

**Easy**

Number of rows: 8
<br>
Number of cols: 8
<br>
Total mines : 10

**Medium**

Number of rows: 16
<br>
Number of cols: 16
<br>
Total mines : 40

**Hard**

Number of rows: 30
<br>
Number of cols: 16
<br>
Total mines : 99

**Custom**

Number of rows: user specified (min 4)
<br>
Number of cols: user specified (min 4)
<br>
Total mines : (number of rows * number of cols) - 10

**Cell Flagging**

Players can also flag cells that they suspect are mines by right clicking the cell. The maximum number of cells that can be flagged is equal to the total number of mines.

Repeatedly right clicking on the same cell will toggle the cell between flagged, question mark or blank. When the cell has been flagged or indicated with a question mark, the player will not be able to left click on that cell.

![Screenshot 2023-08-30 at 11 47 50 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/3c6f2710-b3cb-46ec-a76d-61e9a57ad9ad)

## Breakdown & Analysis of the Codes
This minesweeper project mainly uses conditionals within its functions. The exception would be the floodfill function, which uses a recursive loop to open adjacent squares with no mines.

## Future Developments / Improvements
Future developments/improvements I would implement include:

- Add styling to the game to make it more visually appealing
- Add a high scores page that shows the top 10 completion timings for each difficulty.

## References
I used the following online Minesweeper game as visual reference to recreate the game.

- https://cardgames.io/minesweeper/
