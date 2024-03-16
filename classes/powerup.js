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