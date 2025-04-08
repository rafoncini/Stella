let carrito = [];
let prendaActual = null;
let total = 0;

// Variables para el carrusel
let currentImageIndex = 0;
const images = document.querySelectorAll('.header-img img');

// Variables globales del carrito
let carritoVisible = false;

// Funciones del Carrito
function inicializarCarrito() {
    cargarCarrito();
    actualizarContadorCarrito();
    configurarEventosCarrito();
}

function configurarEventosCarrito() {
    // Evento para abrir/cerrar el carrito
    const carritoContainer = document.getElementById('carrito-container');
    const cerrarCarritoBtn = document.querySelector('.cerrar-carrito');
    const overlay = document.querySelector('.overlay');
    const carritoPanel = document.getElementById('carrito-panel');

    if (carritoContainer) {
        carritoContainer.addEventListener('click', toggleCarrito);
    }

    if (cerrarCarritoBtn) {
        cerrarCarritoBtn.addEventListener('click', cerrarCarrito);
    }

    if (overlay) {
        overlay.addEventListener('click', cerrarCarrito);
    }

    if (carritoPanel) {
        carritoPanel.addEventListener('click', (e) => e.stopPropagation());
    }
}

function toggleCarrito() {
    const carritoElement = document.getElementById('carrito');
    const overlay = document.querySelector('.overlay');
    
    if (carritoElement && overlay) {
        if (!carritoVisible) {
            carritoElement.classList.add('abierto');
            overlay.classList.add('active');
            carritoVisible = true;
            actualizarCarritoUI();
        } else {
            cerrarCarrito();
        }
    } else {
        console.error('Elementos del carrito no encontrados');
    }
}

function cerrarCarrito() {
    console.log('Cerrando carrito');
    const carritoElement = document.getElementById('carrito');
    const overlay = document.querySelector('.overlay');
    
    if (carritoElement && overlay) {
        carritoElement.classList.remove('abierto');
        overlay.classList.remove('active');
        carritoVisible = false;
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarritoUI();
    }
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-count');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function agregarAlCarrito(nombre, precio, imagenSrc) {
    console.log('Agregando al carrito:', nombre, precio, imagenSrc);
    
    const producto = {
        nombre: nombre,
        precio: parseFloat(precio),
        cantidad: 1,
        imagen: imagenSrc,
        total: parseFloat(precio)
    };

    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
        productoExistente.total = productoExistente.cantidad * productoExistente.precio;
    } else {
        carrito.push(producto);
    }

    guardarCarrito();
    actualizarCarritoUI();
    mostrarNotificacion('Producto agregado al carrito');
}

function actualizarCarritoUI() {
    console.log('Actualizando carrito UI');
    const tbody = document.querySelector('#lista-carrito tbody');
    const totalElement = document.getElementById('total-carrito');
    
    if (!tbody || !totalElement) {
        console.error('Elementos del carrito no encontrados');
        return;
    }
    
    tbody.innerHTML = '';
    total = 0;

    carrito.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="producto-carrito">
                <img src="${item.imagen}" alt="${item.nombre}" class="imagen-carrito">
                <span>${item.nombre}</span>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
            </td>
            <td>$${item.total.toFixed(2)}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">&times;</button>
            </td>
        `;
        tbody.appendChild(tr);
        total += item.total;
    });

    totalElement.textContent = `$${total.toFixed(2)}`;
    actualizarContadorCarrito();
}

function cambiarCantidad(nombre, cambio) {
    console.log('Cambiando cantidad:', nombre, cambio);
    const producto = carrito.find(item => item.nombre === nombre);
    
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(nombre);
        } else {
            producto.total = producto.cantidad * producto.precio;
            guardarCarrito();
            actualizarCarritoUI();
        }
    }
}

function eliminarDelCarrito(nombre) {
    console.log('Eliminando del carrito:', nombre);
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarCarritoUI();
    mostrarNotificacion('Producto eliminado del carrito');
}

function mostrarCarrito() {
    console.log('Mostrando carrito');
    const carritoElement = document.getElementById('carrito');
    const overlay = document.querySelector('.overlay');
    
    if (carritoElement && overlay) {
        carritoElement.classList.add('abierto');
        overlay.classList.add('active');
        carritoVisible = true;
        actualizarCarritoUI();
    } else {
        console.error('Elementos del carrito no encontrados');
    }
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add('mostrar');
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 2000);
    }, 100);
}

// Funciones de Personalización
function toggleSelectorPrenda() {
    const selectorJoya = document.getElementById("selector-joya");
    if (selectorJoya) {
        if (selectorJoya.style.display === "block") {
            selectorJoya.style.display = "none";
        } else {
            selectorJoya.style.display = "block";
        }
    }
}

function seleccionarJoya(joya) {
    joyaActual = joya;
    const modalPersonalizar = document.getElementById("modal-personalizar");
    const selectorJoya = document.getElementById("selector-joya");
    
    if (modalPersonalizar) {
        modalPersonalizar.style.display = "block";
        if (selectorJoya) {
            selectorJoya.style.display = "none";
        }
    }
}

function cerrarModalPersonalizar() {
    const modalPersonalizar = document.getElementById("modal-personalizar");
    if (modalPersonalizar) {
        modalPersonalizar.style.display = "none";
    }
}

function agregarJoyaPersonalizadaAlCarrito() {
    const textoPersonalizado = document.getElementById("texto-personalizado").value;
    if (!textoPersonalizado) {
        alert("Por favor, ingrese el texto para la dedicatoria");
        return;
    }

    if (joyaActual) {
        const joyaPersonalizada = {
            ...joyaActual,
            texto: textoPersonalizado,
            precio: joyaActual.precio + 10
        };
        agregarAlCarrito(joyaPersonalizada.nombre, joyaPersonalizada.precio, joyaPersonalizada.imagen);
        cerrarModalPersonalizar();
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
        mostrarNotificacion('El carrito está vacío');
        return;
    }

    cerrarCarrito();
    const modalCheckout = document.getElementById('modal-checkout');
    if (modalCheckout) {
        modalCheckout.style.display = 'block';
        actualizarResumenCheckout();
    }
}

function cerrarCheckout() {
    document.getElementById("modal-checkout").style.display = "none";
}

function actualizarResumenCheckout() {
    const resumenProductos = document.getElementById('resumen-productos');
    const totalCheckout = document.getElementById('total-checkout');
    
    if (!resumenProductos || !totalCheckout) return;
    
    resumenProductos.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;

        const productoElement = document.createElement('div');
        productoElement.className = 'producto-resumen';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <p>${producto.nombre}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
                <p>Subtotal: $${totalProducto.toFixed(2)}</p>
            </div>
        `;
        resumenProductos.appendChild(productoElement);
    });

    totalCheckout.textContent = `$${total.toFixed(2)}`;
}

