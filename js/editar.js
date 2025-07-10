document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id) {
    alert("Producto no válido");
    window.location.href = "admin.html";
    return;
  }

  const productos = getProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert("Producto no encontrado");
    window.location.href = "admin.html";
    return;
  }

  document.getElementById("editNombre").value = producto.nombre;
  document.getElementById("editPrecio").value = producto.precio;
  document.getElementById("editStock").value = producto.stock;
  document.getElementById("editCategoria").value = producto.categoria;

  document.getElementById("editarProductoForm").addEventListener("submit", e => {
    e.preventDefault();

    producto.nombre = document.getElementById("editNombre").value.trim();
    producto.precio = parseFloat(document.getElementById("editPrecio").value);
    producto.stock = parseInt(document.getElementById("editStock").value);
    producto.categoria = document.getElementById("editCategoria").value;

    const index = productos.findIndex(p => p.id === id);
    productos[index] = producto;
    setProductos(productos);

    alert("Producto actualizado correctamente");
    window.location.href = "admin.html";
  });
});
