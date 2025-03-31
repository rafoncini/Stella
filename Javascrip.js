let carrito = [];
let prendaActual = null;

// Variables para el carrusel
let currentImageIndex = 0;
const images = document.querySelectorAll('.header-img img');

// Funciones del Carrito
function guardarCarrito() {
    try {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
    }
    actualizarContadorCarrito();
}

function cargarCarrito() {
    try {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCarrito();
            actualizarContadorCarrito();
        }
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
    }
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("carrito-count");
    if (!contador) {
        console.error("No se encontró el contador del carrito");
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
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
    const tbody = document.querySelector("#lista-carrito tbody");
    const totalElement = document.getElementById("total-carrito");
    
    if (!tbody || !totalElement) {
        console.error("No se encontraron los elementos del carrito");
        return;
    }

    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: contain;">
                    <span>${item.nombre}</span>
                </div>
            </td>
            <td>$${item.precio}</td>
            <td>
                <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                ${item.cantidad}
                <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
            </td>
            <td>$${item.precio * item.cantidad}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">×</button>
            </td>
        `;
        tbody.appendChild(tr);
        total += item.precio * item.cantidad;
    });

    totalElement.textContent = `$${total}`;
    guardarCarrito();
}

function cambiarCantidad(index, cambio) {
    if (index < 0 || index >= carrito.length) {
        console.error("Índice de carrito inválido");
        return;
    }
    
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad < 1) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
    if (index < 0 || index >= carrito.length) {
        console.error("Índice de carrito inválido");
        return;
    }
    
    carrito.splice(index, 1);
    actualizarCarrito();
    actualizarContadorCarrito();
}

function mostrarCarrito() {
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("No se encontró el elemento del carrito");
        return;
    }
    carrito.classList.add("abierto");
    actualizarCarrito();
}

function cerrarCarrito() {
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("No se encontró el elemento del carrito");
        return;
    }
    carrito.classList.remove("abierto");
}

// Funciones de Personalización
function toggleSelectorPrenda() {
    const selectorPrenda = document.getElementById("selector-prenda");
    if (selectorPrenda) {
        if (selectorPrenda.style.display === "block") {
            selectorPrenda.style.display = "none";
        } else {
            selectorPrenda.style.display = "block";
        }
    } else {
        console.error("No se encontró el selector de prendas");
    }
}

function seleccionarPrenda(prenda) {
    prendaActual = prenda;
    const modalPersonalizar = document.getElementById("modal-personalizar");
    const inputTexto = document.getElementById("input-texto");
    const selectorPrenda = document.getElementById("selector-prenda");
    
    if (modalPersonalizar && inputTexto) {
        modalPersonalizar.style.display = "block";
        inputTexto.style.display = "block";
        // Cerrar el selector de prendas
        if (selectorPrenda) {
            selectorPrenda.style.display = "none";
        }
    } else {
        console.error("No se encontraron los elementos necesarios para la personalización");
    }
}

function agregarPrendaAlCarrito() {
    const textoPersonalizado = document.getElementById("texto-personalizado").value;
    if (!textoPersonalizado) {
        alert("Por favor, ingrese el texto para personalizar");
        return;
    }

    if (prendaActual) {
        const prendaPersonalizada = {
            ...prendaActual,
            texto: textoPersonalizado,
            precio: prendaActual.precio + 10
        };
        agregarAlCarrito(prendaPersonalizada);
        cerrarModalPersonalizar();
    }
}

function cerrarModalPersonalizar() {
    const modalPersonalizar = document.getElementById("modal-personalizar");
    const inputTexto = document.getElementById("input-texto");
    if (modalPersonalizar && inputTexto) {
        modalPersonalizar.style.display = "none";
        inputTexto.style.display = "none";
    }
}

// Funciones de Venta de Prendas
function mostrarFormularioVenta() {
    const modalVenta = document.getElementById("modal-venta");
    if (modalVenta) {
        modalVenta.style.display = "block";
    } else {
        console.error("No se encontró el modal de venta");
    }
}

function cerrarFormularioVenta() {
    const modalVenta = document.getElementById("modal-venta");
    if (modalVenta) {
        modalVenta.style.display = "none";
    }
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
    if (event.target.id === 'modal-personalizar') {
        cerrarModalPersonalizar();
    }
}

// Funciones para el carrusel de imágenes
function cambiarImagenManual(direction) {
    // Remover la clase active de la imagen actual
    images[currentImageIndex].classList.remove('active');
    
    // Calcular el nuevo índice
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    
    // Agregar la clase active a la nueva imagen
    images[currentImageIndex].classList.add('active');
}

// Función para cambiar la imagen automáticamente
function cambiarImagenAutomatica() {
    cambiarImagenManual(1);
}

// Iniciar el carrusel automático
setInterval(cambiarImagenAutomatica, 5000);

// Inicializar el carrusel cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrusel();
    cargarCarrito();
    actualizarContadorCarrito();
    
    // Cerrar modales al hacer clic fuera
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
        if (event.target.id === 'modal-personalizar') {
            cerrarModalPersonalizar();
        }
    }
});