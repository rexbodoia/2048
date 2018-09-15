# 2048

## Background and Overview

[2048](https://rexbodoia.github.io/2048/)

This project is a replica of the 2048 sliding puzzle game created by Gabriele Cirulli in 2014, with a couple of extra features. It is a fairly simple game invloving squares that slide on a 4x4 grid by pressing arrow keys. Each square has a value and if two squares with the same vallue collide, they become one square with double that value. A new tile is randomly generated on the board everytime a player moves and the game is over when the board is filled and there are no available moves left. The goal of the game is to create a 2048 tile without the board before the game ends.

![Sample](/docs/StartScreen.png)

## Functionality and MVP

Users are able to:
+ Manipulate squares with the arrow keys
+ Play until either the board fills up or they reach 2048
+ Keep track of the player's score
+ See either a "You Win!" or "Game Over" message
+ Watch the background color change in accordance with the current largest tile

## Architecture and Technologies

I needed very few technologies to implement this project:

+ Vanilla javascript was used to write the logic and structure of the game
+ HTML5 SVG and CSS was used for all of the graphics I need

The scripts I needed for this project are:

+ board.js: keeps track of the grid and what tiles are where
+ tile.js: holds a value and the canvas graphic of a correspondingly colored square
+ game.js: the highest level script, which will run the game using keyboard event handlers

I simply rendered an index.html file with ordered scripts for the javascript files I need to run the game as well as a script for a css stylesheet

![Live Demo](/docs/2048.gif)
