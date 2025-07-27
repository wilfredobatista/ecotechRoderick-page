const AdminPayments = (function () {
  const paymentsBody = document.getElementById("payments-body");

  function init() {
    loadPayments();
  }

  // Simular carga de pagos (reemplazar con fetch real)
  function loadPayments() {
    const payments = [
      {
        id: 1,
        date: "2025-07-21",
        user: "Maria R.",
        amount: 25,
        method: "Credit Card",
        status: "Completed",
        reference: "TXN987654321"
      },
      {
        id: 2,
        date: "2025-07-19",
        user: "Carlos M.",
        amount: 15,
        method: "Bank Transfer",
        status: "Pending",
        reference: "TXN123456789"
      },
      {
        id: 3,
        date: "2025-07-18",
        user: "Ana L.",
        amount: 10,
        method: "Yappy",
        status: "Failed",
        reference: "TXN555666777"
      }
    ];

    paymentsBody.innerHTML = "";

    payments.forEach(payment => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.date}</td>
        <td>${payment.user}</td>
        <td>$${payment.amount}</td>
        <td>${payment.method}</td>
        <td><span class="badge badge-${payment.status.toLowerCase()}">${payment.status}</span></td>
        <td>${payment.reference}</td>
      `;

      paymentsBody.appendChild(row);
    });
  }

  // Aquí iría una versión real usando fetch:
  /*
  function loadPayments() {
    fetch('/api/admin/payments')
      .then(res => res.json())
      .then(data => {
        // Reemplazar loop anterior con data.forEach(...)
      })
      .catch(err => console.error("❌ Error al cargar pagos:", err));
  }
  */

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", AdminPayments.init);
