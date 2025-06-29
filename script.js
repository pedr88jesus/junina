document.addEventListener('DOMContentLoaded', () => {
  inicializarAnimacoesScroll();
  configurarFormulario();
});

// Fade-in das seções com Intersection Observer
function inicializarAnimacoesScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fadeEls.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Configuração do formulário na página inscrição
function configurarFormulario() {
  const form = document.getElementById('formulario');
  if (!form) return; // só ativa se houver formulário

  const nome = form.querySelector('#nome');
  const turma = form.querySelector('#turma');
  const errorNome = document.getElementById('error-nome');
  const errorTurma = document.getElementById('error-turma');

  const modal = document.getElementById('modal-confirmacao');
  const btnFecharModal = modal?.querySelector('#fechar-modal');
  const confeteContainer = document.getElementById('confete-container');

  btnFecharModal?.addEventListener('click', () => {
    modal.classList.add('hidden');
    pararConfete();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

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

  // Confete animado
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
