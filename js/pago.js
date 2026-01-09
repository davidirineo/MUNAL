let carrito = JSON.parse(localStorage.getItem("productosEnCarritoLS")) || [];
const formPago = document.getElementById("formPago");

const contenedorCarrito = document.querySelector(".contenedorCarrito");
const contenedorCarritoVacio = document.querySelector(".contenedorCarritoVacio");
const totalEl = document.querySelector("#total");

function cargarProductosCarrito(){

    
        contenedorCarrito.innerHTML = "";
    if(carrito && carrito.length > 0){

        carrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("fondoProductoPA");
            div.innerHTML = 
            `
            <div class="pImagen">
                    <img src="${producto.imagen}" alt="sombrilla" width="233px" height="155px">
                    <p>${producto.descripcion}</p>
                </div>
                <div class="pPrecio">
                    <p>Precio</p><br><br><br>
                    <p class="precio">${producto.precio}</p>
                </div>
                <div class="pCantidad">
                    <p>Cantidad</p><br><br><br>
                    <p class="cantidad">${producto.cantidad}</p>
                </div>
                <div class="pSubtotal">
                    <p>Subtotal</p> <br><br><br>
                    <p class="total">${producto.precio * producto.cantidad}</p>
                </div>
              
            `
            contenedorCarrito.append(div)
        });
    }else{
        contenedorCarritoVacio.innerHTML = 
        `
            <h2>Carrito vacio :(</h2>
            
        `
    }
    
    actualizaTotal()
}

cargarProductosCarrito();

    function actualizaTotal(){
        const suma = carrito.reduce((acc, producto) => acc + ((producto.precio || 0) * (producto.cantidad || producto.qty || 1)), 0);
        if(totalEl) totalEl.textContent = suma.toFixed(2);
        return suma;
    }

// cuando se envía el formulario de pago, guardamos la compra como 'ultimaCompra'
if(formPago){
    formPago.addEventListener('submit', (e)=>{
        e.preventDefault();
        const fechaCompra = new Date().toISOString();
        const cantidad = carrito.reduce((s,p)=> s + (p.cantidad||p.qty||1), 0);
        const totalAmount = actualizaTotal();
        const compra = {
            fecha: fechaCompra,
            items: carrito,
            total: totalAmount,
            estado: 'En camino',
            fechaLlegada: (function(){ const d = new Date(); d.setDate(d.getDate()+3); return d.toISOString(); })(),
            cantidad: cantidad
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
        // opcional: vaciar carrito
        localStorage.removeItem('productosEnCarritoLS');
        
         // redirigir a la página de compra realizada
        window.location.href = 'CompraRealizada.html';
    });
}