// 1. Manejo del Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);
});

// 2. Modo Oscuro con Accesibilidad
const themeBtn = document.createElement('button');
themeBtn.classList.add('toggle-theme');
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

// 4. Barra de progreso de lectura
window.onscroll = function() { moveProgressBar() };
function moveProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const bar = document.getElementById("myBar");
  if (bar) bar.style.width = scrolled + "%";
}

// 5. Cierre automático del menú móvil
const navLinks = document.querySelectorAll('.nav-links a');
const nav = document.querySelector('.nav-links');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// 6. Lógica de la Calculadora de Dosis (Versión Unificada)
const medSelect = document.getElementById('med-select');
const weightInput = document.getElementById('weight-input');
const resultValue = document.getElementById('result-value');
const pautaText = document.getElementById('pauta-text');
const freqRadios = document.querySelectorAll('input[name="freq"]');

function calcularDosisPro() {
  if (!weightInput || !medSelect || !resultValue) return;

  const peso = parseFloat(weightInput.value);
  const concentracion = parseFloat(medSelect.value);
  let frecuencia = 6;
  
  freqRadios.forEach(r => { if(r.checked) frecuencia = parseInt(r.value); });

  if (peso > 0) {
    let mgKgDia;
    let medicamento = "";

    if (concentracion === 100) {
      mgKgDia = 60; // Paracetamol: 60mg/kg/día
      medicamento = "Paracetamol";
    } else {
      mgKgDia = 20; // Ibuprofeno: aprox 20mg/kg/día
      medicamento = "Ibuprofeno";
    }

    const tomasAlDia = 24 / frecuencia;
    const dosisMl = (peso * mgKgDia) / (concentracion * tomasAlDia);
    
    resultValue.innerText = dosisMl.toFixed(2);
    if (pautaText) {
        pautaText.innerHTML = `Administrar <strong>${dosisMl.toFixed(2)} ml</strong> de ${medicamento} cada <strong>${frecuencia} horas</strong>.`;
    }
  } else {
    resultValue.innerText = "0.0";
    if (pautaText) pautaText.innerText = "Introduzca el peso para calcular la pauta.";
  }
}

// Eventos de la calculadora
if (weightInput) weightInput.addEventListener('input', calcularDosisPro);
if (medSelect) medSelect.addEventListener('change', calcularDosisPro);
freqRadios.forEach(r => r.addEventListener('change', calcularDosisPro));

