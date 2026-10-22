
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  {x:0, y:10},
  {x:0, y:9},
  {x:0, y:8},
  {x:0, y:7},
  {x:0, y:6}
];




// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "#334155";

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    pintarParte(serpiente[i].x, serpiente[i].y);
  }

  let cabeza = serpiente[0];

  let x = cabeza.x * TAMANIO_CELDA;
  let y = cabeza.y * TAMANIO_CELDA;

  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}