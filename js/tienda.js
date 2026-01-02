const productos =[
    {
        imagen: "img/pro_pluma.jpg",
        nombre: "Pluma",
        descripcion: "Pluma con estampado",
        precio: "20",
        cantidad: "Cantidad 15",
        id: "pluma"
    },
    
    {
        imagen: "img/pro_sombrilla.jpg",
        nombre: "Sombrilla",
        descripcion: "Sombrilla con estampado moderno",
        precio: "80",
        cantidad: "Cantidad 10",
        id: "sombrilla"
    },
    
    {
        imagen: "img/pro_taza.jpg",
        nombre: "Taza",
        descripcion: "Taza personalizada",
        precio: "100",
        cantidad: "Cantidad 5",
        id: "taza"
    },

    {
        imagen: "img/pro_agenda.jpg",
        nombre: "Agenda",
        descripcion: "Agenda con estampas",
        precio: "90",
        cantidad: "Cantidad 20",
        id: "agenda"
    }
]


const c1 = document.querySelector("#c1");

let botonAgregar = document.querySelectorAll(".btnexpo");

function mostrarProductos(){
    productos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
            <img src="${producto.imagen}">
            <p>${producto.nombre}</p>
            <p>${producto.descripcion}</p>
            <p> $ ${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <button class="btnexpo" id="${producto.id}">Agregar</button>
        `;

        c1.append(div);
    })
    
        actualizarProductoAgregar();
        console.log(botonAgregar);

}

mostrarProductos();

function actualizarProductoAgregar(){
    botonAgregar = document.querySelectorAll(".btnexpo");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}
let productosEnCarrito;

const carrito = JSON.parse(localStorage.getItem("productosEnCarritoLS"));

if(carrito){

    productosEnCarrito = carrito;

}else{

    productosEnCarrito = [];

}
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productosEnCarritoLS", JSON.stringify(productosEnCarrito))
}


