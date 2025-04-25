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
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An.jpeg",
        categoria: "anillos"
    },
    {
        id: 7,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Cj.jpeg",
        categoria: "conjuntos"
    },
    {
        id: 8,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/C.jpeg",
        categoria: "collares"
    },
    {
        id: 9,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Ar.jpeg",
        categoria: "aretes"
    },
    {
        id: 10,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An2.jpeg",
        categoria: "anillos"
    },
    {
        id: 11,
       nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An3.jpeg",
        categoria: "anillos"
    },
    {
        id: 12,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Rj.jpeg",
        categoria: "relojes"
    },
    {
        id: 13,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An4.jpeg",
        categoria: "anillos"
    },
    {
        id: 14,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Rj2.jpeg",
        categoria: "relojes"
    },
    {
        id: 15,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An5.jpeg",
        categoria: "anillos"
    },
    {
        id: 17,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Rj6.jpeg",
        categoria: "anillos"
    },
    {
        id: 18,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/C.jpeg",
        categoria: "collares"
    },
    {
        id: 19,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Cj2.jpeg",
        categoria: "conjuntos"
    },
    {
        id: 20,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Ar2.jpeg",
        categoria: "aretes"
    },
    {
        id: 21,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Ar3.jpeg",
        categoria: "aretes"
    },
    {
        id: 22,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Rj4.jpeg",
        categoria: "relojes"
    },
    {
        id: 23,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Rj5.jpeg",
        categoria: "relojes"
    },
    {
        id: 24,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/Ar4.jpeg",
        categoria: "aretes"
    },
    {
        id: 25,
        nombre: "Nom",
        descripcion: "Des",
        precio: 299.99,
        imagen: "imagescat/An6.jpeg",
        categoria: "anillos"
    },
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