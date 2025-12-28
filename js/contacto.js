// js/formulario.js

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector(".formContacto");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = formulario.querySelector('input[type="text"]');
        const correo = formulario.querySelector('input[type="email"]');
        const telefono = formulario.querySelector('input[type="tel"]');
        const edad = formulario.querySelector('input[type="number"]');
        const genero = formulario.querySelector('select');
        const asunto = formulario.querySelectorAll('input[type="text"]')[1];
        const comentarios = formulario.querySelector('textarea');

        // Validar campos obligatorios
        if (
            nombre.value.trim() === "" ||
            correo.value.trim() === "" ||
            telefono.value.trim() === "" ||
            edad.value.trim() === "" ||
            genero.value === "" ||
            asunto.value.trim() === ""
        ) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        // Validar edad
        if (edad.value < 1 || edad.value > 120) {
            alert("Ingresa una edad válida.");
            return;
        }

        // Validación básica de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        alert("Mensaje enviado correctamente. Gracias por contactarnos.");

        formulario.reset();
    });

});

