// BALÕES FLUTUANTES
window.onload = () => {
  for (let i = 0; i < 6; i++) {
    const balao = document.createElement("img");
    balao.src = "https://i.ibb.co/ZKbb06W/balao.png";
    balao.className = "balao-flutuante";
    balao.style.left = `${Math.random() * 100}vw`;
    balao.style.animationDuration = `${5 + Math.random() * 4}s`;
    document.body.appendChild(balao);

    // Remover após subir
    setTimeout(() => {
      balao.remove();
    }, 10000);
  }
};
