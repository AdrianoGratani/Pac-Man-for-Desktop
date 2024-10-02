Adriano Gratani, 2024

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

//////////////////////// CLASSES implemented for this game //////////////////////////////

To achieve better readability of the code, I chose modularity. As mentioned earlier, building blocks and characters are instances of classes. Each class has its own file .js, in the ./classes folder.

// ./classes/boundary.js = the building blocks for the map of the game.

{ to create the map you need various types of blocks (which are sprites). So I created a 2D array, with different symbols.
  Then, I created a  nested loop to iterate over each partition of the array. at each step I render a sprite = initialize a Boundary
  which different arguments for Image and position (x and y), the image rendered depends on the symbol stored in the partition.
  Evaluation for sprite assignment is performed through switch statements. }

the map it's made of small blocks, each one is the instance of a class named `Boundary`, which provides:
1. some static data for width and height for each block.
2. The Boundary constructor, which implements two arguments:
  - one for the position of the Boundary;
  - one for the Sprite image of the Boundary instance;
  - ( of course, width and height constructor rely on fallback data stored in the static data, to avoid discrepancies over the map; )
    
3. a `draw()` method, which takes no args:
  - this method gets called in the `animation()` to draw each block. it just calls the context and uses the built in `drawImage()`
  - drawImage takes three parameters, first for the sprite image (taken as constructor argument, when the instance is initialized based       on the specific partition of the map array. ...this will be explained later), second for the position of the instance on the x axis,      and thir for the position in the y axis.
    
// ./classes/ghost.js = the enemies of Pacman.

  { enemies has same shape and size as Pacman, they move up, down, right and left, just like Pacman, but slighty slower.
  the animation logic of the game implements a function which detect collision between ghosts and Pacman, based on conditionals.
  if the collision occurs, the game stops and the player loses the game.
  Ghost can get scared if Pacman eats the special bonus, in that case they change color for a brief moment, and the conditionals get reverted: now Pacman can eat the ghosts! }

constructor:
- the speed of each Ghost has to be fixed, so I just implemented a static variable;
- position is randomly generated, so it has to be decided or randomized using arguments. that's why `this.position = position`, where the second `position` is provided to the constructor.
- velocity is the property to set the direction of the ghost, based on Canvas X and Y axis.
      - positive X means move towards right.
      - negative X means move towards left.
      - positive Y means move towards the bottom.
      - negative Y means move towards the top.
  
