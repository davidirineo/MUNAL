let carrito = JSON.parse(localStorage.getItem("productosEnCarritoLS"));

const contenedorCarrito = document.querySelector(".contenedorCarrito");
const contenedorCarritoVacio = document.querySelector(".contenedorCarritoVacio");
let botonEliminar = document.querySelectorAll(".carritoEliminar");
const total = document.querySelector("#total");

function cargarProductosCarrito(){

    
        contenedorCarrito.innerHTML = "";
    if(carrito && carrito.length > 0){

        carrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("fondoProductoCA");
            div.innerHTML = 
            `
            <div class="cImagen">
                    <img src="${producto.imagen}" alt="sombrilla" width="233px" height="155px">
                    <p>${producto.descripcion}</p>
                </div>
                <div class="cPrecio">
                    <p>Precio</p><br><br><br>
                    <p class="precio">${producto.precio}</p>
                </div>
                <div class="cCantidad">
                    <p>Cantidad</p><br><br><br>
                    <p class="cantidad">${producto.cantidad}</p>
                </div>
                <div class="cSubtotal">
                    <p>Subtotal</p> <br><br><br>
                    <p class="total">${producto.precio * producto.cantidad}</p>
                </div>
                <div class="cBorrar">
                    <button class="carritoEliminar" id="${producto.id}"><img src="img/iBorrar.png" alt="Borrar" width="30px" height="30px"></button>
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
    
    actualizarBotonesEliminar();
    actualizaTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonEliminar = document.querySelectorAll(".carritoEliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    })
}

function eliminarProducto(e){
    const idBoton = e.currentTarget.id;
    const productoEliminado = carrito.findIndex(producto => producto.id === idBoton);

    carrito.splice(productoEliminado, 1);

    cargarProductosCarrito();

    localStorage.setItem("productosEnCarritoLS", JSON.stringify(carrito));
}

function actualizaTotal(){
    total.innerHTML = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}
/*const lista = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");

function mostrarCarrito() {
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
        `;
        lista.appendChild(li);
    });

    totalSpan.textContent = total;

    localStorage.setItem("totalCompra", total.toFixed(2));
}

mostrarCarrito();
*/