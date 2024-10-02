# Line-by-line explanation of my code for this project. #
# [ Written by >>> me <<<. ] #
Adriano Gratani, 2024

//////////////////////// General information:

I started coding Pacman in February 2024, as a newbie. It took me around five weeks to finish it.
I chose this project because you need a basic understanding of algorithms and data structures to code a video game.
How to implement the map, how to render characters and event configuration: I did everything from scratch.

//////////////////////// General Game Description:

- the user uses Pacman, the main character of this game, to move in a predefined map. The map contains small round-shaped pellets.
- Goal of the game is to help Pacman in his goal of collecting each pellet. If there are no pellets left in the map, the user wins the game.
- for sake of variety/competion, the map presents antagonists, namely the 'ghosts'. If a ghost touches Pacman and there are still pellets left in the map, the game stops immediately, and the user lose the game.

The whole Pacman game is made of five main components:
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

the map is made of small blocks, each one is the instance of a class named `Boundary`, which provides:
1. some static data for width and height for each block.
2. The Boundary constructor, which implements two arguments:
  - one for the position of the Boundary;
  - one for the Sprite image of the Boundary instance;
  - ( of course, width and height constructor rely on fallback data stored in the static data, to avoid discrepancies over the map; )
    
3. a `draw()` method, which takes no args:
  - this method gets called in the `animation()` to draw each block. it just calls the context and uses the built in `drawImage()`
  - drawImage takes three parameters, first for the sprite image (taken as constructor argument, when the instance is initialized based       on the specific partition of the map array. ...this will be explained later), second for the position of the instance on the x axis,      and thir for the position in the y axis.
    
// ./classes/ghost.js = the enemies of Pacman.

  { enemies has same shape and size as Pacman, they move up, down, right and left, just like Pacman, but slightly slower.
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

  { pellets are distributed in every single path-block of the map (a path-block is just an empty block, it is not an instance of Boundary.) When Pacman steps over a pellet, the pellet gets 'eaten', which means it disappears from the Canvas and gets garbage collected from the instances array.  [the instance-array concept will be explained later]}

  Pellet constructor:
  - property for the radius (pellet is round-shaped) set to a fallback integer;
  - property `.position` to determine where to render each pellet and which pellet has to be garbage collected. Position is dynamic, cannot be fixed, so it is initialized to the argument value sent to the constructor;

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

// ./classes/powerup.js = if Pacman catches a powerup, he can eat the Ghosts.

{ Logic, constructor and methods are basically the same as for pellets, it's a semplified version of Ghost class. It cannot move.}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////// the ANIMATION /////////////////// 

// ./index.js = it contains all the instances for each class.

All the instances (except for Pacman) are stored in arrays. the ghost array is populated by default at the beginning from index.js with two instances.


// ./animate.js = this js manages the whole logic of the game:

                  - sets the infinite loop for animate the canvas (based on win-lose conditionals);
                  - renders the instances, based on conditionals (pellet eaten or not, Ghosts eaten or not, etc...);
                  - calls the collisions dector (pacman-walls / pacman-ghosts / pacman-pellets ..same for ghosts);
                  - sets the event listeners to move Pacman;
                  - sets the 'AI' for the ghosts;
                  - 'beat the game' conditions;
                  - ghosts rendering and collision conditionals based on powerup eaten;

animate.js constist of three parts:
  - the `animate()` function scope;
  - the `animate()` call;
  - the event listeners for Pacman movements;

// the event listeners:
- user can move pacman towards four directions: up, down, right and left. ./index.js sets the `keys` object which stores four keys: w a s d. each of these has an object as value, and each object stores the key pressed, set by default to false, so when the user presses one of these keys, we want to set the value stored in this object to `true`. We also want to store the last key pressed in a variable to avoid issues in case the user is pressing more than one button at the time.

- the event listener is basically a switch statement. we need two of them, one to monitorate the `'keydown'`  and one for the `'keyup'` DOM events. in case of `'keydown'`, it will switch the key checking which case is true: 'w' 'a' , 's', or 'd'.
once the true case is found, will set the `keys.{w/a/s/d}.pressed` to `true` and `lastKey` to the same key. Same logic applied to  `'keyup'` but in reverse (`false` instead of `true`)

// `animate()` function:

- calls itself, recursively, within `requestAnimationFrame()`. This will generate an infinite loop to display the Canvas.
- after that, it does `clearRect()` to avoid superimpositions of the previous frame. in Canvas each frame has to be displayed on an empty canvas. otherwise user will see traces of previous frames still rendering on the screen;

rendering instances:
- there's a Timeout which populates the powerup instances array. for each powerup instance you call `powerup.draw()`
- an if statements checks if the collision occurs between Pacman and Powerup, in that case it will splice() the current powerup from the array.
in the same condition: forEach ghost instance in the ghosts array, it turns the .scared property to true, and sets the timeout to 8000ms, after which the .scared property will go back to false.

rendering the pellets:
based on the map 2D array, each '.' symbol gets pushed in the pellets instances array. rendering it's easy: for each instance constructor provide the j * the size of the block / 2 (the pellet will get positioned in the middle);
if pacman collides with a pellet, splice the pellet at [i] (we are iterating using forEach() );

rendering the boundary blocks:
as mentioned earlier, a map is a 2D array where each partition stores a certain value. if the value is '.' the pellet array gets increased by one.
for any other case, you create an instance of Boundary with a different sprite image, according to the symbol stored in the partition.
- the image rendering in Canvas can be quite tricky. `this.image` has to receive a function call with the address of that specific img as argument. the function in question is `createImage(src)` and  it generates a new HTML Image(), with Image.src equal to the argument src. then it returns the image so that it can be sent to the constructor.
- Recap: we have an array map made out of symbols. we iterate over the array with a nested forEach and switch between different symbols.
- in case the match symbole/switch case is satisfied, we .push() in the boundaries array a new Instance of a boundary.
- its position on the x axis: we use the `i` iterator (row pointer from outer forEach()) multiplied by `this.width` (which is a fallback)
- its position on the y axis: we use the `j` iterator from the nested forEach as a column counter, mutiplied by `this.height` (again, a fallback value provided to the constructor).

  powerups rendering:
  - the map array stores a 'special symbol' for the powerup: the switch will take care of this case, inside the nested forEach();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// COLLISION LOGIC

we don't want Pacman to step over blocks: we need to set boundaries.
we don't want neither to block Pacman: it should move constantly, giving the impression of constantly and gracefully avoiding contact with aforementioned blocks.
if pacman touches the block, velocity turns 0. ...and we want to avoid that.

- set multiple `if` ...`else if` statements, based on both key pressed `&&` last key pressed. if a match is found we access the conditional scope.
- a `for` loop checks over the whole `length` of the boundary instance array: if a collision between pacman is detected (to check this occurrence we just need a collision conditional function which takes as parameters one `circle` object with two keys: first the `...player` instance, second key is the velocity.
  if the collision function returns `true` means that a collision has between found between pacman and a [i] boundary. in that case stop the velocity on the y / x axis by updating Pacman `this.velocity` and break from the loop, otherwise keep pacman with same velocity ) 


