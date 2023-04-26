let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let fondo = new Image();

fondo.src = './assets/background.webp';
console.log(fondo);
fondo.onload = () => {
    ctx.drawImage(fondo,0,0)
}