function procesarPedido(event) {
    event.preventDefault();
    console.log('Procesando pedido');

    // Validar que hay productos en el carrito
    if (carrito.length === 0) {
        mostrarNotificacion('No hay productos en el carrito');
        return false;
    }

    // Obtener los datos del formulario
    const form = document.getElementById('checkout-form');
    if (!form) {
        console.error('No se encontró el formulario de checkout');
        return false;
    }

    // Aquí normalmente enviarías los datos a un servidor
    alert('¡Gracias por tu compra! Te enviaremos un correo con los detalles.');
    
    // Limpiar el carrito
    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
    actualizarContadorCarrito();
    
    // Cerrar el modal de checkout
    const modalCheckout = document.getElementById('modal-checkout');
    if (modalCheckout) {
        modalCheckout.style.display = 'none';
    }

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
        document.body.style.overflow = 'auto';
    }
    if (event.target.id === 'modal-personalizar') {
        cerrarModalPersonalizar();
    }
}

// Función para inicializar el carrusel
function inicializarCarrusel() {
    if (images.length === 0) return;
    
    // Asegurarse de que la primera imagen esté activa
    images[0].classList.add('active');
    currentImageIndex = 0;
}

// Función para cambiar la imagen manualmente
function cambiarImagen(direction) {
    if (images.length === 0) return;
    
    // Remover la clase active de la imagen actual
    images[currentImageIndex].classList.remove('active');
    
    // Calcular el nuevo índice
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    
    // Agregar la clase active a la nueva imagen
    images[currentImageIndex].classList.add('active');
}

// Función para cambiar la imagen automáticamente
function cambiarImagenAutomatica() {
    cambiarImagen(1);
}

// Iniciar el carrusel automático
let intervaloAutomatico = setInterval(cambiarImagenAutomatica, 4000);

// Detener el carrusel automático cuando el usuario interactúa con los botones
document.querySelectorAll('.carrusel-control').forEach(button => {
    button.addEventListener('mouseenter', () => {
        clearInterval(intervaloAutomatico);
    });
    
    button.addEventListener('mouseleave', () => {
        intervaloAutomatico = setInterval(cambiarImagenAutomatica, 4000);
    });
});

// Inicializar el carrusel cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado, inicializando carrito');
    inicializarCarrusel();
    cargarCarrito();
    actualizarContadorCarrito();
    
    // Asegurarse de que el carrito esté cerrado al inicio
    const carritoElement = document.getElementById('carrito');
    const overlay = document.querySelector('.overlay');
    if (carritoElement && overlay) {
        carritoElement.classList.remove('abierto');
        overlay.classList.remove('active');
    }
    
    // Evento para abrir el carrito
    const btnAbrirCarrito = document.getElementById('carrito-container');
    if (btnAbrirCarrito) {
        btnAbrirCarrito.addEventListener('click', mostrarCarrito);
    }
    
    // Evento para cerrar el carrito con el botón X
    const btnCerrarCarrito = document.querySelector('.btn-cerrar-carrito');
    if (btnCerrarCarrito) {
        btnCerrarCarrito.addEventListener('click', cerrarCarrito);
    }
    
    // Cerrar carrito al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', cerrarCarrito);
    }
    
    // Prevenir que los clics dentro del carrito cierren el carrito
    if (carritoElement) {
        carritoElement.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

// Funciones para los modales de historia y compromiso
function abrirModalHistoria() {
    const modal = document.getElementById('modal-historia');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function abrirModalCompromiso() {
    const modal = document.getElementById('modal-compromiso');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}