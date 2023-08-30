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
![Screenshot 2023-08-30 at 10 51 42 PM](https://github.com/Xyfalix/Minesweeper/assets/129175727/1fff875c-179e-4737-96a0-dcff1b15a7db)


To win a game of Minesweeper, all non-mine cells must be opened without opening a mine.[1] There is no score, however there is a timer recording the time taken to finish the game. Difficulty can be increased by adding mines or starting with a larger grid.[5] Microsoft Minesweeper offers three default board configurations, usually known as beginner, intermediate and expert, in order of increasing difficulty. Beginner is usually on an 8x8 or 9x9 board containing 10 mines, Intermediate is usually on a 16x16 board with 40 mines and expert is usually on a 30x16 board with 99 mines, however this is usually customisable.[2]

<br>

## Approach to Development
Using the plan and pseudocodes, I broke down the project into stages:
- [x] **Step 1:** Generate the Tetris Board [Timeline: 1 week]
- [x] **Step 2:** Generate the Tetrominoes [Timeline: 2 weeks]
- [x] **Step 3:** Create the Game Logic [Timeline: 2 weeks]
- [x] **Step 4** (Stretch Goal): Create different levels and point system [Timeline: 2 weeks]
- [ ] **Step 5** (Stretch Goal): Retrieve scores [Timeline: 1 week]

When I was coding out the project, I made it a habit to comment on my codes frequently as I was still learning and I tend to forget certain concepts or code blocks which I have done or used before. This also meant that I also committed to GitHub frequently to log all of the changes to the project so I can retrieve an older version if necessary.

As Tetris is a classic game which existed for quite a while, this meant that there might have been certain standards in terms of how the Tetris was formed, and how the Tetrominoes behaved. 

According to the current Tetris guidelines, the standard for how Tetrominoes behave is known as the [Super Rotation System (SRS)](https://tetris.fandom.com/wiki/SRS)

<br>

## Key Learnings
1. Through the project, I learned concepts and terms like JSON, Classes, Immutability, Destructuring and Proxy. 

2. In order to rotate the Tetromino pieces, I found out that instead of creating different variations of the matrices and looping through them, an easier way would be to use the rotation matrix, which required knowledge of linear algebra. 

3. With a project as complex as Tetris, it helps to separate the JS files for each main component so you can identify the errors and bugs. But at the same time, this meant that sometimes you might not know where a particular code is referencing it from if you don't label your functions and variables in a way which makes sense. Commenting on your codes will also help you identify what a particular section of code does, making it easier to debug.

4. We learned in class to use setInterval or setTimeout. However, for the Tetris game, I created a function called requestAnimationFrame() which paints a frame and reschedules itself. This is so we only see the Tetris block moving down when it is visible and it enables browser optimizations. This taught me that we might learn a concept, but depending on the usage, that concept might not be suitable for what we want.

<br>

## Breakdown & Analysis of the Codes
Below is a breakdown and analysis of some of the codes which I have categorised according to the concepts we have covered in class.

### Week 1: Conditionals, Booleans, Loop
A Boolean is a system of logical thought developed by the English mathematician George Boole. We use a number of operators to determine whether a condition is true or false.

![Conditional-main.js file](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Conditionals.png?raw=true)

The above code uses a While loop which executes the statement as long as the test condition is true. 

The test condition for this code can be read as ""If the user presses the space key then...". 

If this test condition is true, the Tetris block will do a hard drop and go to the bottom of the grid while making sure it is within the dimensions of the Tetris board.

### Week 1: Arrays 
An array is a data structure, and like a number or string, you can assign an array to a variable. An array is a list. All list items go between square brackets.

![Array-constants.js file](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Arrays.png?raw=true)

For the Tetris game, we used a few arrays, two of which is determining the colors and shapes of the Tetris block. 

For the shapes, any number that is more than 0 indicates that the particular section will be colored. The numbers 1-7 represents the different colors it will create for each shape. 

### Week 2: Functions & Scope
Using functions is another application of DRY. Don't Repeat Yourself. With a function, you can store code that can be used conveniently as many times as you wish, without having to rewrite the code each time. We always use const to declare the functions. Functions should only do one thing.

![Functions/Scope-main.js file](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Functions,%20Scope.png?raw=true)

Scope is the restriction of where in your code your variables can be accessed. If you try to access a variable outside of its scope, it will not be defined. In general, you want scope to be restricted. You only want your variables accessible to specific safe zones.


### Week 2: Pseudocode & Objects
Pseudo code is the process of taking a larger solution and breaking it down into the programmable steps without actually writing any code.

![Pseudocode-constants.js file](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Pseudocode(1).png?raw=true)
![Pseudocode(2)-constants.js file](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Pseudocode(2).png?raw=true)

In JavaScript, objects are what we use to represent key-value pairs. Arrays are declared using the square brackets const arr = []; while Objects are declared using the curly braces const obj = {}. Objects contain key-value pairs. They are are the properties of the object.

![Objects-constants.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Objects.png?raw=true)

### Week 3: Callbacks
A function that takes another function an argument is called a higher order function. The function that is being passed in is called a callback.

![Callbacks(1)-main.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Callbacks(1).png?raw=true)
![Callbacks(2)-main.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Callbacks(2).png?raw=true)
![Callbacks(3)-main.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Callbacks(3).png?raw=true)

### Week 3: Object Oriented Programming (OOP) & Classes
A class is a blueprint or template for similar objects, and we can add data and functionality to it. When creating a class, it's custom to capitalize the first letter of the variable, so we know it's a class. This follows customs in other programming languages.

![Classes(1)-board.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Classes(1).png?raw=true)
![Classes(2)-main.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Classes(1).png?raw=true)

### Week 5: Event Bubbling
When elements are nested within the DOM, the DOM needs a way to decide which elements ought to trigger an event.

![EventBubbling-main.js](https://github.com/chrysaliswoon/CatrisProject/blob/main/Notes%20&%20Resources/Event%20Bubbling.png?raw=true)
<br>

## Future Developments / Improvements
As this is created for a project submission, there might be no future iterations of this. However, if there were, these would be the future developments/improvements I would implement:

- Update the game visuals to make it more cat-themed and visually appealing.
- Recreate the game with shorter and more efficient codes independently.
- Create a hold section where players can store a Tetris block to be used later.
- Program the Pause, Rotate Left and Hold button.
- Create a Start screen with instructions.

<br>

## Summary
As this was my first time creating a project in a very tight timeframe, it was considered extremely ambitious for me to recreate the Tetris game. 

However, the idea behind it was that by learning how others recreated the game, I would understand the logic flow behind it and how they linked the HTML, CSS and JS together. This would then allow me to create a game from scratch. 

I also learn best by recreating someone's else work, deconstructing it, and then find a better way of going about it. 

My philosophy is, "Don't reinvent the wheel. Analyse and observe how the wheel works, the thought process behind creating it, the mechanics of it, and then deconstruct it, and make it better through reconstructing."

<br>

## References
As JS is relatively new to me and there were a lot of concepts that I had to get used to. In order to start the ball rolling on my project, I referenced various sources in terms of how they created their Tetris game, and adapated and modified them to be mine as much as possible.

- [Game Development - JS Tetris](https://www.educative.io/courses/game-development-js-tetris)
- [Learning Modern JS with Tetris](https://michael-karen.medium.com/learning-modern-javascript-with-tetris-92d532bcd057)
- [Building TETRIS - Game Development Tutorial](https://www.youtube.com/watch?v=8zXlWbEgfiY&t=100s)
- [Tetris SRS Mechanism Explained](https://www.youtube.com/watch?v=UdYri9Kx6Zs)

## Game Asset Atrributions
The game assets in this project does not belong to me. All rights belong to the original artists and owners. Below are the links to the game assets used in this project:

- [Pixel Background](https://data.whicdn.com/images/299174311/original.gif)
- [Paw Icon](https://www.flaticon.com/free-icon/pawprint_6316837?term=paw&page=1&position=73&page=1&position=73&related_id=6316837&origin=tag)
