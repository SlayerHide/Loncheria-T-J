
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

let pendienteCrear = null;

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("regNombre").value.trim();
  const correo = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value.trim();
  const domicilio = document.getElementById("regDomicilio").value.trim();

  let usuarios = getUsuarios();

  if (!nombre || !correo || !password || !domicilio) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (usuarios.find(u => u.correo.trim().toLowerCase() === correo)) {
    alert("Este correo ya está registrado.");
    return;
  }

  pendienteCrear = { nombre, correo, password, domicilio };

  document.getElementById("modal-terminos").classList.remove("hidden");
});

document.getElementById("aceptarTerminos").addEventListener("click", function() {
  if (pendienteCrear) {
    let usuarios = getUsuarios();

    const newUser = {
      id: Date.now(),
      nombre: pendienteCrear.nombre,
      correo: pendienteCrear.correo,
      password: pendienteCrear.password,
      rol: "cliente",
      domicilio: pendienteCrear.domicilio
    };

    usuarios.push(newUser);
    setUsuarios(usuarios);
    setCurrentUser(newUser);

    alert(`Registro exitoso. Bienvenido, ${newUser.nombre}.`);
    window.location.href = "comida.html";
  }

  document.getElementById("modal-terminos").classList.add("hidden");
  pendienteCrear = null;
});
