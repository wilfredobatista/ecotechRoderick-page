const AdminReports = (function () {
  function init() {
    renderStats();
    renderWasteChart();
    renderMonthlyChart();
  }

  // 🔢 Tarjetas de estadísticas
  function renderStats() {
    // Reemplazar con datos reales desde API
    const stats = {
      totalRequests: 320,
      completedPickups: 280,
      totalRevenue: 4560,
      activeUsers: 125
    };

    document.getElementById("total-requests").textContent = stats.totalRequests;
    document.getElementById("completed-pickups").textContent = stats.completedPickups;
    document.getElementById("total-revenue").textContent = `$${stats.totalRevenue}`;
    document.getElementById("active-users").textContent = stats.activeUsers;
  }

  // 🧃 Gráfico por tipo de desecho
  function renderWasteChart() {
    const ctx = document.getElementById("wasteChart").getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Plastic", "Organic", "Glass", "Electronics"],
        datasets: [{
          label: "Requests",
          data: [120, 90, 60, 50],
          backgroundColor: ["#45e9aa", "#81c784", "#64b5f6", "#ba68c8"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  }

  // 📈 Gráfico de actividad mensual
  function renderMonthlyChart() {
    const ctx = document.getElementById("monthlyChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        datasets: [{
          label: "Requests",
          data: [30, 45, 60, 50, 80, 90, 70],
          backgroundColor: "#45e9aa"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // 🔌 Aquí iría la integración con la API
  /*
  function fetchReports() {
    fetch('/api/admin/reports')
      .then(res => res.json())
      .then(data => {
        renderStats(data.stats);
        renderWasteChart(data.wasteData);
        renderMonthlyChart(data.monthlyData);
      })
      .catch(err => console.error("Error al cargar reportes", err));
  }
  */

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AdminReports.init);
