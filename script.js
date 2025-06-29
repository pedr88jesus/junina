// Função para exibir o modal e a explosão de confete
function mostrarModal() {
  const modal = document.getElementById('modal');
  modal.hidden = false;
  modal.classList.add('fade-in');
  startConfetti();
  setTimeout(() => stopConfetti(), 5000);
}

// Fechar modal ao clicar no botão
window.addEventListener('DOMContentLoaded', () => {
  const btnFechar = document.getElementById('btn-fechar-modal');
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      document.getElementById('modal').hidden = true;
    });
  }
});

// Envio do formulário via Formspree com feedback visual
const form = document.getElementById('formulario');
const submitButton = form.querySelector('button');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  submitButton.disabled = false;
  submitButton.textContent = 'Marcar Presença';

  if (response.ok) {
    form.reset();
    mostrarModal();
  } else {
    alert('Erro ao enviar. Tente novamente.');
  }
});

// Ativa animação fade-in ao rolar a página usando IntersectionObserver
function animarAoRolar() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
window.addEventListener('DOMContentLoaded', animarAoRolar);

// Confetti
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let animationFrame;

function startConfetti() {
  resizeCanvas();
  confettiParticles = [];
  for (let i = 0; i < 200; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5
    });
  }
  animateConfetti();
}

function stopConfetti() {
  cancelAnimationFrame(animationFrame);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.d;
    p.x += Math.sin(p.tilt);
  });
  animationFrame = requestAnimationFrame(animateConfetti);
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
