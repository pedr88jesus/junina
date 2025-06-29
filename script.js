// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  inicializarMenu();
  inicializarAnimacoesScroll();
  inicializarBalao();
  configurarFormulario();
});

// Menu fixo (ativa link da página atual)
function inicializarMenu() {
  const links = document.querySelectorAll('.menu a');
  links.forEach(link => {
    if (link.href === window.location.href || link.href === window.location.origin + window.location.pathname) {
      link.classList.add('active');
    }
  });
}

// Animação fade-in das seções ao rolar a página
function inicializarAnimacoesScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Balão animado (cria e adiciona no body)
function inicializarBalao() {
  const balao = document.createElement('div');
  balao.classList.add('balao-animado');
  document.body.appendChild(balao);
}

// Formulário: validação, envio e modal + confete
function configurarFormulario() {
  const form = document.getElementById('formulario');
  if (!form) return; // não executar se não existir no documento

  const nome = form.querySelector('#nome');
  const turma = form.querySelector('#turma');
  const errorNome = document.getElementById('error-nome');
  const errorTurma = document.getElementById('error-turma');

  const modal = document.getElementById('modal-confirmacao');
  const btnFecharModal = modal ? modal.querySelector('#fechar-modal') : null;
  const confeteContainer = document.getElementById('confete-container');

  btnFecharModal?.addEventListener('click', () => {
    modal.classList.add('hidden');
    pararConfete();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset erros
    errorNome.textContent = '';
    errorTurma.textContent = '';

    let valid = true;

    if (nome.value.trim() === '') {
      errorNome.textContent = 'Por favor, preencha o nome.';
      valid = false;
    }
    if (turma.value.trim() === '') {
      errorTurma.textContent = 'Por favor, preencha a turma.';
      valid = false;
    }
    if (!valid) return;

    // Dados para enviar
    const dados = new FormData(form);

    try {
      const resposta = await fetch(form.action, {
        method: form.method,
        body: dados,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (resposta.ok) {
        form.reset();
        modal.classList.remove('hidden');
        iniciarConfete();
      } else {
        alert('Erro ao enviar. Por favor, tente novamente.');
      }
    } catch (error) {
      alert('Erro na conexão. Tente novamente mais tarde.');
    }
  });

  // --- Confete ---
  let confetePieces = [];
  let confeteInterval = null;

  function criarConfete() {
    const confete = document.createElement('div');
    confete.classList.add('confete');
    confete.style.left = Math.random() * window.innerWidth + 'px';
    confete.style.backgroundColor = randomCorConfete();
    confete.style.animationDuration = 2 + Math.random() * 1.5 + 's';
    confete.style.opacity = 1;
    confeteContainer.appendChild(confete);

    // Animar queda e fade
    confete.style.animationName = 'confeteQueda';
    confete.style.animationTimingFunction = 'ease-in';
    confete.style.animationFillMode = 'forwards';

    setTimeout(() => {
      confete.remove();
      confetePieces = confetePieces.filter(c => c !== confete);
    }, 3000);

    confetePieces.push(confete);
  }

  function iniciarConfete() {
    if (confeteInterval) clearInterval(confeteInterval);
    confeteInterval = setInterval(criarConfete, 150);
    setTimeout(() => {
      pararConfete();
    }, 3500);
  }

  function pararConfete() {
    clearInterval(confeteInterval);
    confetePieces.forEach(c => c.remove());
    confetePieces = [];
  }

  function randomCorConfete() {
    const cores = ['#f44336', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#9c27b0'];
    return cores[Math.floor(Math.random() * cores.length)];
  }
}
