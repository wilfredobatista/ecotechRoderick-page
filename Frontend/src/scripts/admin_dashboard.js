const AdminDashboard = (function () {
  // Elementos del DOM
  const totalRequestsEl = document.getElementById("total-requests");
  const pendingRequestsEl = document.getElementById("pending-requests");
  const completedRequestsEl = document.getElementById("completed-requests");
  const totalUsersEl = document.getElementById("total-users");

  const recentTableBody = document.getElementById("recent-table");

  function init() {
    // Llamadas simuladas (a reemplazar por fetch más adelante)
    loadSummary();
    loadRecentRequests();
  }

  // Cargar métricas principales
  function loadSummary() {
    // 🔌 Reemplazar con fetch("/api/admin/summary")
    const data = {
      total: 142,
      pending: 26,
      completed: 103,
      users: 59
    };

    totalRequestsEl.textContent = data.total;
    pendingRequestsEl.textContent = data.pending;
    completedRequestsEl.textContent = data.completed;
    totalUsersEl.textContent = data.users;
  }

  // Cargar solicitudes recientes
  function loadRecentRequests() {
    // 🔌 Reemplazar con fetch("/api/admin/recent-requests")
    const recent = [
      {
        date: "2025-07-22",
        user: "Maria R.",
        type: "Plastic",
        status: "Pending",
        total: 20
      },
      {
        date: "2025-07-21",
        user: "Juan L.",
        type: "Organic",
        status: "Completed",
        total: 15
      }
    ];

    recentTableBody.innerHTML = ""; // limpiar antes

    recent.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.user}</td>
        <td>${item.type}</td>
        <td class="status-${item.status.toLowerCase()}">${item.status}</td>
        <td>$${item.total}</td>
      `;
      recentTableBody.appendChild(row);
    });
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AdminDashboard.init);
