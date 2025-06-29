// Fade in animation ao rolar
function animaSecoes() {
  const elementos = document.querySelectorAll('.fade-in');
  const windowMetade = window.innerHeight * 0.8;

  elementos.forEach(el => {
    const topoElemento = el.getBoundingClientRect().top;
    if (topoElemento < windowMetade) {
      el.classList.add('visible');
    }
  });
}

// Validação simples do formulário com feedback
function validarFormulario(form) {
  let valido = true;
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
    const erroEl = input.nextElementSibling;
    if (!input.checkValidity()) {
      erroEl.textContent = input.validationMessage;
      valido = false;
    } else {
      erroEl.textContent = '';
    }
  });
  return valido;
}

// Modal confirmação
function abrirModal() {
  const modal = document.getElementById('modalConfirmacao');
  modal.classList.remove('hidden');
}

function fecharModal() {
  const modal = document.getElementById('modalConfirmacao');
  modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  // Anima seções
  animaSecoes();
  window.addEventListener('scroll', animaSecoes);

  // Formulário
  const form = document.getElementById('formulario');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validarFormulario(form)) return;

      // Enviar para Formspree
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          abrirModal();
          form.reset();
          animarConfete();
        } else {
          alert('Erro ao enviar, tente novamente mais tarde.');
        }
      } catch {
        alert('Erro de rede, verifique sua conexão.');
      }
    });

    // Fechar modal botão
    const btnFechar = document.getElementById('btnFecharModal');
    btnFechar.addEventListener('click', fecharModal);

    // Fechar modal ao clicar fora do conteúdo
    const modal = document.getElementById('modalConfirmacao');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal();
    });
  }
});

// Confetes animados
function animarConfete() {
  const cores = ['#f44336', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#9c27b0'];
  const confetes = [];

  for (let i = 0; i < 150; i++) {
    const confete = document.createElement('div');
    confete.classList.add('confete');
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confete.style.left = Math.random() * window.innerWidth + 'px';
    confete.style.animationDelay = (Math.random() * 2) + 's';
    confete.style.width = confete.style.height = (Math.random() * 8 + 5) + 'px';
    confete.style.opacity = Math.random();
    document.body.appendChild(confete);
    confetes.push(confete);
  }

  setTimeout(() => {
    confetes.forEach(c => c.remove());
  }, 4000);
}
