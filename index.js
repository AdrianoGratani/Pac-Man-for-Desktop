const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;     // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
canvas.height = innerHeight;   // `innerWidth` stands for `window.innerWidth`. the `window` object is provided BY DEFAULT  by the browser
                               // `window` is like a library of methods and properties.
                               //  still the browser applies some DEFAULT MARGIN to the BODY element: 8px, top and left.
console.log(canvas);

class Boundary {
    constructor({position}) {   // each boundary has different properies so you need different instances.
        this.position = position;
        this.width = 40;
        this.height = 40;
    }
    draw() {  // 'disegni l'istanza chiamando il context
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height) // [devi creare una istanza per poter vedere il boundary nello schermo e fare una call di draw() SULLA istanza]
    }
}

const boundary = new Boundary(   // il parametro position va DENTRO un oggetto: lo hai dichiarato cosi' nella classe. altrimenti non viene letto da js perche' non viene stabilita' identita', a livello sintattico, tra il parametro dell'istanza e del costruttore.
    {
        position: {
            x: 0,
            y: 0,
        }
    }
)
boundary.draw();

