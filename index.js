const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;     // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
canvas.height = innerHeight;   // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
                               // `window` is like a library of methods and properties.
                               //  still the browser applies some DEFAULT MARGIN to the BODY element: 8px, top and left.
console.log(canvas);

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
        this.radius = 15;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }
    
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const boundaries = [];



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

const map = [
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
                    break;
            }
        }
        )
     }
)

function circleCollidesWithRectangle({circle, rectangle}){
    return(
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
       )
        }

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)


    // COLLISION LOGIC
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                circle: {
                    ...player,
                     velocity: {
                    x: 0,
                    y: -5
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = -5;
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
                    x: -5,
                    y: 0                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = -5;
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
                    y: 5
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = 5;
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
                x: 5,
                y: 0                     }
            },
            rectangle: boundary
        })
        ) {
            player.velocity.x = 0;
            break;
        } else {
            player.velocity.x = 5;
        }
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
    
    player.update();
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
