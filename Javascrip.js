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
cargarCarrito();

function cambiarCantidad(index, cambio) {
    if (carrito[index].cantidad + cambio > 0) {
        carrito[index].cantidad += cambio;
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const listaCarrito = document.querySelector("#lista-carrito tbody");
    const fragment = document.createDocumentFragment(); // Crear un fragmento para optimizar la inserción
    listaCarrito.innerHTML = ""; // Limpiar el contenido previo del carrito

    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                ${producto.cantidad}
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </td>
            <td><button onclick="eliminarDelCarrito(${index})">X</button></td>
        `;
        fragment.appendChild(fila); // Agregar la fila al fragmento
    });

    listaCarrito.appendChild(fragment); // Agregar el fragmento al DOM de una sola vez
}


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
    
    // Cerrar la ventana después de agregar la prenda
    document.getElementById("selector-prenda").style.display = "none";
    document.getElementById("input-texto").style.display = "none";
    document.getElementById("texto-personalizado").value = "";
}