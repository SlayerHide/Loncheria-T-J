
let usuarios = getUsuarios();
if (!usuarios.find(u => u.correo === "admin@mail.com")) {
  usuarios.push({
    id: Date.now(),
    nombre: "Admin",
    correo: "admin@mail.com",
    password: "admin123",
    rol: "admin",
    domicilio: ""
  });
  setUsuarios(usuarios);
}

if (!localStorage.getItem('productos')) {
  const productos = [
    { id: 1, nombre: "Hamburguesa", precio: 135, stock: 10, categoria: "comida", imagen: "https://th.bing.com/th/id/OIP.xpHtN8nOMEDD69KJLoiHDAHaHa" },
    { id: 2, nombre: "Hot dogs", precio: 60, stock: 10, categoria: "comida", imagen: "https://th.bing.com/th/id/R.f92425fc6ed1701e750c84c9cb800d5b" },
    { id: 3, nombre: "Tortas", precio: 150, stock: 10, categoria: "comida", imagen: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tortamex.jpg" },
    { id: 4, nombre: "Sandwich", precio: 150, stock: 10, categoria: "comida", imagen: "https://th.bing.com/th/id/OIP.vOkaquI7-b5Gm92Tz6XuQAHaE8" },
    { id: 5, nombre: "Sincronizada", precio: 150, stock: 10, categoria: "comida", imagen: "https://tse4.mm.bing.net/th/id/OIP.TR-g0D-lay8Ls20uyafTUQHaHa" },
    { id: 101, nombre: "Coca Cola", precio: 50, stock: 10, categoria: "bebida", imagen: "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/value-collection/coca-cola-1.25-liter-new.png" },
    { id: 102, nombre: "Jugo Natural de Naranja", precio: 60, stock: 10, categoria: "bebida", imagen: "https://tse1.mm.bing.net/th/id/OIP.ROmg7H3b1keEeZ8u50dnbgHaHh" },
    { id: 103, nombre: "Agua Natural", precio: 40, stock: 10, categoria: "bebida", imagen: "https://tse4.mm.bing.net/th/id/OIP.1beF0DG1-swyjt1UuNbYrAHaHa" }
  ];
  setProductos(productos);
}


function getUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function getProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

function setUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function setProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem('currentUser');
}
