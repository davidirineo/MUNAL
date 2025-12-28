const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = localStorage.getItem("totalCompra") || 0;

carrito.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    listaCarrito.appendChild(li);
});

totalSpan.textContent = total;
