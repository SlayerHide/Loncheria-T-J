const comidas = [
  { id: 1, nombre: "Hamburguesa", precio: 135, imagen: "https://th.bing.com/th/id/OIP.xpHtN8nOMEDD69KJLoiHDAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3r" },
  { id: 2, nombre: "Hot dogs", precio: 60, imagen: "https://th.bing.com/th/id/R.f92425fc6ed1701e750c84c9cb800d5b?rik=lhmtvijyVU2qPQ&pid=ImgRaw&r=0" },
  { id: 3, nombre: "Tortas", precio: 150, imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tortamex.jpg/220px-Tortamex.jpg" },
  { id: 4, nombre: "Sandwich", precio: 150, imagen: "https://th.bing.com/th/id/OIP.vOkaquI7-b5Gm92Tz6XuQAHaE8?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" },
  { id: 5, nombre: "Sincronizada", precio: 150, imagen: "https://tse4.mm.bing.net/th/id/OIP.TR-g0D-lay8Ls20uyafTUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" }
];


const bebidas = [
  { id: 101, nombre: "Coca Cola", precio: 50, imagen: "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/value-collection/coca-cola-1.25-liter-new.png" },
  { id: 102, nombre: "Jugo Natural de Naranja", precio: 60, imagen: "https://tse1.mm.bing.net/th/id/OIP.ROmg7H3b1keEeZ8u50dnbgHaHh?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 103, nombre: "Agua Natural", precio: 40, imagen: "https://tse4.mm.bing.net/th/id/OIP.1beF0DG1-swyjt1UuNbYrAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  
];

let carrito = [];

const catalogo = document.getElementById("catalogo");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const carritoAside = document.getElementById("carrito");

document.getElementById("cart-button").addEventListener("click", () => {
  carritoAside.classList.toggle("mostrar");
});

function renderCatalogo() {
  const contenedorComidas = document.getElementById("catalogo-comidas");
  comidas.forEach(producto => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar a tu plato</button>
    `;
    contenedorComidas.appendChild(card);
  });

  const contenedorBebidas = document.getElementById("catalogo-bebidas");
  bebidas.forEach(producto => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar a tu comida</button>
    `;
    contenedorBebidas.appendChild(card);
  });
}



function agregarAlCarrito(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    const producto = [...comidas, ...bebidas].find(p => p.id === id);
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}


function eliminarUno(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad--;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    actualizarCarrito();
  }
}

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

function actualizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.nombre}</strong> x ${item.cantidad}<br />
          <small>$${item.precio} c/u</small>
        </div>
        <div>
          <button onclick="agregarAlCarrito(${item.id})">➕</button>
          <button onclick="eliminarUno(${item.id})">➖</button>
          <button onclick="eliminarProducto(${item.id})">🗑️</button>
        </div>
      </div>
    `;
    cartItems.appendChild(li);
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;

     renderPayPalButton();
  });

  cartCount.textContent = cantidadTotal;
  cartTotal.textContent = `$${total}`;
}
function renderPayPalButton() {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  // Limpiar antes de volver a renderizar
  document.getElementById("paypal-button-container").innerHTML = "";

  if (total > 0) {
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2)
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert("✅ Pago completado por " + details.payer.name.given_name);
          vaciarCarrito();
        });
      }
    }).render('#paypal-button-container');
  }
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
});

function irAPagina() {
 
  window.location.href = "comida.html";
}
