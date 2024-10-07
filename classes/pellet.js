class Pellet{
    constructor({position}){
        this.position = position;        // it's the width * array raw iterator (outer arr === x axis). same for y-axis but with inner loop; 
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
