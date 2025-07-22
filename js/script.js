let carrito = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const carritoAside = document.getElementById("carrito");

document.getElementById("cart-button").addEventListener("click", () => {
  carritoAside.classList.toggle("mostrar");
});

function renderCatalogo() {
  const catalogoComidas = document.getElementById("catalogo-comidas");
  const catalogoBebidas = document.getElementById("catalogo-bebidas");

  catalogoComidas.innerHTML = "";
  catalogoBebidas.innerHTML = "";

  const productos = getProductos();

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;

    if (p.categoria === "comida") {
      catalogoComidas.appendChild(card);
    } else if (p.categoria === "bebida") {
      catalogoBebidas.appendChild(card);
    }
  });
}

function agregarAlCarrito(id) {
  const user = getCurrentUser();
  if (!user) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    window.location.href = "login.html";
    return;
  }

  const productos = getProductos();
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  if (producto.stock <= 0) {
    alert(`Lo sentimos, ${producto.nombre} está agotado.`);
    return;
  }

  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad < producto.stock) {
      carrito[index].cantidad++;
    } else {
      alert(`No puedes agregar más de ${producto.stock} unidades de ${producto.nombre}.`);
    }
  } else {
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
  });

  cartCount.textContent = cantidadTotal;
  cartTotal.textContent = `$${total}`;

  renderPayPalButton();
}


function renderPayPalButton() {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById("paypal-button-container").innerHTML = "";

  if (total > 0) {
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { value: total.toFixed(2) }
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

function finalizarPedido() {
  const user = getCurrentUser();
  if (!user) {
    alert("Debes iniciar sesión para finalizar el pedido.");
    window.location.href = "login.html";
    return;
  }

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let productos = getProductos();
  let hayStockSuficiente = true;

  for (let item of carrito) {
    const producto = productos.find(p => p.id === item.id);
    if (!producto || producto.stock < item.cantidad) {
      hayStockSuficiente = false;
      alert(`No hay suficiente stock para ${item.nombre}. Disponible: ${producto ? producto.stock : 0}`);
      break;
    }
  }

  if (!hayStockSuficiente) return;

  productos = productos.map(p => {
    const itemCarrito = carrito.find(c => c.id === p.id);
    if (itemCarrito) {
      return { ...p, stock: p.stock - itemCarrito.cantidad };
    }
    return p;
  });

  setProductos(productos);
  carrito = [];
  actualizarCarrito();

  alert("¡Pedido realizado exitosamente! Gracias por tu compra.");
}

function irAPagina() {
  window.location.href = "views/comida.html";
}

function irAInicio() {
  window.location.href = "/index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();

  const user = getCurrentUser();
  const perfilArea = document.getElementById("perfil-area");
  if (perfilArea) {
    if (user) {
      perfilArea.innerHTML = `<a href="perfil.html">👤 ${user.nombre}</a>`;
    } else {
      perfilArea.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
    }
  }
});

document.addEventListener('click', function(event) {
  const carritoElement = document.getElementById('carrito');
  const cartButton = document.getElementById('cart-button');

  if (carritoElement.classList.contains('mostrar') &&
      !carritoElement.contains(event.target) &&
      event.target !== cartButton) {
    carritoElement.classList.remove('mostrar');
  }
});

document.getElementById("home-button").addEventListener("click", () => {
  window.location.href = "../index.html";
});


