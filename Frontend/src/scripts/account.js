const AccountModule = (function () {
  const editBtn = document.getElementById("edit-btn");
  const saveBtn = document.getElementById("save-btn");
  const userForm = document.getElementById("user-form");

  const inputs = {
    name: document.getElementById("user-name"),
    email: document.getElementById("user-email"),
    phone: document.getElementById("user-phone"),
    address: document.getElementById("user-address"),
  };

  let isEditing = false;

  function init() {
    setupEditToggle();
    setupFormSubmit();
    loadUserData(); // puedes usarlo para precargar desde API
  }

  // Activar edición
  function setupEditToggle() {
    editBtn.addEventListener("click", () => {
      isEditing = !isEditing;

      Object.values(inputs).forEach(input => {
        input.disabled = !isEditing;
      });

      saveBtn.hidden = !isEditing;
      editBtn.textContent = isEditing ? "✖ Cancel" : "✎ Edit";
    });
  }

  // Guardar cambios (espacio para integración futura)
  function setupFormSubmit() {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userData = {
        name: inputs.name.value.trim(),
        email: inputs.email.value.trim(),
        phone: inputs.phone.value.trim(),
        address: inputs.address.value.trim(),
      };

      if (Object.values(userData).some(val => !val)) {
        alert("Por favor completa todos los campos.");
        return;
      }

      console.log("👤 Datos a guardar:", userData);

      // 🔌 Aquí irá la llamada a la API para actualizar el perfil
      // updateUserProfile(userData);

      // Desactivar modo edición
      isEditing = false;
      Object.values(inputs).forEach(input => input.disabled = true);
      saveBtn.hidden = true;
      editBtn.textContent = "✎ Edit";
    });
  }

  // Prellenar con datos existentes (espacio para futura API)
  function loadUserData() {
    // 🔌 Aquí podrías hacer un fetch a /api/user
    console.log("📥 Cargando datos de usuario...");
    // Ejemplo: inputs.name.value = response.name;
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AccountModule.init);
