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