// 1. Manejo del Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000); // Se oculta tras 1 segundo
});

// 2. Modo Oscuro con Accesibilidad
const themeBtn = document.createElement('button');
themeBtn.classList.add('toggle-theme');
// Mejora de accesibilidad: etiqueta para lectores de pantalla
themeBtn.setAttribute('aria-label', 'Cambiar modo de color'); 
document.body.appendChild(themeBtn);

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.innerHTML = '☀️';
  } else {
    document.body.classList.remove('dark');
    themeBtn.innerHTML = '🌙';
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newTheme);
});

// 3. Animaciones al hacer scroll (Fade-in)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 4. Cierre automático del menú móvil al hacer clic
const navLinks = document.querySelectorAll('.nav-links a');
const nav = document.querySelector('.nav-links');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

