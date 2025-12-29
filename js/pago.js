const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const formPago = document.getElementById("formPago");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = parseFloat(localStorage.getItem("totalCompra")) || 0;

function renderResumen(){
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const qty = producto.cantidad || producto.qty || 1;
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x ${qty} - $${(producto.precio * qty).toFixed(2)}`;
        listaCarrito.appendChild(li);
    });
    totalSpan.textContent = total.toFixed(2);
}

renderResumen();

// cuando se envía el formulario de pago, guardamos la compra como 'ultimaCompra'
if(formPago){
    formPago.addEventListener('submit', (e)=>{
        e.preventDefault();
        const fechaCompra = new Date().toISOString();
        const cantidad = carrito.reduce((s,p)=> s + (p.cantidad||p.qty||1), 0);
        const compra = {
            fecha: fechaCompra,
            items: carrito,
            total: total,
            estado: 'En camino',
            fechaLlegada: (function(){ const d = new Date(); d.setDate(d.getDate()+3); return d.toISOString(); })(),
            cantidad: cantidad
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
        // opcional: vaciar carrito
        localStorage.removeItem('carrito');
        localStorage.removeItem('totalCompra');
        // redirigir a la página de compra realizada
        window.location.href = 'CompraRealizada.html';
    });
}
