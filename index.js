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

    constructor({position}) {   // each boundary has different properies so you need different instances
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    draw() {  // 'disegni l'istanza chiamando il context
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height) // [devi creare una istanza per poter vedere il boundary nello schermo e fare una call di draw() SULLA istanza]
    }
}

// class for the players: pacman and its enemies: both are round and share the same size, so one class for many istancies;

class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)     // rules to draw the circle shape;
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }    // this function has to be assigned to the class === the functionality for the instances to be displayed in the game has to be inherent to their respective class;
    
    update() {                  // update deve andare in un infinite loop per riaggiornare la pagina di continuo , ovvero animate(), insieme all'animazione del boundary;
        this.draw();   // lo ridisegni di bolta in volta ...
        this.position.x += this.velocity.x          // nella posizione aggiornata dalla sua velocita in direzione x o y
        this.position.y += this.velocity.y
    }
}

// LO SPAZIO DEL GIOCO == LA MAPPA
// boundaries most efficient method: create an array made of string arrays. each string array within the array has six strings
// and you have four of these arrays. so you are kinda replicating a perimeter with a 6 cols * 4 rows.
// populate each string of these 4 arrays with  a '-' or ' ': '-' = boundary, ' ' = space for movement;
// you'll loop trough the boundary by assigning a .forEach to map. for each string inside the parameter, the callback will operate some sort of conditional rendering;

// qui dentro metto le istanze di Boundary. usando forEach e uno switch statement su map in base al caso specifico '-' o ''
// questo array viene popolato DINAMICAMENTE tramite .push() di istanze Boundary grazie al .forEach() su symbol dentro il .forEach() di map.
// per poterle visualizzare, poi devi fare draw() di ogni istanza dentro boundaries. usa un forEach() dentro animate() per garantire il rerender frame by frame
const boundaries = [];


// le istanze dei giocatori:
const player = new Player({          // tra parentesi metti i parametri da mandare al constructor per inizializzare 'this'
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0
    }
})
// per poter visualizzare le istanze devi fare la call di draw() che sta nella classe;

const keys = {
    w : {pressed : false},
    a : {pressed : false},
    s : {pressed : false},
    d : {pressed : false},
}

let lastKey = ''

const map = [// i    i    i    i     //.forEach(row, i)    row e' l'array current,  j e' l'index di array in cui si trova attualmente: mi serve per creare la y di height per il fillRect nel draw() di boundary. i invece lo uso per la x ovvero width
    ['-', '-', '-', '-', '-', '-', '-',], // j = 0              // treat each element of the array as a 'row' in the parameter of the map.forEach()
    ['-', ' ', ' ', ' ', ' ', ' ', '-',], // j = 1              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
    ['-', ' ', '-', ' ', '-', ' ', '-',], // j = 2              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
    ['-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', '-', ' ', '-', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-', '-',]     // j = 4              // se '-', metti una istanza DENTRO L'ARRAY boundaries.
];
map.forEach((row, j) =>  // il parametro j applicato ad x === ai cols di maps. x: 40 * j;
    {
        row.forEach((symbol, i) => {    // per evitare la sobrapposizione delle istanze nella stessa position, ti serve un secondo parametro i
            // console.log(symbol, i, row);
            // ORA METTO LE ISTANZE:
            switch(symbol) {    // come iterator uso symbol, i mi serve solo in quanto integer da moltiplicare per assegnare la posizione al constructor per finalizzare fillRect di draw() di Boundary
                case '-':
                    boundaries.push(    // instead of STATIC values SUCH AS `40` for x and y, reference a variable as `static` from the class.
                        new Boundary({
                            position: {   // se lascio x ed y a 0 non ho un rendering dinamico === tutte le istanze di boundary dentro boundaries, create col for each di map, finiranno tutte nello stesso punto;
                                x: Boundary.width * i,   // reference your static property within the Boundary class === clear and easier to manage code;
                                y: Boundary.height * j,  // === display each row // se i = 3 = 120 px SOTTO rispetto al primo
                            }
                        })
                        );
                    // console.log(boundaries) // per vedere come boundaries si popola ad ogni forEach su symbol;
                    // console.log(boundaries[boundaries.length - 2])    // vedi ogni singolo elemento. osserva come la position cambia
                    break;
                case ' ':
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


/// animate () riaggiorna draw() di player e il draw() e i velocity di player() ovvero player.update() in questo infiniteloop. se non fai la call di animate() non parte niente;
function animate() {                    // aggiorni di continuo la mappa ridisegnandola in base a boundaries. inoltre, riaggiorni il player position con update
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

    boundaries.forEach((boundary) => {    // fai il rendering di ogni blocco istanza di newBoundary creato col for each su map
        boundary.draw();

        // conditionals to avoid pacman from stepping through boundaries;
        if (
            circleCollidesWithRectangle({circle: player , rectangle: boundary})
            ) {
                    console.log("We are colliding!!!");
                    player.velocity.y = 0
                    player.velocity.x = 0
                }
        }
    )
    
    player.update();
    // player.velocity.y = 0
    // player.velocity.x = 0


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

// console.log(keys.d.pressed)
// console.log(keys.s.pressed)

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

    // console.log(keys.d.pressed)
    // console.log(keys.s.pressed)
  }
)
