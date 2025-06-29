// Função para animação das seções na rolagem
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

// Validação simples do formulário e feedback
function validarFormulario() {
  const form = document.getElementById('formulario');
  const nomeInput = form.nome;
  const turmaInput = form.turma;
  const nomeErro = nomeInput.nextElementSibling;
  const turmaErro = turmaInput.nextElementSibling;
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

    // Criar novo item na lista com animação
    const li = document.createElement('li');
    li.textContent = `${nomeInput.value.trim()} (Turma: ${turmaInput.value.trim()})`;
    listaConfirmados.appendChild(li);

    // Limpar campos
    form.reset();

    // Mostrar modal
    modal.hidden = false;
  });

  btnFecharModal.addEventListener('click', () => {
    modal.hidden = true;
  });

  // Fechar modal com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
    }
  });
}

// Função para destacar link ativo no menu conforme rola a página
function destacarMenu() {
  const links = document.querySelectorAll('.menu-fixo a');
  const secoes = Array.from(links).map(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return null;
    return document.querySelector(href);
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    secoes.forEach((secao, idx) => {
      if (!secao) return;
      if (scrollPos >= secao.offsetTop) {
        links.forEach(l => l.classList.remove('ativo'));
        links[idx].classList.add('ativo');
      }
    });
  });
}

function inicializarSite() {
  animarSecoes();
  validarFormulario();
  destacarMenu();

  window.addEventListener('scroll', animarSecoes);
}

document.addEventListener('DOMContentLoaded', inicializarSite);
