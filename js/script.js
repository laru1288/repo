fetch("./productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
        miCafe(productos)
        
    })
    
function miCafe(productos){

let buscarN = document.getElementById("buscarN");
buscarN.addEventListener("input", filtrarN);
let buscarC = document.getElementById("buscarC");
buscarC.addEventListener("input", filtrarC);


let contar = 0;
let contador = document.getElementById("contador");
cargarProd(productos);


function cargarProd(productos) {
    if (localStorage.getItem("contar")) {
        contar = localStorage.getItem("contar");
        contador.innerHTML = contar;
    }
    let contenedor = document.getElementById("contenedorProds");
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        let carProd = document.createElement("div");
        carProd.className = "cardProd card col-lg-3 col-md-6 col-12";


        carProd.innerHTML = `
        <div class="card-body">
        <h3 class="card-title">${producto.nombre}</h3>
        <img src=${producto.img} class="card-img-top">
        <p>${producto.categoria}</p>
        <p class="card-text">${producto.desc}</p>
        <h4>Precio: $${producto.precio}</h4>
        <button id=${producto.id}>Agregar al carrito</button>
        </div>
    `

        contenedor.appendChild(carProd);
        let btnAgregar = document.getElementById(producto.id);
        btnAgregar.addEventListener("click", agregar);
    })

}

function filtrarN() {
    let aFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscarN.value.toLowerCase()));
    cargarProd(aFiltrado);
}

function filtrarC() {
    let aFiltrado = productos.filter(producto => producto.categoria.toLowerCase().includes(buscarC.value.toLowerCase()));
    cargarProd(aFiltrado);
}


function agregar(e) {
    let buscado = productos.find(producto => producto.id === Number(e.target.id));
    if (carrito.some(producto => producto.id == buscado.id)) {
        let pos = carrito.findIndex(producto => producto.id == buscado.id);
        carrito[pos].cant = parseInt(carrito[pos].cant) + 1;
        carrito[pos].subtotal = parseFloat(carrito[pos].precio) * parseInt(carrito[pos].cant);

        Swal.fire({
            title: 'Agregado!',
            text: 'Agregaste otra unidad al carrito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            color: '#472C21',
            background: '#FAD7EA'
        })
    } else {
        carrito.push({
            id: buscado.id,
            nombre: buscado.nombre,
            precio: buscado.precio,
            cant: 1,
            subtotal: buscado.precio
        }
        );

        Swal.fire({
            title: 'Agregado!',
            text: 'Agregaste el producto al carrito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            color: '#472C21',
            background: '#FAD7EA'
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    contar++;
    contador.innerHTML = contar;
    localStorage.setItem("contar", contar);
}


let carrito = [];
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    cargarCarrito(carrito);
}

}
