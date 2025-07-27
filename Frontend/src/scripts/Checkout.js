const CheckoutModule = (function () {
  // Elementos
  const summaryType = document.getElementById("summary-type");
  const summaryAmount = document.getElementById("summary-amount");
  const summaryAddress = document.getElementById("summary-address");
  const summaryPhotos = document.getElementById("summary-photos");
  const summaryTotal = document.getElementById("summary-total");

  const paymentOptions = document.querySelectorAll("input[name='payment']");
  const confirmBtn = document.querySelector(".btn-confirm");

  const cardNumber = document.getElementById("card-number");
  const cardExp = document.getElementById("card-exp");
  const cardCvc = document.getElementById("card-cvc");

  let selectedPayment = "credit";

  function init() {
    loadSummary();
    setupPaymentListeners();
    setupConfirmHandler();
  }

  // 🧾 Cargar datos desde sessionStorage o datos fake
  function loadSummary() {
    const data = JSON.parse(sessionStorage.getItem("eco-order")) || {
      type: "Electronic",
      amount: "Large",
      address: "Not provided",
      photoCount: 0,
      total: 50
    };

    summaryType.textContent = capitalize(data.type);
    summaryAmount.textContent = data.amount;
    summaryAddress.textContent = data.address || "Not provided";
    summaryPhotos.textContent = data.photoCount || 0;
    summaryTotal.textContent = `$${data.total}`;
  }

  // 🟢 Capitalizar primera letra
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // 💳 Elegir método de pago
  function setupPaymentListeners() {
    paymentOptions.forEach(option => {
      option.addEventListener("change", (e) => {
        selectedPayment = e.target.value;
        console.log("💰 Método de pago seleccionado:", selectedPayment);
      });
    });
  }

  // ✅ Confirmar orden
  function setupConfirmHandler() {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Validación rápida si es tarjeta
      if (selectedPayment === "credit") {
        if (!cardNumber.value || !cardExp.value || !cardCvc.value) {
          alert("Por favor completa la información de la tarjeta.");
          return;
        }
      }

      const order = {
        ...JSON.parse(sessionStorage.getItem("eco-order")),
        paymentMethod: selectedPayment,
        cardInfo: selectedPayment === "credit"
          ? {
              number: cardNumber.value,
              exp: cardExp.value,
              cvc: cardCvc.value
            }
          : null
      };

      console.log("🧾 Orden confirmada:", order);

      // 🔌 Aquí irá el envío a la API
      // sendOrderToAPI(order);
    });
  }

  // Envío simulado a backend
  function sendOrderToAPI(orderData) {
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then(res => res.json())
      .then(response => {
        console.log("✅ Orden registrada:", response);
        // Redirigir a página de confirmación
      })
      .catch(err => {
        console.error("❌ Error al registrar orden:", err);
      });
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", CheckoutModule.init);
