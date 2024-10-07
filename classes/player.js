class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
        this.radians = 0.75
        this.openRate = 0.12
        // FOR CONDITIONAL ROTATION
        this.rotation = 0
    }

    draw(){
        c.save()
        // ROTATION MOVEMENT
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)  // I'm currently using save() and restore(), so rotate() won't affect the whole code but just my draw()de
        c.translate(-this.position.x, -this.position.y)
        

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
        c.restore()
    }
    
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.radians < 0 || this.radians > .75 ) { this.openRate = -this.openRate
            this.radians += this.openRate
        }

    }
}
