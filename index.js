const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl')

canvas.width = innerWidth;     // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
canvas.height = innerHeight;   // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
                               // `window` is like a library of methods and properties.
                               //  still the browser applies some DEFAULT MARGIN to the BODY element: 8px, top and left.

class Boundary {
    static width = 40;     // x   reference this static in your code below using the dot notation (class === obj sintax);
    static height = 40;    // y   reference this static in your code below using the dot notation (class === obj sintax);

    constructor({position, image}) {   // each boundary has different properies so you need different instances
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    draw() {
       c.drawImage(this.image, this.position.x , this.position.y)
   
    }
}


class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
        this.radians = 0.75
        this.openRate = 0.12
    }

    draw(){
        c.beginPath();
        c.arc(
            this.position.x,
            this.position.y,
            this.radius, 0,
            Math.PI * 2 - this.radians
            )
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle =  'yellow';
        c.fill();
        c.closePath();
    }
    
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.radians > 0 || this.radians < .75) { this.openRate = -this.openRate
            this.radians += this.openRate
        }
    }
}

class Ghost {
    static speed = 2
    constructor({position, velocity, color = 'red'}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
        this.color = color;
        this.prevCollisions = []
        this.speed = 2
        this.scared = false
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.scared ? 'purple' : this.color;
        c.fill();
        c.closePath();
    }
    
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet{
    constructor({position}){
        this.position = position;
        this.radius = 3;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'pink';
        c.fill();
        c.closePath();
    }
}
class PowerUp{
    constructor({position}){
        this.position = position;
        this.radius = 10;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'pink';
        c.fill();
        c.closePath();
    }
}


// ARRAYS FOR INSTANCES RENDERING:
const powerUps = []
const pellets = [];
const boundaries = [];
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

const player = new Player({
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
// SMALL
const map =[
    [ '1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2' ],
    [ '|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '7', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|' ],
    [ '|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|' ],
    [ '|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '+', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|' ],
    [ '|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|' ],
    [ '|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '5', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|' ],
    [ '4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3' ]
];
function createImage(src){
    const image = new Image()
    image.src = src;
    return image;
}

map.forEach((row, j) =>
    {
        row.forEach((symbol, i) => {
            switch(symbol) {
                case '-':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * i,
                                y: Boundary.height * j,
                            },
                            image: createImage('./img/pipeHorizontal.png')
                            
                        })
                        );
                    break;
                    
                    case '|':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeVertical.png')
                                
                            })
                            );
                        break;

                    case '1':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner1.png')
                                
                            })
                            );
                        break;

                    case '2':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner2.png')
                                
                            })
                            );
                        break;

                    case '3':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner3.png')
                                
                            })
                            );
                        break;

                    case '4':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner4.png')
                                
                            })
                            );
                        break;

                        case '7':
                            boundaries.push(
                                new Boundary({
                                    position: {
                                        x: Boundary.width * i,
                                        y: Boundary.height * j,
                                    },
                                    image: createImage('./img/pipeConnectorBottom.png')
                                    
                                })
                                );
                            break;
    
                        case '5':
                            boundaries.push(
                                new Boundary({
                                    position: {
                                        x: Boundary.width * i,
                                        y: Boundary.height * j,
                                    },
                                    image: createImage('./img/pipeConnectorTop.png')
                                    
                                })
                                );
                            break;
    
                    case '6':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeConnectorRight.png')
                                
                            })
                            );
                        break;

                    case 'B':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/block.png')
                                
                            })
                            );
                            break;
                            
                            case '^':
                                boundaries.push(
                                    new Boundary({
                                        position: {
                                            x: Boundary.width * i,
                                            y: Boundary.height * j,
                                        },
                                        image: createImage('./img/capTop.png')
                                        
                                    })
                                    );
                                break;
                                
                    case '_':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capBottom.png')
                                
                            })
                            );
                        break;

                    case '[':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capLeft.png')
                                
                            })
                            );
                        break;

                    case ']':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capRight.png')
                                
                            })
                            );
                        break;

                    case '+':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCross.png')
                                
                            })
                            );
                        break;

                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: i * Boundary.width + Boundary.width / 2,
                                y: j * Boundary.height + Boundary.height / 2
                            },
                        })
                    )
                    break;

                case 'p':
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: i * Boundary.width + Boundary.width / 2,
                                y: j * Boundary.height + Boundary.height / 2,
                            }
                        })
                    )
            }
        }
        )
     }
)

function circleCollidesWithRectangle({circle, rectangle}){

    const padding = Boundary.width / 2 - circle.radius - 2        // - 1 CREATES MOVEMENT ISSUES IN PLAYER
    
    return(
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
       )
        }


let animationId
function animate() {
    animationId = requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)

