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

// 4. Barra de progreso de lectura superior de la web
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


// =========================================================================
// 7. LÓGICA REFINADA DEL TEST DE AUDICIÓN Y ESTILOS DE ANIMACIÓN
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inyección de estilos avanzados y animaciones elegantes para el laboratorio
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .tech-badge { display: inline-block; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; background: var(--text); color: var(--bg); padding: 4px 10px; margin-bottom: 15px; border-radius: 1px; }
    .calc-card { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; }
    .calc-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03); }
    body.dark .calc-card:hover { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
    
    /* Barra de progreso interna para el módulo de audición */
    .test-progress-wrapper { width: 100%; height: 2px; background: var(--accent); margin: 25px 0; overflow: hidden; position: relative; }
    .test-progress-fill { width: 0%; height: 100%; background: var(--text); transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    
    /* Caja de calibración */
    .calibration-box { background: var(--bg); border: 1px dashed var(--text); padding: 20px; text-align: center; margin: 20px 0; }
    .btn-audio-action { background: transparent; border: 1px solid var(--text); color: var(--text); padding: 10px 20px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.4s ease; width: 100%; }
    .btn-audio-action:hover { background: var(--text); color: var(--bg); }
    .micro-disclaimer { font-size: 0.65rem; color: var(--accent-dark); margin-top: 12px; line-height: 1.4; text-align: center; }
    
    /* Formato de pantalla de test */
    .test-meta { display: flex; flex-direction: column; align-items: center; margin-bottom: 15px; }
    .meta-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-dark); }
    .meta-value { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-style: italic; margin-top: 4px; }
    .frequency-hero-box { text-align: center; padding: 25px 0; border-top: 1px solid var(--accent); border-bottom: 1px solid var(--accent); margin-bottom: 25px; }
    .freq-number { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 300; line-height: 1; }
    .freq-unit { font-size: 1rem; color: var(--accent-dark); margin-left: 5px; text-transform: uppercase; letter-spacing: 1px; }
    
    /* Botón de reproducción interactivo con ondas de pulso */
    .test-action-area { display: flex; flex-direction: column; align-items: center; gap: 25px; }
    .btn-pulse-trigger { position: relative; background: var(--text); color: var(--bg); border: none; padding: 16px 32px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; z-index: 1; transition: transform 0.2s ease; width: 100%; text-align: center; }
    .btn-pulse-trigger:active { transform: scale(0.98); }
    .btn-pulse-trigger.playing .pulse-ring { position: absolute; inset: 0; border: 1px solid var(--text); pointer-events: none; animation: wavePulse 1.2s cubic-bezier(0.24, 0, 0, 1) infinite; }
    @keyframes wavePulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.3); opacity: 0; } }
    
    /* Contenedor editorial de resultados */
    .result-display-wrapper { background: var(--bg); padding: 25px; border-left: 2px solid var(--text); text-align: left; margin-top: 15px; }
    .result-status-indicator { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-dark); margin-bottom: 10px; }
    .editorial-result-text { font-size: 0.95rem; line-height: 1.6; color: var(--text); }
  `;
  document.head.appendChild(styleTag);

  // Adaptación de los elementos existentes en tu HTML para añadir los componentes elegantes
  const audioCard = document.querySelector('.calc-card[style*="margin-top: 40px"]');
  if (audioCard) {
    // Añadimos la insignia técnica arriba del título
    const header = audioCard.querySelector('.calc-header');
    if (header && !header.querySelector('.tech-badge')) {
      const badge = document.createElement('div');
      badge.className = 'tech-badge';
      badge.innerText = 'Módulo Interactivo';
      header.insertBefore(badge, header.firstChild);
    }
    
    // Añadimos la barra de progreso justo debajo del header
    if (!audioCard.querySelector('.test-progress-wrapper')) {
      const progressWrapper = document.createElement('div');
      progressWrapper.className = 'test-progress-wrapper';
      progressWrapper.innerHTML = '<div class="test-progress-fill" id="test-p-fill"></div>';
      header.parentNode.insertBefore(progressWrapper, header.nextSibling);
    }

    // Adaptamos el paso 1 para que use la estructura refinada de calibración
    const step1Container = document.getElementById('test-step-1');
    if (step1Container && !step1Container.querySelector('.calibration-box')) {
      const oldBtn = document.getElementById('btn-calibrate');
      const instruction = step1Container.querySelector('.test-instruction');
      
      const calibrationBox = document.createElement('div');
      calibrationBox.className = 'calibration-box';
      
      // Transformamos el botón antiguo
      oldBtn.className = 'btn-audio-action';
      oldBtn.style.width = '';
      
      const microDisclaimer = document.createElement('p');
      microDisclaimer.className = 'micro-disclaimer';
      microDisclaimer.innerText = 'Haz clic para emitir un tono y regula el volumen de tu sistema hasta que sea sutil pero claramente perceptible.';
      
      // Reestructurar dentro de la caja
      oldBtn.parentNode.replaceChild(calibrationBox, oldBtn);
      calibrationBox.appendChild(oldBtn);
      calibrationBox.appendChild(microDisclaimer);
    }

    // Adaptamos el paso 2 para envolver elementos con las clases de animación
    const step2Container = document.getElementById('test-step-2');
    if (step2Container && !step2Container.querySelector('.test-meta')) {
      const progressText = step2Container.querySelector('.test-progress-text');
      const earSpan = document.getElementById('current-ear');
      const freqDisplay = step2Container.querySelector('.test-frequency-display');
      const freqSpan = document.getElementById('current-freq');
      const playBtn = document.getElementById('btn-play-tone');
      const responseGrid = step2Container.querySelector('.audio-response-buttons');

      // Crear estructura meta
      const testMeta = document.createElement('div');
      testMeta.className = 'test-meta';
      testMeta.innerHTML = '<span class="meta-label">Fase actual</span>';
      earSpan.className = 'meta-value';
      testMeta.appendChild(earSpan);
      
      // Crear estructura Hero de frecuencias
      const freqHero = document.createElement('div');
      freqHero.className = 'frequency-hero-box';
      freqSpan.className = 'freq-number';
      const unitSpan = document.createElement('span');
      unitSpan.className = 'freq-unit';
      unitSpan.innerText = 'Hz';
      freqHero.appendChild(freqSpan);
      freqHero.appendChild(unitSpan);

      // Reconfigurar botón de reproducción
      playBtn.className = 'btn-pulse-trigger';
      playBtn.style.width = '';
      playBtn.innerHTML = '<span class="pulse-ring"></span><span class="btn-text">Reproducir Frecuencia</span>';

      // Reemplazar e integrar
      progressText.parentNode.replaceChild(testMeta, progressText);
      freqDisplay.parentNode.replaceChild(freqHero, freqDisplay);
      
      if (responseGrid) {
        responseGrid.className = 'audio-response-grid';
        responseGrid.style.all = 'unset'; // Limpiar inline anterior
      }
    }

    // Adaptamos el paso 3 para la vista editorial de resultados
    const step3Container = document.getElementById('test-step-3');
    if (step3Container && !step3Container.querySelector('.result-display-wrapper')) {
      const resultContainer = step3Container.querySelector('.result-container');
      const resultsText = document.getElementById('audio-results-text');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'result-display-wrapper';
      wrapper.innerHTML = '<div class="result-status-indicator">Análisis Completado</div>';
      
      resultsText.className = 'editorial-result-text';
      resultsText.style.all = 'unset';
      
      resultContainer.parentNode.replaceChild(wrapper, resultContainer);
      wrapper.appendChild(resultsText);
    }
  }

  // REORGANIZACIÓN DE LA LÓGICA DE CONTROL DE AUDICIÓN
  const frecuenciasTest = [500, 1000, 2000, 4000];
  let indiceFrecuenciaActual = 0;
  let oidoActual = 'izquierdo';
  let respuestas = { izquierdo: {}, derecho: {} };
  let audioCtx = null;

  const step1 = document.getElementById('test-step-1');
  const step2 = document.getElementById('test-step-2');
  const step3 = document.getElementById('test-step-3');
  const btnCalibrate = document.getElementById('btn-calibrate');
  const btnStartTest = document.getElementById('btn-start-test');
  const btnPlayTone = document.getElementById('btn-play-tone');
  const btnHeardYes = document.getElementById('btn-heard-yes');
  const btnHeardNo = document.getElementById('btn-heard-no');
  const btnRestartTest = document.getElementById('btn-restart-test');
  const displayEar = document.getElementById('current-ear');
  const displayFreq = document.getElementById('current-freq');
  const audioResultsText = document.getElementById('audio-results-text');
  const pFill = document.getElementById('test-p-fill');

  function initAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  function emiteTono(frecuencia, lado, volumen = 0.02, duracion = 1.2) {
    initAudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frecuencia, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volumen, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(volumen, audioCtx.currentTime + duracion - 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duracion);

    if (audioCtx.createStereoPanner) {
      const panner = audioCtx.createStereoPanner();
      panner.pan.setValueAtTime(lado === 'izquierdo' ? -1 : 1, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(audioCtx.destination);
    } else {
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    }
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duracion);
  }

  function switchStep(fromStep, toStep) {
    fromStep.classList.remove('active');
    setTimeout(() => {
      fromStep.style.display = 'none';
      toStep.style.display = 'block';
      setTimeout(() => toStep.classList.add('active'), 50);
    }, 400);
  }

  function actualizarInterfazTest() {
    displayEar.innerText = `Oído ${oidoActual === 'izquierdo' ? 'Izquierdo' : 'Derecho'}`;
    displayFreq.innerText = frecuenciasTest[indiceFrecuenciaActual];
    btnHeardYes.disabled = true;
    btnHeardNo.disabled = true;
    btnPlayTone.disabled = false;

    const pasoActual = oidoActual === 'izquierdo' ? indiceFrecuenciaActual : indiceFrecuenciaActual + 4;
    if (pFill) pFill.style.width = `${(pasoActual / 8) * 100}%`;
  }

  btnCalibrate.addEventListener('click', () => {
    emiteTono(1000, 'izquierdo', 0.05, 1.2);
    emiteTono(1000, 'derecho', 0.05, 1.2);
  });

  btnStartTest.addEventListener('click', () => {
    initAudioContext();
    switchStep(step1, step2);
    actualizarInterfazTest();
  });

  btnPlayTone.addEventListener('click', () => {
    btnPlayTone.classList.add('playing');
    btnPlayTone.disabled = true;
    emiteTono(frecuenciasTest[indiceFrecuenciaActual], oidoActual, 0.02, 1.2);

    setTimeout(() => {
      btnPlayTone.classList.remove('playing');
      btnHeardYes.disabled = false;
      btnHeardNo.disabled = false;
    }, 1200);
  });

  function registrarRespuesta(escuchado) {
    respuestas[oidoActual][frecuenciasTest[indiceFrecuenciaActual]] = escuchado;
    indiceFrecuenciaActual++;

    if (indiceFrecuenciaActual < frecuenciasTest.length) {
      actualizarInterfazTest();
    } else if (oidoActual === 'izquierdo') {
      oidoActual = 'derecho';
      indiceFrecuenciaActual = 0;
      actualizarInterfazTest();
    } else {
      if (pFill) pFill.style.width = '100%';
      switchStep(step2, step3);
      procesarResultados();
    }
  }

  btnHeardYes.addEventListener('click', () => registrarRespuesta(true));
  btnHeardNo.addEventListener('click', () => registrarRespuesta(false));

  function procesarResultados() {
    let fallosIzquierdo = Object.values(respuestas.izquierdo).filter(v => v === false).length;
    let fallosDerecho = Object.values(respuestas.derecho).filter(v => v === false).length;
    
    if (fallosIzquierdo === 0 && fallosDerecho === 0) {
      audioResultsText.innerHTML = "<strong>¡Excelente!</strong> Has detectado todas las frecuencias conversacionales analizadas. Tu capacidad auditiva responde de forma óptima en este entorno de prueba.";
    } else {
      audioResultsText.innerHTML = `El cribado detecta sutiles variaciones en la percepción de ciertos tonos.<br><br>
                 <strong>Resumen del análisis:</strong><br>
                 • Oído Izquierdo: percibidas ${frecuenciasTest.length - fallosIzquierdo} de ${frecuenciasTest.length}.<br>
                 • Oído Derecho: percibidas ${frecuenciasTest.length - fallosDerecho} de ${frecuenciasTest.length}.<br><br>
                 Como audioprotesista, te sugiero realizar un estudio completo en un centro especializado si notas fatiga auditiva en reuniones o dificultades de comprensión en ambientes con ruido de fondo.`;
    }
  }

  btnRestartTest.addEventListener('click', () => {
    indiceFrecuenciaActual = 0;
    oidoActual = 'izquierdo';
    respuestas = { izquierdo: {}, derecho: {} };
    if (pFill) pFill.style.width = '0%';
    switchStep(step3, step1);
    setTimeout(() => {
      actualizarInterfazTest();
    }, 450);
  });
});

