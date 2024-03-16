const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl')

canvas.width = innerWidth;     // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
canvas.height = innerHeight;   // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
                               // `window` is like a library of methods and properties.
                               //  still the browser applies some DEFAULT MARGIN to the BODY element: 8px, top and left.

// ARRAYS FOR INSTANCES RENDERING:
const powerUps = []
const pellets = [];
const boundaries = [];

// CHARACTERS INSTANCES:
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        }
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 3 + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        color: 'pink'
    })
];

const player =
    new Player({
        position: {
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: 0,
            y: 0
        }
    })


const keys = {
    w : {pressed : false},
    a : {pressed : false},
    s : {pressed : false},
    d : {pressed : false},
}

let lastKey = ''
let score= 0

// PRESS
addEventListener('keydown', ({ key }) => {
    switch(key){
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
    }
      }
    )
    
// RELEASE
addEventListener('keyup', ({ key }) => {
    switch(key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
    }
)
    
