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


let prendaActual = "";

        function abrirModal() {
            document.getElementById('modal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        function cerrarModal() {
            document.getElementById('modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        function agregarAlCarrito() {
                prendaActual = prenda;
                let personalizar = confirm("¿Deseas personalizar la prenda?");
                if (personalizar) {
                    document.getElementById('modalPersonalizar').style.display = 'block';
                    document.getElementById('overlay').style.display = 'block';
                } else {
                    carrito.push(prenda);
                    actualizarCarrito();
                    alert(`${prenda} ha sido agregada al carrito.`);
                }
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

        function eliminarDelCarrito(index) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }

        let carrito = [];

function agregarAlCarrito(nombre, imagen, precio) {
    const producto = { nombre, imagen, precio };
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.querySelector("#lista-carrito tbody");
    listaCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><button onclick="eliminarDelCarrito(${index})">X</button></td>
        `;
        listaCarrito.appendChild(fila);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

        function mostrarCarrito() {
         const carritoDiv = document.getElementById("carrito");
         carritoDiv.classList.toggle("abierto");
}


        function cerrarCarrito() {
            document.getElementById('modalCarrito').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

  

        function cerrarCarrito() {
            document.getElementById('modalCarrito').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        let windowcarrito = [];

function agregarAlCarrito(nombre, imagen, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, imagen, precio, cantidad: 1 });
    }
    actualizarCarrito();
}
function actualizarCarrito() {
    const listaCarrito = document.querySelector("#lista-carrito tbody");
    listaCarrito.textContent = "";
    const fragmento = document.createDocumentFragment();
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
        fragmento.appendChild(fila);
    });
    listaCarrito.appendChild(fragmento);
}



function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
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