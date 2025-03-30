let carrito = [];
let prendaActual = null;

// Funciones del Carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
        actualizarContadorCarrito();
    }
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("carrito-count");
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contador.textContent = totalItems;
}

function agregarAlCarrito(nombre, imagen, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, imagen, precio, cantidad: 1 });
    }
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.querySelector("#lista-carrito tbody");
    listaCarrito.innerHTML = "";
    let totalCarrito = 0;

    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        const totalProducto = producto.precio * producto.cantidad;
        totalCarrito += totalProducto;

        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${index}, -1)" class="btn-cantidad">-</button>
                ${producto.cantidad}
                <button onclick="cambiarCantidad(${index}, 1)" class="btn-cantidad">+</button>
            </td>
            <td>$${totalProducto}</td>
            <td><button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">X</button></td>
        `;
        listaCarrito.appendChild(fila);
    });

    document.getElementById("total-carrito").textContent = `$${totalCarrito}`;
}

function cambiarCantidad(index, cambio) {
    if (carrito[index].cantidad + cambio > 0) {
        carrito[index].cantidad += cambio;
        actualizarCarrito();
        guardarCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.classList.add("abierto");
}

function cerrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.classList.remove("abierto");
}

// Funciones de Personalización
function toggleSelectorPrenda() {
    const selectorPrenda = document.getElementById("selector-prenda");
    selectorPrenda.style.display = selectorPrenda.style.display === "block" ? "none" : "block";
}

function seleccionarPrenda(nombre, imagen) {
    prendaActual = { nombre, imagen };
    document.getElementById("modal-personalizar").style.display = "block";
}

function cerrarPersonalizar() {
    document.getElementById("modal-personalizar").style.display = "none";
    document.getElementById("texto-personalizado").value = "";
}

function agregarPrendaAlCarrito() {
    if (!prendaActual) return;
    
    const texto = document.getElementById("texto-personalizado").value.trim();
    if (!texto) {
        alert("Por favor, ingresa el texto para personalizar");
        return;
    }

    const nombrePersonalizado = `${prendaActual.nombre} - ${texto}`;
    agregarAlCarrito(nombrePersonalizado, prendaActual.imagen, 500);
    cerrarPersonalizar();
}

// Funciones de Venta de Prendas
function mostrarFormularioVenta() {
    document.getElementById("modal-venta").style.display = "block";
}

function cerrarFormularioVenta() {
    document.getElementById("modal-venta").style.display = "none";
}

function procesarVenta(event) {
    event.preventDefault();
    
    // Aquí iría la lógica para procesar la venta
    alert("¡Gracias! Tu prenda ha sido enviada para revisión. Te contactaremos pronto.");
    cerrarFormularioVenta();
    event.target.reset();
    
    return false;
}

// Funciones del Checkout
function mostrarCheckout() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    document.getElementById("modal-checkout").style.display = "block";
    actualizarResumenCheckout();
}

function cerrarCheckout() {
    document.getElementById("modal-checkout").style.display = "none";
}

function actualizarResumenCheckout() {
    const resumenProductos = document.getElementById("resumen-productos");
    const totalCheckout = document.getElementById("total-checkout");
    resumenProductos.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;

        const productoElement = document.createElement("div");
        productoElement.className = "producto-resumen";
        productoElement.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen}" width="50" alt="${producto.nombre}">
                <div>
                    <p>${producto.nombre}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>$${totalProducto}</p>
                </div>
            </div>
        `;
        resumenProductos.appendChild(productoElement);
    });

    totalCheckout.textContent = `$${total}`;
}

function procesarPedido(event) {
    event.preventDefault();
    
    // Aquí iría la lógica para procesar el pago
    alert("¡Gracias por tu compra! Te enviaremos un correo con los detalles de tu pedido.");
    
    // Limpiar el carrito
    carrito = [];
    actualizarCarrito();
    guardarCarrito();
    cerrarCheckout();
    
    return false;
}

// Manejar cambio de método de pago
document.querySelectorAll('input[name="pago"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const datosTarjeta = document.getElementById('datos-tarjeta');
        datosTarjeta.style.display = this.value === 'tarjeta' ? 'block' : 'none';
    });
});

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Funciones para el carrusel de imágenes
let carruselInterval;
let imagenActual = 0;

function cambiarImagenManual(direccion) {
    const imagenes = document.querySelectorAll('.header-img img');
    
    // Remover la clase active de todas las imágenes
    imagenes.forEach(img => img.classList.remove('active'));
    
    // Actualizar el índice
    imagenActual = (imagenActual + direccion + imagenes.length) % imagenes.length;
    
    // Agregar la clase active a la imagen actual
    imagenes[imagenActual].classList.add('active');
    
    // Reiniciar el intervalo
    if (carruselInterval) {
        clearInterval(carruselInterval);
    }
    carruselInterval = setInterval(cambiarImagenAutomatica, 5000);
}

function cambiarImagenAutomatica() {
    cambiarImagenManual(1);
}

function inicializarCarrusel() {
    const imagenes = document.querySelectorAll('.header-img img');
    imagenActual = 0;

    // Mostrar la primera imagen
    imagenes[0].classList.add('active');

    // Detener cualquier intervalo existente
    if (carruselInterval) {
        clearInterval(carruselInterval);
    }

    // Iniciar el intervalo automático
    carruselInterval = setInterval(cambiarImagenAutomatica, 5000);
}

// Inicializar el carrusel cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrusel();
    cargarCarrito();
});