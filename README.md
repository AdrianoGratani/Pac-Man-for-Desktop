General informations:

I started coding Pacman in February 2024, as a newbye. It took me around five weeks to finish it.
I chose this project because you need a basic understanding of algorithms and data structures to code a video game.
How to implement the map, how to render characters and event configuration: I did everything from scratch.

Description:

The whole Pacman game is made of four main components:
  - the map of the game;
  - the player character;
  - the enemies;
  - the logic behind character movement;
  - the collision detection;

the map, the player and the enemies are instances of their class: this project is intended to learn good oop principles.

//////////////////////////////////////////////////////

the map: it's made of small blocks, each one is the instance of a class named `Boundary`, which provides 1. some static data for width and height for each block.
2. The Boundary constructor implements two arguments:
  - one for the position of the Boundary;
  - one for the Sprite image of the Boundary instance;
  - of course, width and height constructor rely on fallback data to avoid discrepancies over the map;
3. a `draw()` method, which takes no args:
  - this method gets called in the `animation()` to draw each block. it just calls the context and uses the built in `drawImage()` with reference to both static and dynamic arguments we just assigned from the constructor (position, image, width and height)
