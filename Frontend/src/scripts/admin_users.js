const AdminUsers = (function () {
  const usersBody = document.getElementById("users-body");

  function init() {
    loadUsers();
  }

  // Simular carga de usuarios (reemplazar con fetch real)
  function loadUsers() {
    const users = [
      {
        id: 1,
        name: "Maria Rodriguez",
        email: "maria@example.com",
        phone: "+507 6000-0000",
        location: "Panama City",
        registered: "2025-06-20"
      },
      {
        id: 2,
        name: "Juan López",
        email: "juan@example.com",
        phone: "+507 6789-1234",
        location: "David",
        registered: "2025-07-01"
      }
    ];

    usersBody.innerHTML = "";

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.location}</td>
        <td>${user.registered}</td>
        <td>
          <button class="btn-view" data-id="${user.id}">🔍 View</button>
          <button class="btn-delete" data-id="${user.id}">🗑 Delete</button>
        </td>
      `;

      usersBody.appendChild(row);
    });

    setupButtonEvents();
  }

  // Acciones de los botones (ver y eliminar)
  function setupButtonEvents() {
    const viewButtons = document.querySelectorAll(".btn-view");
    const deleteButtons = document.querySelectorAll(".btn-delete");

    viewButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const userId = btn.dataset.id;
        console.log(`👤 Ver perfil de usuario #${userId}`);
        // 🔌 Aquí puede abrir modal o redirigir a /users/:id
      });
    });

    deleteButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const userId = btn.dataset.id;
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
          console.log(`🗑 Eliminando usuario #${userId}`);
          // 🔌 Aquí va fetch DELETE /api/users/:id
        }
      });
    });
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AdminUsers.init);
