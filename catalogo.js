// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Collar Serpiente Dorado",
        descripcion: "Elegante collar de oro 18k con diseño de serpiente flexible",
        precio: 599.99,
        imagen: "images/co1.jpg",
        categoria: "collares"
    },
    {
        id: 2,
        nombre: "Aretes Espiral Dorados",
        descripcion: "Aretes de oro con diseño espiral moderno",
        precio: 449.99,
        imagen: "images/ar2.jpg",
        categoria: "aretes"
    },
    {
        id: 3,
        nombre: "Set de aretes y collar",
        descripcion: "Set simple y elegante en oro 14k",
        precio: 499.99,
        imagen: "images/ar1.jpg",
        categoria: "conjuntos"
    },
    {
        id: 4,
        nombre: "Anillo Hojas de Oro",
        descripcion: "Anillo elegante en oro 18k con diseño de hojas",
        precio: 399.99,
        imagen: "images/an1.jpg",
        categoria: "anillos"
    },
    {
        id: 5,
        nombre: "Set Corazón Dorado",
        descripcion: "Conjunto de collar y aretes con diseño de corazón en oro 18k",
        precio: 799.99,
        imagen: "images/co2.jpg",
        categoria: "conjuntos"
    },
    {
        id: 6,
        nombre: "Conjunto Premium Stella",
        descripcion: "Set completo de joyas premium que incluye collar, aretes y pulsera en oro 18k",
        precio: 1299.99,
        imagen: "images/g1.jpg",
        categoria: "conjuntos"
    }
];

// Función para mostrar productos
function mostrarProductos(productosFiltrados = productos) {
    const contenedor = document.querySelector('.productos-grid');
    contenedor.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productoHTML = `
            <div class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <div class="producto-info">
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-descripcion">${producto.descripcion}</p>
                    <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                    <button class="btn-agregar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

// Función para filtrar productos
function filtrarProductos() {
    const categoria = document.getElementById('categoria').value;
    let productosFiltrados = productos;

    if (categoria !== 'todos') {
        productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    }

    mostrarProductos(productosFiltrados);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    document.getElementById('categoria').addEventListener('change', filtrarProductos);
}); 