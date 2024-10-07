class Ghost {
    static speed = 2
    constructor({position, velocity, color = 'red'}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
        this.color = color;
        this.prevCollisions = []                        // the enemy randomly picks a direction based on his previous 'choices' which are stored in / spliced from this array
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
