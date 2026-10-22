
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

let intervaloSerpiente;
let direccionActual = "derecha";
let comida = null;
let puntaje = 0;

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

function pintarParte(lineaX, lineaY, color) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    pintarParte(serpiente[i].x, serpiente[i].y, "red");
  }

  let cabeza = serpiente[0];

  let x = cabeza.x * TAMANIO_CELDA;
  let y = cabeza.y * TAMANIO_CELDA;

  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function moverDerecha() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function moverSerpiente() {
  if (direccionActual == "derecha") {
    moverDerecha();
  }

  if (direccionActual == "izquierda") {
    moverIzquierda();
  }

  if (direccionActual == "arriba") {
    moverArriba();
  }

  if (direccionActual == "abajo") {
    moverAbajo();
  }

  if (atrapaComida() == true) {
    puntaje = puntaje + 1;
    document.getElementById("puntaje").innerText = puntaje;

    let cola = serpiente[serpiente.length - 1];
    let nuevaParte;

    if (direccionActual == "derecha") {
      nuevaParte = {
        x: cola.x - 1,
        y: cola.y
      };
    }
    if (direccionActual == "izquierda") {
      nuevaParte = {
        x: cola.x + 1,
        y: cola.y
      };
    }
    if (direccionActual == "arriba") {
      nuevaParte = {
        x: cola.x,
        y: cola.y + 1
      };
    }
    if (direccionActual == "abajo") {
      nuevaParte = {
        x: cola.x,
        y: cola.y - 1
      };
    }
    serpiente.push(nuevaParte);

    comida = null;
  }

  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}
function iniciarJuego() {
  intervaloSerpiente = setInterval(moverSerpiente, 1000);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
}

function pintarComida() {
  if (comida == null) {
    let columnas = canvas.width / TAMANIO_CELDA;
    let filas = canvas.height / TAMANIO_CELDA;

    comida = {
      x: Math.floor(Math.random() * columnas),
      y: Math.floor(Math.random() * filas)
    };
  }

  pintarParte(comida.x, comida.y, "lime");
}

function atrapaComida() {
  let cabeza = serpiente[0];

  if (cabeza.x == comida.x && cabeza.y == comida.y) {
    return true;
  } else {
    return false;
  }
}