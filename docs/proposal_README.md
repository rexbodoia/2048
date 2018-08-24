# 2048

## Background and Overview

This project is a replica of the 2048 sliding puzzle game created by Gabriele Cirulli in 2014, with a couple of extra features. It is a fairly simple game invloving squares that slide on a 4x4 grid by pressing arrow keys. Each square has a value and if two squares with the same vallue collide, they become one square with double that value. A new tile is randomly generated on the board everytime a player moves and the game is over when the board is filled and there are no available moves left. The goal of the game is to create a 2048 tile without the board before the game ends.

[Real Version](https://gabrielecirulli.github.io/2048/)

## Functionality and MVP

Users will be able to:
+ Manipulate squares with the arrow keys
+ Keep track of the player's score
+ Adjust the grid size
+ Select an easy medium or hard difficulty

## Wireframe

![example image](https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/fa/e7/ef/fae7ef04-b442-20b2-00ce-b361f8d787e9/mzl.krhfhbuc.png/300x0w.jpg "Example image of 2048")

My version will mimick this wireframe, except instead of inluding high scores and a leaderboard, if will include links to the github and my LinkedIn page. The menu will include difficulty settings as well as grid size entry, neither of which is part of the original game.

## Architecture and Technologies

I need very few technologies to implement this project:

+ Vanilla javascript will be used to write the logic and structure of the game
+ HTML 5 canvas and CSS will be used for all of the graphics I need

The scripts I need for this project are:

+ board.js: keeps track of the grid and what tiles are where
+ tile.js: holds a value and the canvas graphic of a correspondingly colored square
+ score.js: keeps track of the user's score
+ game.js: the highest level script, which will run the game using keyboard event handlers

## Implementation Timeline

Day 1: Initial setup. Create scripts and organize them. Create the visual board first using canvas.

Day 2: Implement the game script first to set up event handlers for easy testing throughout the rest of the project. Start working on the tile script.

Day 3: Finish the tile script and build the board script. This one will probably take the longest so spend the day finishing it.

Day 4: Implement the scorekeeping and start working on other features such as sound effects and adjusting grid dimensions.

Day 5: Finish adding difficulty levels and then tidy everything up, making sure the tiles move smoothly and everything is visually appealing
