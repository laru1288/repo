let carrito = [];
let contar;


let carritoDOM = document.getElementById("carrito");
let btnComprar = document.getElementById("comprar");
btnComprar.addEventListener("click", comprar);

function cargarCarrito(aProds) {
    let total = 0;
    carritoDOM.innerHTML = "";
    carritoDOM.innerHTML += `<h3>Producto Precio Cantidad Subtotal </h3>`
    aProds.forEach(producto => {
        carritoDOM.innerHTML += `<h3>${producto.nombre} ${producto.precio} ${producto.cant} ${producto.subtotal} </h3>`;
        total = total+producto.subtotal;
    })
    carritoDOM.innerHTML += `<h3>Total = ${total}</h3>`;
}

function comprar() {
    
    Swal.fire({
        title: 'Compra finalizada!',
        text: 'Tu compra fue realizada con exito.',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#FAD7EA',
        color: '#472C21',
        background: '#FAD7EA'
      })
    localStorage.removeItem("carrito");
    carrito = [];
    cargarCarrito(carrito);
    contar = 0;
    contador.innerHTML = contar;
    localStorage.removeItem("contar");
}

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    contar = localStorage.getItem("contar");
    cargarCarrito(carrito);
    contador.innerHTML = contar;
}