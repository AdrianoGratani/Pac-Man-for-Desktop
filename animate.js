let animationId

function animate() {
    animationId = requestAnimationFrame(animate)            // infinite loop, frame-by-frame
    c.clearRect(0,0, canvas.width, canvas.height)           // to avoid superimposition of previous frames stacked on each

// velocity
const v = 4
const stop = 0

    // COLLISION LOGIC and VELOCITY
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                circle: {
                    ...player,
                     velocity: {
                    x: 0,
                    y: -v
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = stop;
                break;
            } else {
                player.velocity.y = -v;
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
                    x: -v,
                    y: 0                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = stop;
                break;
            } else {
                player.velocity.x = -v;
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
                    y: v
                     }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = stop;
                break;
            } else {
                player.velocity.y = v;
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
                x: v,
                y: 0                     }
            },
            rectangle: boundary
        })
        ) {
            player.velocity.x = stop;
            break;
        } else {
            player.velocity.x = v;
        }
    }
    }

// COLLISION CONDITIONAL WITH ENEMY: EAT OR LOSE
    for (let i = ghosts.length -1; 0 <= i; i--) {
        const ghost = ghosts[i]
        
        if (
            Math.hypot(
                ghost.position.x - player.position.x, ghost.position.y - player.position.y) <
                ghost.radius + player.radius
                )
                {
                    if(ghost.scared){
                        ghosts.splice(i, 1)
                    } else {
                        cancelAnimationFrame(animationId)
                        console.log('you lose')
                    }
            }
        }

// BEAT THE GAME CONDITIONALS

    if (pellets.length === 1) {        // at === 0 is not working ... is never empty
        console.log('you win')
        cancelAnimationFrame(animationId)
    }

// POWERUPS EATER and RENDERING
    for (let i = powerUps.length - 1; 0 <= i; i --){
        const powerUp = powerUps[i]
        powerUp.draw()
        
        // COLLISION CONDITIONAL WHILE ON POWERUP - WHAT'S GONNA HAPPEN AFTER COLLISION
        if (
            Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y) < powerUp.radius + player.radius){
                powerUps.splice(i, 1)

                // MAKE GHOSTS SCARED
                ghosts.forEach((ghost) => {
                    ghost.scared = true
                    console.log(ghost.scared)

                    setTimeout(() => {
                        ghost.scared = false
                        console.log(ghost.scared)
                    }, 8000)

                })
            }
        
    }

 // PELLETS EATER AND RENDERING
    for (let i = pellets.length -1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if (
            Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius){
            pellets.splice(i, 1)
            console.log(pellets)
            score += 10
            scoreEl.innerHTML =score
        }
    }
    
// BOUNDARY RENDERING AND COLLISION CONDITIONAL
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
// GHOST COLLISION
    player.update();
    ghosts.forEach( ghost => {
        ghost.update()

        // lose conditional ENEMY TOUCHES PLAYER

        if (
            Math.hypot(
                ghost.position.x - player.position.x, ghost.position.y - player.position.y) <
                ghost.radius + player.radius
                && !ghost.scared)
                {
                cancelAnimationFrame(animationId)
                console.log('you lose')
                }


//  AI - ENEMY COLLISION CONDITIONALS
        const collisions = []

        boundaries.forEach( boundary => {
            if (
                    !collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,                                // what's the purpose of this?? you specify that 'ghost' is the instance from ghost of 'ghosts' with all the class properties in a ... array copy
                     velocity: {
                    x: ghost.speed,
                    y: 0
                    }
                },
                rectangle: boundary
            })
            )
            {
                collisions.push('right')
               }
            
                if (
                    !collisions.includes('left') &&
                    circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: -ghost.speed,
                    y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('left')
               }

            if (
                    !collisions.includes('up') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: 0,
                    y: -ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('up')
               }

            if (
                    !collisions.includes('down') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                     velocity: {
                    x: 0,
                    y: ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('down')
               }
        })
        if (collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
            // console.log(collisions)
            // console.log(ghost.prevCollisions)

               // avaiable ghost pathways conditionals
            if (ghost.velocity.x > 0) {
                ghost.prevCollisions.push('right')
            }
            else if (ghost.velocity.x < 0) {
                ghost.prevCollisions.push('left')
            }
            else if (ghost.velocity.y < 0) {
                ghost.prevCollisions.push('up')
            }
            else if (ghost.velocity.y > 0) {
                ghost.prevCollisions.push('down')
            }
            
            const pathways = ghost.prevCollisions.filter((collision) => {
                     return !collisions.includes(collision)
                    })

            // direction randomizer:
            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break;
                
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break;
                
                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break;
                
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
            }
            ghost.prevCollisions = []
        }
    })
    if (player.velocity.x > 0) player.rotation = 0
    else if (player.velocity.x < 0) player.rotation = Math.PI
    else if (player.velocity.y > 0) player.rotation = Math.PI / 2
    else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5
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
    