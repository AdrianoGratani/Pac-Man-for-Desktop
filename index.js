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
// boundaries most efficient method: create an array made of string arrays. each string array within the array has six strings
// and you have four of these arrays. so you are kinda replicating a perimeter with a 6 cols * 4 rows.
// populate each string of these 4 arrays with  a '-' or ' ': '-' = boundary, ' ' = space for movement;
// you'll loop trough the boundary by assigning a .forEach to map. for each string inside the parameter, the callback will operate some sort of conditional rendering;

const map = [                        //.forEach(row, i)
    ['-', '-', '-', '-', '-', '-',], // i = 0              // treat each element of the array as a 'row' in the parameter of the map.forEach()
    ['-', ' ', ' ', ' ', ' ', '-',], // i = 1              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
    ['-', ' ', '-', '-', ' ', '-',], // i = 1              // inspect each string within each 'row' by assigning a nested .forEach() to row within the 'row' scope.
    ['-', ' ', ' ', ' ', ' ', '-',], // i = 2              // nel nested .forEach() usa uno switch su (symbol): case '-' boundary.draw() mentre case ' ' non fare nulla;
    ['-', '-', '-', '-', '-', '-',]  // i = 3              // se '-', metti una istanza DENTRO L'ARRAY boundaries.
];
const boundaries = [];                  // questo array viene popolato DINAMICAMENTE tramite .push() di istanze Boundary grazie al .forEach() su symbol dentro il .forEach() di map.

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


boundaries.forEach((boundary) => {
    boundary.draw();
})


