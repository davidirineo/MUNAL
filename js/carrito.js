let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");

function mostrarCarrito() {
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio.toFixed(2)}</span>
        `;
        lista.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);

    localStorage.setItem("totalCompra", total.toFixed(2));
}

mostrarCarrito();
