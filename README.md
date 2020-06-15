# bash-game
Find your hat! Find the right path without falling into a hole.

## Getting started 
1. Install Node.js and strip-ansi on your computer (e.g. `sudo apt install node.js npm` and `npm install strip-ansi`).
2. Download the directory bash-game.
3. Type ```node main.js``` in the directory.
4. Play!

## Instructions
1. Move with u/d/l/r (up/down/left/right) and press Enter
2. Move the * to the hat ^
3. Don't fall into a hole 0
4. Don't move outside the field

## Example maze layout
The maze layout changes at every start. An example looks like this:
```
*░O░░
░░░░░
░░░^O
░░░░░
░O░░░
Which way?
```
Now try to move the `*` to the `^` to win the game.  
In the example you could e.g. press `d`, `d`, `r`, `r`, `r` or also `r`, `d`, `r`, `d`, `r`.  
You would e.g. fail with `r`, `r`, `r`, `d`, `d`.
