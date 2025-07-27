const HomeModule = (function () {
  // ⚙️ Referencias y estado
  const serviceSection = document.querySelector(".services");
  const testimonialSection = document.querySelector(".testimonials");

  // 🟢 Inicialización
  function init() {
    // Aquí podrías hacer llamados a la API
    // fetchServices();
    // fetchTestimonials();

    setupNavigationHighlight(); // ejemplo básico
  }

  // 🚀 Espacio para consumir servicios desde API
  function fetchServices() {
    // TODO: conectar con API tipo /api/services
    console.log("[API] Consultando servicios...");
    // fetch("/api/services")
    //   .then(res => res.json())
    //   .then(data => renderServices(data))
    //   .catch(err => console.error("Error al cargar servicios:", err));
  }

  // 🚀 Espacio para consumir testimonios desde API
  function fetchTestimonials() {
    // TODO: conectar con API tipo /api/testimonials
    console.log("[API] Consultando testimonios...");
    // fetch("/api/testimonials")
    //   .then(res => res.json())
    //   .then(data => renderTestimonials(data))
    //   .catch(err => console.error("Error al cargar testimonios:", err));
  }

  // 🧠 Ejemplo: navegación activa
  function setupNavigationHighlight() {
    const links = document.querySelectorAll(".navbar a");
    links.forEach(link => {
      link.addEventListener("click", e => {
        links.forEach(l => l.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  }

  // 🧩 Render dinámico de servicios (si vienen desde API)
  function renderServices(services) {
    serviceSection.innerHTML = "";

    services.forEach(service => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${service.icon}" alt="${service.title}" />
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      `;
      serviceSection.appendChild(card);
    });
  }

  // 💬 Render dinámico de testimonios (si vienen desde API)
  function renderTestimonials(testimonials) {
    const list = testimonialSection.querySelector(".testimonial-list");
    list.innerHTML = "";

    testimonials.forEach(t => {
      const item = document.createElement("div");
      item.classList.add("testimonial");
      item.innerHTML = `
        <div class="profile">
          <img src="${t.avatar}" alt="${t.name}" />
          <div>
            <strong>${t.name}</strong><br />
            <span>${t.role}</span>
          </div>
        </div>
        <p>${t.message}</p>
      `;
      list.appendChild(item);
    });
  }

  // Exponer solo init
  return {
    init
  };
})();

window.addEventListener("DOMContentLoaded", HomeModule.init);
