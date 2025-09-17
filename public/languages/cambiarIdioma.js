async function setLanguage(lang) {
  const res = await fetch(`${lang}.json`);
  const translations = await res.json();

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  localStorage.setItem("lang", lang);

  // marcar botón activo
  document.querySelector(".boton-español").classList.toggle("activo", lang === "es");
  document.querySelector(".boton-ingles").classList.toggle("activo", lang === "en");
}

// cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  // cargar idioma guardado o español por defecto
  const lang = localStorage.getItem("lang") || "es";
  setLanguage(lang);

  // 👇 estos son los eventos de click
  document.querySelector(".boton-español")
          .addEventListener("click", () => setLanguage("es"));

  document.querySelector(".boton-ingles")
          .addEventListener("click", () => setLanguage("en"));
});
