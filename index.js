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
    
                                                                                                                     // muovere il player nello spazio
    update() {                                                                                                       // update deve andare in un infinite loop per riaggiornare la pagina di continuo , ovvero animate(), insieme all'animazione del boundary;
        this.draw();                                                                                                 // lo ridisegni di bolta in volta ...
        this.position.x += this.velocity.x                                                                           // nella posizione aggiornata dalla sua velocita in direzione x o y
        this.position.y += this.velocity.y
    }
}

// LO SPAZIO DEL GIOCO == LA MAPPA
// boundaries most efficient method: create an array made of string arrays. each string array within the array has six strings
// and you have four of these arrays. so you are kinda replicating a perimeter with a 6 cols * 4 rows.
// populate each string of these 4 arrays with  a '-' or ' ': '-' = boundary, ' ' = space for movement;
// you'll loop trough the boundary by assigning a .forEach to map. for each string inside the parameter, the callback will operate some sort of conditional rendering;

// const map = [// i    i    i    i     //.forEach(row, i)
//     ['-', '-', '-', '-', '-', '-',], // j = 0              // treat each element of the array as a 'row' in the parameter of the map.forEach()
//     ['-', ' ', ' ', ' ', ' ', '-',], // j = 1              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
//     ['-', ' ', '-', '-', ' ', '-',], // j = 2              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
//     ['-', ' ', ' ', ' ', ' ', '-',], // j = 3              // nel nested .forEach() usa uno switch su (symbol): case '-' boundary.draw() mentre case ' ' non fare nulla;
//     ['-', '-', '-', '-', '-', '-',]  // j = 4              // se '-', metti una istanza DENTRO L'ARRAY boundaries.
// ];
const boundaries = [];                  // questo array viene popolato DINAMICAMENTE tramite .push() di istanze Boundary grazie al .forEach() su symbol dentro il .forEach() di map.
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
})                                 // per poter visualizzare la istanza devi fare la call di draw() che sta nella classe;

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const map = [
    ['-', '-', '-', '-', '-', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', '-', '-', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-',]
];

map.forEach((row, j) =>  // il parametro j applicato ad x === ai cols di maps. x: 40 * j;
    {
        row.forEach((symbol, i) => {    // per evitare la sobrapposizione delle istanze nella stessa position, ti serve un secondo parametro i
            // console.log(symbol, i, row);
            
            switch(symbol) {
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
// anima la mappa -personaggi e movimenti, di frame in frame
/// animate () riaggiorna draw() di player e il draw() e i velocity di player() ovvero player.update() in questo infiniteloop. se non fai la call di animate() non parte niente;
// aggiorni di continuo la mappa ridisegnandola in base a boundaries. inoltre, riaggiorni il player position con update
// fai il rendering di ogni blocco istanza di newBoundary creato col for each su map
// infinte brakes: take of only when bool 'pressed' in keys changes

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw();
    })
    
        player.update();
        player.velocity = 0;

    if (keys.w.pressed) {
        player.velocity.y = -5;
    } else if (keys.a.pressed) {
        player.velocity.x = -5;
    } else if (keys.s.pressed) {
        player.velocity.y = 5;
    } else if (keys.d.pressed) {
        player.velocity.x = 5;
    }
}

animate()




addEventListener('keydown', ({ key }) => {                // event listener to change state of bools in 'keys'
switch(key){
    case 'w':
        keys.w.pressed = true
        console.log(keys.w.pressed)
        break;
    case 'a':
        keys.a.pressed = true
        console.log(keys.a.pressed)
        break;
    case 's':
        keys.s.pressed = true
        break;
        case 'd':
            keys.d.pressed = true
            break;
        }
    }
)
    
    addEventListener('keyup', ({key}) => {
        switch(key){
        case 'w':
            keys.w.pressed = false
            console.log(keys.w.pressed)
            console.log(0)
            break;
            case 'a':
                keys.a.pressed = false
                console.log(keys.a.pressed)
                break;
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
        }
    }
)

