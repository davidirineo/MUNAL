// compra.js - muestra la última compra guardada en localStorage y la renderiza en CompraRealizada.html
(function(){
    function formatDateISO(iso){
        const d = new Date(iso);
        const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
        return d.getDate() + ' de ' + meses[d.getMonth()];
    }

    function formatDateDMY(iso){
        const d = new Date(iso);
        const pad = (n)=> n.toString().padStart(2,'0');
        return pad(d.getDate()) + '/' + pad(d.getMonth()+1) + '/' + d.getFullYear();
    }

    function calcularFechaLlegada(dias){
        const d = new Date();
        d.setDate(d.getDate() + dias);
        return d.toISOString();
    }

    function renderCompra(compra){
        const compraImage = document.getElementById('compraImage');
        const listaProductos = document.getElementById('listaProductos');
        const estadoCompra = document.getElementById('estadoCompra');
        const fechaLlegada = document.getElementById('fechaLlegada');
        const cantidadProductos = document.getElementById('cantidadProductos');
        const totalCompra = document.getElementById('totalCompra');
        const verMas = document.getElementById('verMasCompra');

        if(!listaProductos) return;

        // limpiar
        listaProductos.innerHTML = '';
        compraImage.innerHTML = '';

        // imagen: si el primer producto tiene img, mostrarla
        if(compra.items && compra.items.length){
            const first = compra.items[0];
            const imgSrc = first.img || first.imagen || first.image || 'img/obra1.jpg';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = first.nombre || 'producto';
            img.style.maxWidth = '220px';
            compraImage.appendChild(img);

            compra.items.forEach(it =>{
                const li = document.createElement('li');
                const qty = it.cantidad || it.qty || 1;
                const precio = (it.precio || 0).toFixed ? ('$' + it.precio.toFixed(2)) : '';
                li.innerHTML = `<strong>${it.nombre || 'Producto'}</strong> &nbsp; x ${qty} ${precio ? ' - ' + precio : ''}`;
                listaProductos.appendChild(li);
            });
        }

        // estado y fecha
        estadoCompra.textContent = compra.estado || 'En camino';
        const fechaISO = compra.fechaLlegada || calcularFechaLlegada(3);
        fechaLlegada.textContent = (compra.estado && compra.estado.toLowerCase().includes('entreg') ? 'Llegó el ' : 'Llegará el ') + formatDateISO(fechaISO);

        // mostrar fecha de la compra en formato DD/MM/AAAA si existe
        const fechaCompraEl = document.getElementById('fechaCompra');
        if(fechaCompraEl) fechaCompraEl.textContent = compra.fecha ? formatDateDMY(compra.fecha) : formatDateDMY(new Date().toISOString());

        // cantidad total
        const cantidadTotal = compra.items ? compra.items.reduce((s,i)=> s + (i.cantidad||i.qty||1), 0) : 0;
        cantidadProductos.textContent = cantidadTotal + (cantidadTotal === 1 ? ' producto' : ' productos');

        // total
        totalCompra.textContent = 'Total: $' + (compra.total ? parseFloat(compra.total).toFixed(2) : '0.00');

        // Ver más -> por ahora lleva a tienda
        if(verMas) verMas.addEventListener('click', ()=>{ window.location.href = 'Tienda.html'; });
    }

    // cargar compra guardada
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
    if(ultimaCompra){
        renderCompra(ultimaCompra);
    } else {
        // si no hay ultimaCompra intentar con carrito
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if(carrito.length){
            const total = carrito.reduce((s,p)=> s + ((p.precio||0) * (p.cantidad||p.qty||1)), 0);
            const compra = {
                fecha: new Date().toISOString(),
                items: carrito,
                total: total,
                estado: 'En camino',
                fechaLlegada: calcularFechaLlegada(3)
            };
            renderCompra(compra);
        } else {
            // no hay nada: mostrar mensaje
            const mensaje = document.getElementById('mensajeGracias');
            if(mensaje) mensaje.textContent = 'No se encontró ninguna compra reciente.';
            const cont = document.querySelector('.compraOuter');
            if(cont) cont.style.display = 'none';
        }
    }
})();