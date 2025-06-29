// Animação de seções quando aparecem na tela
function animarSecoes() {
  const secoes = document.querySelectorAll('.secao');
  const windowHeight = window.innerHeight;

  secoes.forEach(secao => {
    const posTop = secao.getBoundingClientRect().top;

    if (posTop < windowHeight * 0.85) {
      secao.classList.add('visivel');
    }
  });
}

// Validação e feedback do formulário
function validarFormulario() {
  const form = document.getElementById('formulario');
  const nomeInput = form.nome;
  const turmaInput = form.turma;
  const nomeErro = document.getElementById('erro-nome');
  const turmaErro = document.getElementById('erro-turma');
  const listaConfirmados = document.getElementById('confirmados');
  const modal = document.getElementById('modal');
  const btnFecharModal = document.getElementById('btn-fechar-modal');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valido = true;

    if (nomeInput.value.trim().length < 2) {
      nomeErro.textContent = 'Por favor, insira um nome válido (mínimo 2 caracteres).';
      valido = false;
    } else {
      nomeErro.textContent = '';
    }

    if (turmaInput.value.trim().length < 1) {
      turmaErro.textContent = 'Por favor, insira sua turma.';
      valido = false;
    } else {
      turmaErro.textContent = '';
    }

    if (!valido) return;

    // Adiciona à lista
    const li = document.createElement('li');
    li.textContent = `${nomeInput.value.trim()} (Turma: ${turmaInput.value.trim()})`;
    listaConfirmados.appendChild(li);

    // Anima entrada do item
    setTimeout(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    }, 10);

    form.reset();

    // Mostrar modal
    modal.hidden = false;

    // Focar botão fechar modal para acessibilidade
    btnFecharModal.focus();
  });

  // Evento para fechar modal ao clicar no botão
  btnFecharModal.addEventListener('click', () => {
    modal.hidden = true;
  });

  // Fechar modal ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
    }
  });
}

// Animações do botão confirmar
function animarBotaoConfirmar() {
  const botao = document.querySelector('button[type="submit"]');
  botao.addEventListener('mouseenter', () => {
    botao.textContent = '🌽 Confirmar 🌽';
    botao.style.transform = 'scale(1.05)';
  });
  botao.addEventListener('mouseleave', () => {
    botao.textContent = 'Confirmar';
    botao.style.transform = 'scale(1)';
  });
}

// Inicialização geral
function inicializarSite() {
  validarFormulario();
  animarBotaoConfirmar();
  animarSecoes();
  window.addEventListener('scroll', animarSecoes);
}

document.addEventListener('DOMContentLoaded', inicializarSite);
