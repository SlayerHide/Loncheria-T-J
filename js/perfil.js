document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (!user) {
    alert("Debes iniciar sesión para acceder a tu perfil.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nombre").value = user.nombre;
  document.getElementById("domicilio").value = user.domicilio;

  document.getElementById("perfilForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nuevoNombre = document.getElementById("nombre").value;
    const nuevoDomicilio = document.getElementById("domicilio").value;

    let usuarios = getUsuarios();
    const index = usuarios.findIndex(u => u.id === user.id);
    if (index !== -1) {
      usuarios[index].nombre = nuevoNombre;
      usuarios[index].domicilio = nuevoDomicilio;
      setUsuarios(usuarios);
      setCurrentUser(usuarios[index]); 
      alert("Datos actualizados correctamente.");
      window.location.href = "comida.html";
    }
  });
});

function logout() {
  logoutUser();
  window.location.href = "login.html";
}
