const AuthModule = (function () {
  // Elementos del DOM
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const switchLink = document.getElementById("switch-link");
  const toggleText = document.getElementById("toggle-text");
  const formTitle = document.getElementById("form-title");

  // Estado interno
  let isLoginActive = true;

  // Inicializar eventos
  function init() {
    switchLink.addEventListener("click", toggleForms);
    loginForm.addEventListener("submit", handleLogin);
    registerForm.addEventListener("submit", handleRegister);
  }

  // Alternar entre login y registro con transición
  function toggleForms(e) {
    e.preventDefault();
    isLoginActive = !isLoginActive;

    // Desvanece el título antes de cambiar
    formTitle.style.opacity = 0;

    setTimeout(() => {
      if (isLoginActive) {
        formTitle.textContent = "Iniciar Sesión";
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        toggleText.innerHTML = '¿No tienes cuenta? <a id="switch-link">Regístrate</a>';
      } else {
        formTitle.textContent = "Registrarse";
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
        toggleText.innerHTML = '¿Ya tienes cuenta? <a id="switch-link">Inicia sesión</a>';
      }

      // Vuelve a mostrar el título
      formTitle.style.opacity = 1;

      // Reasignar el listener al nuevo <a> generado
      document.getElementById("switch-link").addEventListener("click", toggleForms);
    }, 200); // espera antes de cambiar el contenido
  }

  // Manejador de login
  function handleLogin(e) {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
      alert("Por favor ingresa tu usuario y contraseña.");
      return;
    }

    // 🔌 Espacio para integración con API de login
    console.log("[LOGIN] Enviando datos:", { username, password });
  }

  // Manejador de registro
  function handleRegister(e) {
    e.preventDefault();

    const data = {
      fullname: registerForm.fullname.value.trim(),
      email: registerForm.email.value.trim(),
      password: registerForm.password.value.trim(),
      phone: registerForm.phone.value.trim(),
      location: registerForm.location.value.trim(),
    };

    if (Object.values(data).some(val => !val)) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // 🔌 Espacio para integración con API de registro
    console.log("[REGISTER] Enviando datos:", data);
  }

  // Exponer solo init
  return {
    init
  };
})();

// Iniciar el módulo cuando cargue el DOM
window.addEventListener("DOMContentLoaded", AuthModule.init);
