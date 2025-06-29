function configurarFormulario() {
  const form = document.getElementById('formulario');
  const lista = document.getElementById('confirmados');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const turma = document.getElementById('turma').value.trim();

    if (nome === '' || turma === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = `${nome} (Turma: ${turma})`;
    lista.appendChild(li);

    form.reset();
  });
}

function adicionarBandeirinhas() {
  const bandeirinhas = document.createElement('div');
  bandeirinhas.innerHTML = '🎏 🎏 🎏 🎏 🎏 🎏 🎏 🎏 🎏 🎏';
  bandeirinhas.style.textAlign = 'center';
  bandeirinhas.style.fontSize = '2rem';
  bandeirinhas.style.marginTop = '10px';
  document.querySelector('header').prepend(bandeirinhas);
}

function adicionarFogueira() {
  const fogueira = document.createElement('div');
  fogueira.innerHTML = '🔥 Fogueira acesa pra esquentar o forró!';
  fogueira.style.textAlign = 'center';
  fogueira.style.marginTop = '20px';
  fogueira.style.fontSize = '1.2rem';
  document.querySelector('footer').appendChild(fogueira);
}

function animarBotaoConfirmar() {
  const botao = document.querySelector('button');
  botao.addEventListener('mouseenter', () => {
    botao.innerText = '🌽 Confirmar 🌽';
    botao.style.transform = 'scale(1.05)';
  });
  botao.addEventListener('mouseleave', () => {
    botao.innerText = 'Confirmar';
    botao.style.transform = 'scale(1)';
  });
}

function inicializarSite() {
  configurarFormulario();
  adicionarBandeirinhas();
  adicionarFogueira();
  animarBotaoConfirmar();
}

document.addEventListener('DOMContentLoaded', inicializarSite);
