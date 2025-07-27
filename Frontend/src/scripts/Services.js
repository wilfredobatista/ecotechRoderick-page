const ServiceModule = (function () {
  let selectedType = null;
  let selectedAmount = null;
  let address = "";
  let uploadedFiles = [];

  // DOM Elements
  const wasteButtons = document.querySelectorAll('.waste-options .option');
  const amountButtons = document.querySelectorAll('.amount-options .option');
  const addressInput = document.getElementById('address');
  const fileInput = document.getElementById('photo-upload');
  const chooseFilesBtn = document.querySelector('.btn-upload');
  const continueBtn = document.querySelector('.btn-continue');

  function init() {
    setupWasteTypeSelection();
    setupAmountSelection();
    setupFileUpload();
    setupContinueButton();
  }

  // Selección de tipo de desecho
  function setupWasteTypeSelection() {
    wasteButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        wasteButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedType = btn.dataset.type;
        console.log("✅ Waste type selected:", selectedType);
      });
    });
  }

  // Selección de cantidad
  function setupAmountSelection() {
    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAmount = btn.dataset.amount;
        console.log("📦 Amount selected:", selectedAmount);
      });
    });
  }

  // Selección de archivos
  function setupFileUpload() {
    chooseFilesBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      uploadedFiles = Array.from(e.target.files);
      console.log("🖼️ Files selected:", uploadedFiles.map(f => f.name));
    });
  }

  // Botón continuar
  function setupContinueButton() {
    continueBtn.addEventListener('click', (e) => {
      e.preventDefault();

      address = addressInput.value.trim();

      if (!selectedType || !selectedAmount || !address) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      const requestData = {
        type: selectedType,
        amount: selectedAmount,
        address: address,
        files: uploadedFiles, // aún sin enviar
      };

      console.log("📦 Form data:", requestData);

      // 🔌 Aquí irá la conexión con la API para enviar los datos
      // sendRequestToAPI(requestData);
    });
  }

  // 🔌 Ejemplo de función para enviar datos al backend
  function sendRequestToAPI(data) {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("amount", data.amount);
    formData.append("address", data.address);
    data.files.forEach((file, i) => {
      formData.append("photos", file);
    });

    fetch("/api/collection-request", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      console.log("✅ Solicitud enviada:", response);
      // Redirigir o mostrar mensaje
    })
    .catch(error => {
      console.error("❌ Error al enviar solicitud:", error);
    });
  }

  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", ServiceModule.init);
