# Line-by-line explanation of my code for this project. #
# [ Written by >>> me <<<. ] #
Adriano Gratani, 2024

//////////////////////// General informations:

I started coding Pacman in February 2024, as a newbye. It took me around five weeks to finish it.
I chose this project because you need a basic understanding of algorithms and data structures to code a video game.
How to implement the map, how to render characters and event configuration: I did everything from scratch.

//////////////////////// General Game Description:

- the user uses Pacman, the main character of this game, to move in a predefined map. The map contains small round-shaped pellets.
- Goal of the game is to help Pacman in his goal of collecting each pellet. If there are no pellets left in the map, the user wins the game.
- for sake of variety/competion, the map presents anthagonists, namely the 'ghosts'. If a ghost touches Pacman and there are still pellets left in the map, the game stops immediately, and the user lose the game.

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

Ghost constructor:
- the speed of each Ghost has to be fixed, so I just implemented a static variable;
- position is randomly generated, so it has to be decided or randomized using arguments. that's why `this.position = position`, where the second `position` is provided to the constructor.
- velocity is the property to set the direction of the ghost, based on Canvas X and Y axis.
      - positive X means move towards right.
      - negative X means move towards left.
      - positive Y means move towards the bottom.
      - negative Y means move towards the top.
- Ghosts are round shaped, so I created a `radius`property which stores a fallback value of 18 (same as Pacman);
- Color of each Ghost is different, so `this.color` gets assigned a color argument from the constructor.
- Ghost are aggressive , but they can get scared, if Pacman eats the bonus. by default, the `this.scared` property has its fallback set to `false`.
- AI OF THE GHOST:
- Ghost are not controlled by human player. Still, they move, they avoid the walls, they have to change direction.
  each ghost has its own 'memory' of the previous directions and where he comes from. `this.prevCollisions` is set to an empty array. { This is the most difficult part of the game, it will be discussed further in this file, once we get a solid understanding of the whole logic of animations etc.. }

  The draw() method for the Ghost class:
  - to draw a shape (a shape, not a sprite Image), using Canvas, we need to implement some context methods. First the .beginPath() method:
  - then, we want the Ghost to be round, so we use the context.arc() method, which takes arguments for rendering positions on both axis, radius degree, starting drawing degree and finishing degree.
  - we use .fillStyle() method to color the Ghost. But we want to check if the Ghost is scared or not. Based on the value stored by `this` instance in its `scared` property accessed through dot-notation, we decide which color has to be assigned. That's why the .fillStyle() is set to a ES6 ternary operator based on `this.scared`.
  - we need two more methods from the context: `.fill()` to color the shape we juste created with `this.color`, and `.closePath()` to 'finish the drawing'
  - all these methods have to be performed inside the draw() method.

  The update() method for the Ghost class:
  - Canvas renders the game 60 frames per second, which means: for every frame of the game rendering we need fresh data from the instances:
  - where is the ghost? is it scared? any collision happened between it and Pacman? Where can it move next?
  - an answer for each of these questions can be found in the `draw()` method, so we need to call `draw()` in the animation code.
  - we can't just call `draw()` because we also need to update the position for both axis based on the current velocity.
  - `update()` solves this problem: it calls `draw()` and THEN updates the the position of the instance. That's why in the animation section you call `update()` and not `draw()`;
  
// ./classes/pellet.js = Pacman's goal is to collect these instances in the map;

  { pellets are distributed in every single path-block of the map (a path-block is just an empty block, it's not an instance of Boundary.) When Pacman steps over a pellet, the pellet gets 'eaten', which means it disappeears from the Canvas and gets garbage collected from the instances array.  [the instance-array concept will be explained later]}

  Pellet constructor:
  - property for the radius (pellet is round-shaped) set to a fallback integer;
  - property `.position` to determine where to render each pellet and which pellet has to be garbage collected. Position is dynamic, cannot be fixed, so is initialized to the argument value sent to the constructor;

  The draw() method:
    - the `draw()` method works the same way as for the Ghost class: same logic and same properties involved;
    - Pellets are fixed in their position, which means no update of their position is needed. that's why we don't need any `update()` method as for Ghost;

// ./classes/player.js = Pacman.

{ Please refere to the Ghost class for the constructor and methods. Our Pacman is round-shaped and moves over the map, so the constructor is pretty similar to the Ghost. It has some more advanced implementations though, like the animation to simulate the mouth open-close on loop, signature of the original game.
In addition, when pacman moves towards a direction, the whole shape should rotate accordingly so that the 'mouth' points towards the same direction. }

The draw() method: mouth animation:
- we implement two properties, radians and openRate to determine the limits (wide-open mouth, totally closed)

The update() method:
- same as Ghost, calls `draw()` and checks with a conditional which Pacman-mouth-animation phase has to be performed (based on radians current value, openRate has to increase or lower down?)