// velocity
const v = 4
const stop = 0

    // COLLISION LOGIC and VELOCITY
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                circle: {
                    ...player,
                     velocity: {
                    x: 0,
                    y: -v
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = stop;
                break;
            } else {
                player.velocity.y = -v;
            }
        }
    }  else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                circle: {
                    ...player,
                     velocity: {
                    x: -v,
                    y: 0                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = stop;
                break;
            } else {
                player.velocity.x = -v;
            }
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                circle: {
                    ...player,
                     velocity: {
                    x: 0,
                    y: v
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = stop;
                break;
            } else {
                player.velocity.y = v;
            }
    }
 } else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++)  {
        const boundary = boundaries[i]
        if (
            circleCollidesWithRectangle({
            circle: {
                ...player,
                 velocity: {
                x: v,
                y: 0                     }
            },
            rectangle: boundary
        })
        ) {
            player.velocity.x = stop;
            break;
        } else {
            player.velocity.x = v;
        }
    }
    }

// COLLISION CONDITIONAL WITH ENEMY: EAT OR LOSE
    for (let i = ghosts.length -1; 0 <= i; i--) {
        const ghost = ghosts[i]
        
        if (
            Math.hypot(
                ghost.position.x - player.position.x, ghost.position.y - player.position.y) <
                ghost.radius + player.radius
                )
                {
                    if(ghost.scared){
                        ghosts.splice(i, 1)
                    } else {
                        cancelAnimationFrame(animationId)
                        console.log('you lose')
                    }
            }
        }

// BEAT THE GAME CONDITIONALS

    if (pellets.length === 1) {        // at === 0 is not working ... is never empty
        console.log('you win')
        cancelAnimationFrame(animationId)
    }

// POWERUPS EATER and RENDERING
    for (let i = powerUps.length - 1; 0 <= i; i --){
        const powerUp = powerUps[i]
        powerUp.draw()
        
        // COLLISION CONDITIONAL WHILE ON POWERUP - WHAT'S GONNA HAPPEN AFTER COLLISION
        if (
            Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y) < powerUp.radius + player.radius){
                powerUps.splice(i, 1)

                // MAKE GHOSTS SCARED
                ghosts.forEach((ghost) => {
                    ghost.scared = true
                    console.log(ghost.scared)

                    setTimeout(() => {
                        ghost.scared = false
                        console.log(ghost.scared)
                    }, 8000)

                })
            }
        
    }



 // PELLETS EATER AND RENDERING
    for (let i = pellets.length -1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if (
            Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius){
            pellets.splice(i, 1)
            console.log(pellets)
            score += 10
            scoreEl.innerHTML =score
        }
    }
    

    boundaries.forEach((boundary) => {
        boundary.draw();

        if (
            circleCollidesWithRectangle({circle: player , rectangle: boundary})
            ) {
                    player.velocity.y = 0
                    player.velocity.x = 0
                }
        }
    )
// GHOST COLLISION
    player.update();
    ghosts.forEach( ghost => {
        ghost.update()

        // lose conditional ENEMY TOUCHES PLAYER

        if (
            Math.hypot(
                ghost.position.x - player.position.x, ghost.position.y - player.position.y) <
                ghost.radius + player.radius
                && !ghost.scared)
                {
                cancelAnimationFrame(animationId)
                console.log('you lose')
                }


// COLLISION CONDITIONALS
        const collisions = []

        boundaries.forEach( boundary => {
            if (
                    !collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,                                // what's the purpose of this?? you specify that 'ghost' is the instance from ghost of 'ghosts' with all the class properties in a ... array copy
                     velocity: {
                    x: ghost.speed,
                    y: 0
                    }
                },
                rectangle: boundary
            })
            )
            {
                collisions.push('right')
               }
            
                if (
                    !collisions.includes('left') &&
                    circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: -ghost.speed,
                    y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('left')
               }

            if (
                    !collisions.includes('up') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: 0,
                    y: -ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('up')
               }

            if (
                    !collisions.includes('down') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: 0,
                    y: ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('down')
               }
        })
        if (collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
            // console.log(collisions)
            // console.log(ghost.prevCollisions)

               // avaiable ghost pathways conditionals
            if (ghost.velocity.x > 0) {
                ghost.prevCollisions.push('right')
            }
            else if (ghost.velocity.x < 0) {
                ghost.prevCollisions.push('left')
            }
            else if (ghost.velocity.y < 0) {
                ghost.prevCollisions.push('up')
            }
            else if (ghost.velocity.y > 0) {
                ghost.prevCollisions.push('down')
            }
            
            const pathways = ghost.prevCollisions.filter((collision) => {
                     return !collisions.includes(collision)
                    })

            // direction randomizer:
            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break;
                
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break;
                
                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break;
                
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
            }

            ghost.prevCollisions = []

        }
    })
}

animate()

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
