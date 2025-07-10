
(function ensureAdminUser() {
  let usuarios = getUsuarios();
  if (!usuarios.find(u => u.correo.trim().toLowerCase() === "admin@mail.com")) {
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
})();

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  const usuarios = getUsuarios();
  console.log("Usuarios actuales en login:", usuarios);  
  const user = usuarios.find(u => 
    u.correo.trim().toLowerCase() === email &&
    u.password === password
  );

  if (user) {
    setCurrentUser(user);
    alert(`Bienvenido, ${user.nombre}`);

    if (user.rol === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "comida.html";
    }
  } else {
    alert("Credenciales incorrectas.");
  }
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("regNombre").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const domicilio = document.getElementById("regDomicilio").value;

  let usuarios = getUsuarios();

  if (usuarios.find(u => u.correo.trim().toLowerCase() === email.trim().toLowerCase())) {
    alert("Este correo ya está registrado.");
    return;
  }

  const newUser = {
    id: Date.now(),
    nombre,
    correo: email,
    password,
    rol: "cliente",
    domicilio
  };

  usuarios.push(newUser);
  setUsuarios(usuarios);
  setCurrentUser(newUser);
  alert(`Registro exitoso. Bienvenido, ${newUser.nombre}.`);
  window.location.href = "comida.html";
});
