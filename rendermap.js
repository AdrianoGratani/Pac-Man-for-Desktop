// SMALL
const map =[
    [ '1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2' ],
    [ '|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '7', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|' ],
    [ '|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|' ],
    [ '|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '+', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|' ],
    [ '|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|' ],
    [ '|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|' ],
    [ '|', '.', 'B', '.', '[', '5', ']', '.', 'B', '.', '|' ],
    [ '|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|' ],
    [ '4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3' ]
];

// IMAGE RENDERING ON CANVAS
function createImage(src){
    const image = new Image()
    image.src = src;
    return image;
}

// MAP RENDERING INTO IMAGE: EACH array element = different Image()
map.forEach((row, j) =>
    {
        row.forEach((symbol, i) => {
            switch(symbol) {
                case '-':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * i,
                                y: Boundary.height * j,
                            },
                            image: createImage('./img/pipeHorizontal.png')
                            
                        })
                        );
                    break;
                    
                    case '|':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeVertical.png')
                                
                            })
                            );
                        break;

                    case '1':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner1.png')
                                
                            })
                            );
                        break;

                    case '2':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner2.png')
                                
                            })
                            );
                        break;

                    case '3':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner3.png')
                                
                            })
                            );
                        break;

                    case '4':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCorner4.png')
                                
                            })
                            );
                        break;

                        case '7':
                            boundaries.push(
                                new Boundary({
                                    position: {
                                        x: Boundary.width * i,
                                        y: Boundary.height * j,
                                    },
                                    image: createImage('./img/pipeConnectorBottom.png')
                                    
                                })
                                );
                            break;
    
                        case '5':
                            boundaries.push(
                                new Boundary({
                                    position: {
                                        x: Boundary.width * i,
                                        y: Boundary.height * j,
                                    },
                                    image: createImage('./img/pipeConnectorTop.png')
                                    
                                })
                                );
                            break;
    
                    case '6':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeConnectorRight.png')
                                
                            })
                            );
                        break;

                    case 'B':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/block.png')
                                
                            })
                            );
                            break;
                            
                            case '^':
                                boundaries.push(
                                    new Boundary({
                                        position: {
                                            x: Boundary.width * i,
                                            y: Boundary.height * j,
                                        },
                                        image: createImage('./img/capTop.png')
                                        
                                    })
                                    );
                                break;
                                
                    case '_':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capBottom.png')
                                
                            })
                            );
                        break;

                    case '[':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capLeft.png')
                                
                            })
                            );
                        break;

                    case ']':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/capRight.png')
                                
                            })
                            );
                        break;

                    case '+':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * i,
                                    y: Boundary.height * j,
                                },
                                image: createImage('./img/pipeCross.png')
                                
                            })
                            );
                        break;

                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: i * Boundary.width + Boundary.width / 2,
                                y: j * Boundary.height + Boundary.height / 2
                            },
                        })
                    )
                    break;

                case 'p':
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: i * Boundary.width + Boundary.width / 2,
                                y: j * Boundary.height + Boundary.height / 2,
                            }
                        })
                    )
                    break;
            }
        }
        )
     }
)