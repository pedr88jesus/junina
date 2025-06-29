// Função para exibir o modal e a explosão de confete
function mostrarModal() {
  const modal = document.getElementById('modal');
  modal.hidden = false;
  startConfetti();
  setTimeout(() => stopConfetti(), 5000);
}

// Fechar modal
window.addEventListener('DOMContentLoaded', () => {
  const btnFechar = document.getElementById('btn-fechar-modal');
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      document.getElementById('modal').hidden = true;
    });
  }
});

// Envio do formulário com interceptação
const form = document.getElementById('formulario');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    mostrarModal();
  } else {
    alert('Ocorreu um erro. Tente novamente.');
  }
});

// Aplica animação fade-in quando a seção entra na viewport
function animarAoRolar() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animarAoRolar);
window.addEventListener('load', animarAoRolar);

// Confetti animation (usando canvas)
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
