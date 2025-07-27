const AdminRequests = (function () {
  const requestsBody = document.getElementById("requests-body");

  function init() {
    loadRequests();
  }

  // Simulación de carga de datos
  function loadRequests() {
    // 🔌 Reemplazar con fetch("/api/admin/requests")
    const requests = [
      {
        id: 1,
        date: "2025-07-22",
        user: "Maria R.",
        type: "Plastic",
        amount: "Medium",
        address: "Panama City",
        status: "Pending",
        total: 20
      },
      {
        id: 2,
        date: "2025-07-21",
        user: "Juan L.",
        type: "Organic",
        amount: "Small",
        address: "Colón",
        status: "In Process",
        total: 15
      }
    ];

    requestsBody.innerHTML = "";

    requests.forEach((req) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${req.date}</td>
        <td>${req.user}</td>
        <td>${req.type}</td>
        <td>${req.amount}</td>
        <td>${req.address}</td>
        <td><span class="badge badge-${req.status.toLowerCase().replace(" ", "-")}" id="badge-${req.id}">${req.status}</span></td>
        <td>
          <select class="status-dropdown" data-id="${req.id}">
            <option${req.status === "Pending" ? " selected" : ""}>Pending</option>
            <option${req.status === "In Process" ? " selected" : ""}>In Process</option>
            <option${req.status === "Completed" ? " selected" : ""}>Completed</option>
          </select>
        </td>
      `;

      requestsBody.appendChild(row);
    });

    setupDropdownListeners();
  }

  // Listener para el cambio de estado
  function setupDropdownListeners() {
    const dropdowns = document.querySelectorAll(".status-dropdown");

    dropdowns.forEach(select => {
      select.addEventListener("change", (e) => {
        const newStatus = e.target.value;
        const requestId = e.target.dataset.id;
        const badge = document.getElementById(`badge-${requestId}`);

        // Cambiar texto y clase visual
        badge.textContent = newStatus;
        badge.className = `badge badge-${newStatus.toLowerCase().replace(" ", "-")}`;

        console.log(`🔁 Estado actualizado para solicitud #${requestId}: ${newStatus}`);

        // 🔌 Aquí irá la llamada a la API para actualizar el estado
        // updateRequestStatus(requestId, newStatus);
      });
    });
  }

  // Espacio para API real
  function updateRequestStatus(id, status) {
    fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(data => console.log("✅ Estado actualizado en backend:", data))
      .catch(err => console.error("❌ Error al actualizar:", err));
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AdminRequests.init);
