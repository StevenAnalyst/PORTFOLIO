// Sistema de cambio de idioma
class LanguageSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
    this.translations = {};
    this.init();
  }

  async init() {
    // Cargar traducciones
    await this.loadTranslations();
    
    // Aplicar idioma guardado
    this.applyLanguage(this.currentLanguage);
    
    // Configurar botones
    this.setupButtons();
    
    // Actualizar estado visual de los botones
    this.updateButtonStates();
  }

  async loadTranslations() {
    try {
      // Cargar español
      const esResponse = await fetch('./public/languages/es.json');
      this.translations.es = await esResponse.json();
      
      // Cargar inglés
      const enResponse = await fetch('./public/languages/en.json');
      this.translations.en = await enResponse.json();
    } catch (error) {
      console.error('Error al cargar traducciones:', error);
      // Traducciones por defecto en caso de error
      this.translations = {
        es: { header: { availability: "Disponible para trabajar" } },
        en: { header: { availability: "Available for work" } }
      };
    }
  }

  setupButtons() {
    const btnEspanol = document.querySelector('.boton-español');
    const btnIngles = document.querySelector('.boton-ingles');

    if (btnEspanol) {
      btnEspanol.addEventListener('click', () => this.changeLanguage('es'));
    }

    if (btnIngles) {
      btnIngles.addEventListener('click', () => this.changeLanguage('en'));
    }
  }

  changeLanguage(lang) {
    if (lang === this.currentLanguage) return;
    
    this.currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    this.applyLanguage(lang);
    this.updateButtonStates();
    
    // Actualizar el idioma del documento
    document.documentElement.lang = lang;
  }

  applyLanguage(lang) {
    const t = this.translations[lang];
    if (!t) return;

    // Header - Disponibilidad
    const availability = document.querySelector('[data-key="Disponibilidad"]');
    if (availability) availability.textContent = t.header.availability;

    // Perfil - Título
    const profileTitle = document.querySelector('.descripcion h2');
    if (profileTitle) profileTitle.textContent = t.profile.title;

    // Perfil - From
    const fromText = document.querySelector('.from');
    if (fromText) {
      fromText.innerHTML = `${t.profile.from} <span class="amarillo">Col</span><span class="azul">om</span><span class="rojo">bia</span>☕`;
    }

    // Perfil - Descripción
    const description = document.querySelector('.descripcion > p:last-of-type');
    if (description) description.textContent = t.profile.description;

    // Botón CV
    const cvButton = document.querySelector('#descargar-cv');
    if (cvButton) cvButton.textContent = t.profile.cvButton;

    // Proyectos - Título de sección
    const projectsTitle = document.querySelector('.projects-section .section-title');
    if (projectsTitle) projectsTitle.textContent = t.projects.title;

    // Proyecto 1
    this.updateProject(0, t.projects.project1, t.projects);

    // Proyecto 2
    this.updateProject(1, t.projects.project2, t.projects);

    // Proyecto 3
    this.updateProject(2, t.projects.project3, t.projects);

    // Stack - Título de sección
    const stackTitle = document.querySelector('.titulo-stack');
    if (stackTitle) stackTitle.textContent = t.stack.title;

    // Stack - Categorías
    const stackGroups = document.querySelectorAll('.stack-grupo h3');
    if (stackGroups.length >= 4) {
      stackGroups[0].textContent = t.stack.frontend;
      stackGroups[1].textContent = t.stack.backend;
      stackGroups[2].textContent = t.stack.databases;
      stackGroups[3].textContent = t.stack.tools;
    }

    // Toast
    const toast = document.querySelector('#toast');
    if (toast) toast.textContent = t.toast.emailCopied;

    // Actualizar atributos ARIA
    this.updateAriaLabels(t.aria);
  }

  updateProject(index, projectData, projectsData) {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards[index]) {
      const card = projectCards[index];
      
      const title = card.querySelector('.project-title');
      if (title) title.textContent = projectData.title;
      
      const desc = card.querySelector('.project-desc');
      if (desc) desc.textContent = projectData.description;
      
      const tech = card.querySelector('.project-tech');
      if (tech) tech.textContent = projectData.tech;
      
      const buttons = card.querySelectorAll('.btn');
      if (buttons.length >= 2) {
        buttons[0].textContent = projectsData.viewProject;
        buttons[1].textContent = projectsData.viewCode;
      }
    }
  }

  updateAriaLabels(ariaLabels) {
    // Selector de idioma
    const languageNav = document.querySelector('.idiomas');
    if (languageNav) languageNav.setAttribute('aria-label', ariaLabels.languageSelector);

    // Botones de idioma
    const btnEspanol = document.querySelector('.boton-español');
    if (btnEspanol) btnEspanol.setAttribute('aria-label', ariaLabels.changeToSpanish);

    const btnIngles = document.querySelector('.boton-ingles');
    if (btnIngles) btnIngles.setAttribute('aria-label', ariaLabels.changeToEnglish);

    // Foto de perfil
    const foto = document.querySelector('.foto');
    if (foto) foto.setAttribute('aria-label', ariaLabels.profilePhoto);

    // Estado disponible
    const circuloVerde = document.querySelector('.circulo-verde');
    if (circuloVerde) circuloVerde.setAttribute('aria-label', ariaLabels.statusAvailable);

    // Redes sociales
    const github = document.querySelector('.red-social.github');
    if (github) github.setAttribute('aria-label', ariaLabels.visitGithub);

    const linkedin = document.querySelector('.red-social.linkedin');
    if (linkedin) linkedin.setAttribute('aria-label', ariaLabels.visitLinkedin);

    const email = document.querySelector('#copiarEmail');
    if (email) email.setAttribute('aria-label', ariaLabels.copyEmail);
  }

  updateButtonStates() {
    const btnEspanol = document.querySelector('.boton-español');
    const btnIngles = document.querySelector('.boton-ingles');

    if (this.currentLanguage === 'es') {
      btnEspanol?.classList.add('active');
      btnIngles?.classList.remove('active');
    } else {
      btnIngles?.classList.add('active');
      btnEspanol?.classList.remove('active');
    }
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
  });
} else {
  new LanguageSwitcher();
}