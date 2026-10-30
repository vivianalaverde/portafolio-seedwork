// ===============================
// Footer - Año automático
// ===============================

const anio = document.getElementById("anio");

if (anio) {
    anio.textContent = new Date().getFullYear();
}

// ===============================
// Carrusel de imágenes
// ===============================

const imagenes = document.querySelectorAll(".carrusel img");
const btnAnterior = document.querySelector(".anterior");
const btnSiguiente = document.querySelector(".siguiente");

let indiceActual = 0;

function mostrarImagen(indice) {
    imagenes.forEach((img) => {
        img.classList.remove("activa");
    });

    imagenes[indice].classList.add("activa");
}

function siguienteImagen() {
    indiceActual++;

    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    mostrarImagen(indiceActual);
}

function anteriorImagen() {
    indiceActual--;

    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }

    mostrarImagen(indiceActual);
}

if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => { siguienteImagen(); reiniciarAuto(); });
}

if (btnAnterior) {
    btnAnterior.addEventListener("click", () => { anteriorImagen(); reiniciarAuto(); });
}

// Cambio automático cada 5 segundos (se pausa al pasar el mouse)
let temporizador = setInterval(siguienteImagen, 5000);

function reiniciarAuto() {
    clearInterval(temporizador);
    temporizador = setInterval(siguienteImagen, 5000);
}

const carrusel = document.querySelector(".carrusel");

if (carrusel) {
    carrusel.addEventListener("mouseenter", () => clearInterval(temporizador));
    carrusel.addEventListener("mouseleave", reiniciarAuto);
}

// ===============================
// Modo oscuro
// ===============================

// Crear botón dinámicamente
const menu = document.querySelector(".menu");

if (menu) {
    const botonTema = document.createElement("button");

    botonTema.id = "tema";
    botonTema.innerHTML = "☾";
    botonTema.setAttribute("aria-label", "Cambiar tema");

    menu.appendChild(botonTema);

    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        botonTema.innerHTML = "☀";
    }

    botonTema.addEventListener("click", () => {
        const oscuro =
            document.documentElement.getAttribute("data-theme") === "dark";

        if (oscuro) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("tema", "light");
            botonTema.innerHTML = "☾";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("tema", "dark");
            botonTema.innerHTML = "☀";
        }
    });
}

// ===============================
// Navegación con teclado
// ===============================

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        siguienteImagen();
        reiniciarAuto();
    }

    if (e.key === "ArrowLeft") {
        anteriorImagen();
        reiniciarAuto();
    }
});