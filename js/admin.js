document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();

  if (!user || user.rol !== "admin") {
    alert("Acceso restringido: solo administradores.");
    window.location.href = "login.html";
    return;
  }

  renderProductos();

  document.getElementById("crearProductoForm").addEventListener("submit", e => {
    e.preventDefault();
    crearProducto();
  });
});

function renderProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";
  const productos = getProductos();

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
  div.innerHTML = `
  <strong>${p.nombre}</strong>
  <p>Precio: $${p.precio}</p>
  <p>Stock: ${p.stock}</p>
  <p>Categoría: ${p.categoria}</p>
  <button class="boton-editar" onclick="window.location.href='editar.html?id=${p.id}'">Editar</button>
  <button class="boton-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
`;
    lista.appendChild(div);
  });
}

function crearProducto() {
  const nombre = document.getElementById("nuevoNombre").value.trim();
  const precio = parseFloat(document.getElementById("nuevoPrecio").value);
  const stock = parseInt(document.getElementById("nuevoStock").value);
  const categoria = document.getElementById("nuevoCategoria").value;

  let productos = getProductos();

  const nuevo = {
    id: Date.now(),
    nombre,
    precio,
    stock,
    categoria
  };

  productos.push(nuevo);
  setProductos(productos);
  alert("Producto creado correctamente.");
  document.getElementById("crearProductoForm").reset();
  renderProductos();
}

function editarProducto(id) {
  let productos = getProductos();
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    const nuevoNombre = prompt("Nuevo nombre:", productos[index].nombre);
    const nuevoPrecio = prompt("Nuevo precio:", productos[index].precio);
    const nuevoStock = prompt("Nuevo stock:", productos[index].stock);

    productos[index].nombre = nuevoNombre.trim();
    productos[index].precio = parseFloat(nuevoPrecio);
    productos[index].stock = parseInt(nuevoStock);

    setProductos(productos);
    alert("Producto editado correctamente.");
    renderProductos();
  }
}

function eliminarProducto(id) {
  let productos = getProductos();
  productos = productos.filter(p => p.id !== id);
  setProductos(productos);
  alert("Producto eliminado correctamente.");
  renderProductos();
}

document.getElementById("cerrarSesion").addEventListener("click", () => {
  logoutUser();
  alert("Sesión cerrada.");
  window.location.href = "login.html";
});

function irAPedidos() {
  window.location.href = "/views/adminPedidos.html";
}
