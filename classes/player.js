class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.radians = 0.75
        this.openRate = 0.12
        // FOR CONDITIONAL ROTATION
        this.rotation = 0
    }

    draw(){
        c.save();
        // rotation of pacman based on direction. It is NOT managed by event listeners, instead, rotation changes based on velocity, from animate().
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);
        // drawing pacman
        c.beginPath();
        c.arc(
            this.position.x,
            this.position.y,
            this.radius, 
            this.radians,
            Math.PI * 2 - this.radians
            )
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle =  'yellow';
        c.fill();
        c.closePath();
        c.restore();
    }
    
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // mouth animation
        if (this.radians < 0 || this.radians > .75 ) { 
            this.openRate = -this.openRate                // toggles .12 to -.12 and viceversa
        }
            this.radians += this.openRate                 // add the current openRate can be positive if mouth was closed (which triggered first condition) or negative (if mouth was wide open)

    }
}
