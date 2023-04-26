let canvas = document.querySelector('canvas');
let frame = 0;
let ctx = canvas.getContext('2d');
let fondo = new Image();
fondo.src = '../assets/back2.png';
let personaje = new Image();
personaje.src = '../assets/ball-quiet.png';
const gravedad = 02;
// Creo la clase que se encargará de el background
class Sprite {
    constructor(recurso) {
        this.lastKey
        this.image = new Image()
        this.image.src = recurso
    }
    draw() {
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    }
    update() {
        this.draw();
    }
}
// Creo la clase que se encarga del jugador
class Player {
    constructor({ position, velocidad, dimensiones, cropbox }) {
        this.position = position;
        this.velocidad = velocidad;
        this.dimensiones = dimensiones;
        this.lastKey;
        this.cropbox = cropbox;
        this.buffer = 0;
        this.elapsed = 4;
    }
    draw() {
        this.buffer++
        let imageFrame = 0
        if (frame === 0) {
            imageFrame = 0
            
        } else if(frame === 1) {
            imageFrame = 96
            
        } else {
            imageFrame = 192
            
        }
        if(this.buffer % this.elapsed === 0) {
            // const element = array[i];
            // 
            if (frame === 2) {
                frame = 0;
            } else {
                frame += 1;
    
            }

        }
        // for (let i = 0; i < 3; i++) {
        // }
        console.log(frame);
        // ctx.drawImage(personaje, this.cropbox.x, this.cropbox.y, this.cropbox.width, this.cropbox.height, this.position.x, this.position.y, this.dimensiones.ancho, this.dimensiones.alto);
        ctx.drawImage(personaje, imageFrame, 0, 96, 96, this.position.x, this.position.y, this.dimensiones.ancho, this.dimensiones.alto);
    }
    update() {
        this.draw();
        this.position.y += this.velocidad.y;
        this.position.x += this.velocidad.x;
        if (this.position.y + this.dimensiones.alto + this.velocidad.y >= canvas.height - 60) {
            this.velocidad.y = 0;
        } else {
            this.velocidad.y += gravedad;
        }
        if (this.position.x + this.dimensiones.ancho >= canvas.width) {
            this.velocidad.x = 0;
        }
    }

}
class Textos {
    constructor(texto, { posiciones }) {
        this.texto = texto
        this.posiciones = posiciones
    }
    draw() {

    }
}

// Creo el objeto jugador
const player = new Player(
    {
        position: {
            x: 0,
            y: 0
        },
        velocidad: {
            x: 0,
            y: 0
        },
        dimensiones: {
            ancho: 288 / 3,
            alto: 96
        },
        cropbox: {
            x: 16,
            y: 16,
            with: 64,
            height: 64
        }
    }
)
const background = new Sprite(fondo.src);
// Genero las teclas que voy a usar para el juego
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
// Genero el loop de animación.
function animar() {
    window.requestAnimationFrame(animar)
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height)
    background.update();
    player.update();
    // Establezco una velocidad de 0 por defecto, posteriormente detecto si alguna de las dos teclas es presionada para asignar velocidad positiva o negativa dada la dirección requerida.
    player.velocidad.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocidad.x = -5;

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocidad.x = 5;

    }
}
animar();

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case 'w':
            if (player.velocidad.y === 0) player.velocidad.y = -20;
            // player.velocidad.y = -15;
            break
        default:
            break;
    }
})
window.addEventListener('keyup', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;

        default:
            break;
    }
    // if (e.code === 'ArrowUp')
})