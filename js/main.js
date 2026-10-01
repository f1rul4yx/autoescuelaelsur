(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var header = document.querySelector(".site-header");

  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.classList.remove("is-active");
    mainNav.classList.remove("is-open");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 30);
    }, { passive: true });
  }

  var faqs = document.querySelectorAll(".faq");
  faqs.forEach(function (faq) {
    faq.addEventListener("toggle", function () {
      faqs.forEach(function (other) {
        if (other !== faq && other.open) other.open = false;
      });
    });
  });

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = document.getElementById("fNombre");
      var telefono = document.getElementById("fTelefono");
      var email = document.getElementById("fEmail");
      var valido = true;

      [nombre, telefono, email].forEach(function (input) {
        var ok = input.value.trim() !== "" && !input.classList.contains("is-invalid");
        if (input.value.trim() === "") {
          ok = false;
          input.classList.add("is-invalid");
        }
        if (input === email) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(input.value.trim())) { ok = false; input.classList.add("is-invalid"); }
        }
        if (ok) input.classList.remove("is-invalid");
        valido = valido && ok;
      });

      if (!valido) {
        status.textContent = "Por favor, revisa los campos obligatorios.";
        status.className = "form__status err";
        return;
      }

      var asunto = document.getElementById("fAsunto").value;
      var mensaje = document.getElementById("fMensaje").value;
      var body = encodeURIComponent(
        "Nombre: " + nombre.value.trim() + "\n" +
        "Teléfono: " + telefono.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n" +
        "Interés: " + asunto + "\n" +
        "Mensaje: " + mensaje.trim()
      );
      window.location.href = "mailto:autoescuelaelsur@gmail.com?subject=" +
        encodeURIComponent("Solicitud de información - " + nombre.value.trim()) + "&body=" + body;

      status.textContent = "Gracias, " + nombre.value.trim() + ". Se abrirá tu correo para enviar la solicitud.";
      status.className = "form__status ok";
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();