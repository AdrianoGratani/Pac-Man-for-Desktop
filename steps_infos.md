# STEP_BY_STEP      // https://www.youtube.com/watch?v=5IMXpp3rohQ

1.  project setup;
    - generated canvas;
    - generated a script tag, to link the index.js within HTML;
    - create a document.querySelector to link the canvas to index.js
    - generated the size using `window` browser object;
    - changed bck color to black;
    - reset default body margin from browser;
2.  generate map boundaries;
    - generate a class with a selector to style different instances of the border-boundary.(check the original game for further reference);
    - assign a position to the constructor;
    - assign a width to the constructor;
    - assign a height to the constructor;
    - now you have some sort of 'boundary-boilerplate';
    - you need a function, inside the class, to 'draw()' the instance: call it draw().
    - draw(), in order to operate, needs to access the `fillStyle` and `fillRect` properties of the 'context' you saved in the `c` const earlier. fill rect draws the shape and fillStyle adds some color in it.
    - note that fillRect relies on four parameters in order to operate: the x  the y the width and the height, in order to place the item boundary and set its size.
    it gains this infos by accessing the instance and its parameter `position` to gain x and y, and the class constructor for the .width and .height, since those are set in the constructor by default (both are 40 === every boundary will share by default the same width and height)
    - now it's time to create an instance: a class by itself is abstract and nothing will be shown in our browser unless we intialize a boundary instance by assigning a `new` keyword and Boundary() to a const, outside the class scope, in the outer scope.
    this instance of Boundary is our first boundary block. it needs infos about its specific position.
    assign an object as parameter. and create a key named position [ ... so that `position` in the instance === `position` of this.position === reference between the class and the instance, achieved by sintax identity ];
    - position key has in turn an object as its value. this object stores x and y.
    why another obhect? because in the draw() function within the class, when we called the fillRect method from the context, we specified the location of the position by using the dot notation [this.position.x] so is like: instance = new ThisInstance({position:{x: 0, y: 0}})

        
    // ok hai creato un boundary ma come fai a creare tutti gli altri? puoi fare cosi', ma NON E' PER NULLA EFFICIENTE:// const boundary2 = new Boundary(
    //     {
    //         position: {
    //             x: 41,
    //             y: 0,
    //         }
    //     }
    // )
    // boundary2.draw();

    // 2. piu' efficiente ma ancora inperfetto: elemina le const per istanze singole di Boundary e affidale ad un unico array di oggetti
    /*  per il rendering su browser usi un forEach con parametro (boundary) e alla calback => affidi: { buondary.draw() }
    
    const boundary = new Boundary(   // il parametro position va DENTRO un oggetto: lo hai dichiarato cosi' nella classe. altrimenti non viene letto da js perche' non viene stabilita' identita', a livello sintattico, tra il parametro dell'istanza e del costruttore.
    {
        position: {
            x: 0,
            y: 0,
        }
    }
    )
    boundary.draw();

    const boundaries = [
    new Boundary(
        {
            position: {
                x: 0,
                y: 0,
            }
        }
    ),
    new Boundary(
        {
            position: {
                x: 41,        // l'inefficenza sta qui: devi definire ogni singola posizione di ogni istanza;
                y: 0,
            }
        }
    ),
    new Boundary(
        {
            position: {
                x: 82,
                y: 0,
            }
        }
    ),
    ... etc etc etc
    ]
    boundaries.forEach((boundary) => {boundary.draw()})

    */

3.  add Pacman, with movement;
4.  add collision detention;
5.  swap boundaries with images;
6.  generate pellets;
7.  remove pelletes on collision;
8.  add score;
9.  create ghost;
10. create power-up;
11. add win condition;
12. lay out a full level;
13. pacman chomp animation;


# plus;

 + affida i parametri al constructor di una class mettendoli *<DENTRO UN OGGETTO>*, altrimenti devi pensare all'ordine in cui li evochi.

