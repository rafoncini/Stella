let carrito = [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
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
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                ${producto.cantidad}
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </td>
            <td>$${totalProducto}</td>
            <td><button onclick="eliminarDelCarrito(${index})">X</button></td>
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
    carritoDiv.classList.toggle("abierto");
}

function toggleSelectorPrenda() {
    document.getElementById("selector-prenda").style.display = "block";
}

function seleccionarPrenda(nombre, imagen) {
    document.getElementById("input-texto").style.display = "block";
    document.getElementById("input-texto").dataset.nombre = nombre;
    document.getElementById("input-texto").dataset.imagen = imagen;
}

function agregarPrendaAlCarrito() {
    const nombre = document.getElementById("input-texto").dataset.nombre;
    const imagen = document.getElementById("input-texto").dataset.imagen;
    const texto = document.getElementById("texto-personalizado").value;
    const precio = 500;
    agregarAlCarrito(`${nombre} - ${texto}`, imagen, precio);
    document.getElementById("selector-prenda").style.display = "none";
    document.getElementById("input-texto").style.display = "none";
    document.getElementById("texto-personalizado").value = "";
}

// Cargar el carrito al iniciar la página
cargarCarrito();

function ttoggleSelectorPrenda() {
    const selectorPrenda = document.getElementById("selector-prenda");
    const inputTexto = document.getElementById("input-texto");
    if (selectorPrenda.style.display === "block") {
        selectorPrenda.style.display = "none";
        inputTexto.style.display = "none"; // También ocultamos el campo de texto
    } else {
        selectorPrenda.style.display = "block";
    }
}

let prendaActual = "";

function abrirModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function cerrarPersonalizar() {
    document.getElementById('modalPersonalizar').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function guardarPersonalizacion() {
    let texto = document.getElementById('textoPersonalizado').value;
    carrito.push(`${prendaActual} (Personalizado: ${texto})`);
    actualizarCarrito();
    cerrarPersonalizar();
    alert(`${prendaActual} ha sido agregada al carrito con personalización.`);
}

// Funciones del Checkout
function mostrarCheckout() {
    const modalCheckout = document.getElementById('modal-checkout');
    modalCheckout.style.display = 'block';
    actualizarResumenCheckout();
}

function cerrarCheckout() {
    const modalCheckout = document.getElementById('modal-checkout');
    modalCheckout.style.display = 'none';
}

function actualizarResumenCheckout() {
    const resumenProductos = document.getElementById('resumen-productos');
    const totalCheckout = document.getElementById('total-checkout');
    resumenProductos.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;

        const productoElement = document.createElement('div');
        productoElement.className = 'producto-resumen';
        productoElement.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen}" width="50">
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
    // Por ahora solo mostraremos un mensaje de confirmación
    alert('¡Gracias por tu compra! Te enviaremos un correo con los detalles de tu pedido.');
    
    // Limpiar el carrito
    carrito = [];
    actualizarCarrito();
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

// Funciones para el formulario de venta
function mostrarFormularioVenta() {
    const modalVenta = document.getElementById('modal-venta');
    modalVenta.style.display = 'block';
}

function cerrarFormularioVenta() {
    const modalVenta = document.getElementById('modal-venta');
    modalVenta.style.display = 'none';
}

function procesarVenta(event) {
    event.preventDefault();
    
    // Obtener los datos del formulario
    const formData = new FormData(event.target);
    const datosVenta = {
        nombrePrenda: formData.get('nombre'),
        categoria: formData.get('categoria'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        nombreVendedor: formData.get('nombreVendedor'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        imagenes: formData.getAll('imagenes')
    };

    // Aquí iría la lógica para procesar la venta
    // Por ejemplo, enviar los datos a un servidor
    alert('¡Gracias por tu interés en vender! Nos pondremos en contacto contigo pronto.');
    
    // Limpiar el formulario
    event.target.reset();
    cerrarFormularioVenta();
    
    return false;
}

// Validación de imágenes
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (this.files.length > maxFiles) {
        alert('Solo puedes subir hasta 5 imágenes');
        this.value = '';
        return;
    }

    for (let file of this.files) {
        if (file.size > maxSize) {
            alert('Las imágenes no deben superar los 5MB');
            this.value = '';
            return;
        }
    }
});