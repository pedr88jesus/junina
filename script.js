// BALÕES FLUTUANTES
window.onload = () => {
  function criarBalao() {
    const balao = document.createElement("img");
    balao.src = "https://i.ibb.co/ZKbb06W/balao.png";
    balao.className = "balao-flutuante";
    balao.style.left = `${Math.random() * 100}vw`;
    balao.style.animationDuration = `${5 + Math.random() * 5}s`;
    document.body.appendChild(balao);

    setTimeout(() => {
      balao.remove();
      criarBalao(); // cria outro balao infinito
    }, 10000);
  }

  for (let i = 0; i < 6; i++) {
    criarBalao();
  }
};

// CONFETE NO ENVIO DE FORMULÁRIO
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    criarConfete();

    setTimeout(() => {
      form.submit();
    }, 1500);
  });

  function criarConfete() {
    const cores = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
    const numConfetes = 100;

    for(let i=0; i < numConfetes; i++) {
      const confete = document.createElement('div');
      confete.classList.add('confete');
      confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
      confete.style.left = Math.random() * 100 + 'vw';
      confete.style.animationDuration = 2 + Math.random() * 3 + 's';
      confete.style.opacity = Math.random();
      document.body.appendChild(confete);

      confete.addEventListener('animationend', () => confete.remove());
    }
  }
});
