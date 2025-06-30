// Confetes animados
const confeteCanvas = document.getElementById("confete");
const ctx = confeteCanvas.getContext("2d");
confeteCanvas.width = window.innerWidth;
confeteCanvas.height = window.innerHeight;

let confetes = [];
for (let i = 0; i < 150; i++) {
  confetes.push({
    x: Math.random() * confeteCanvas.width,
    y: Math.random() * confeteCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetes() {
  ctx.clearRect(0, 0, confeteCanvas.width, confeteCanvas.height);
  for (let i = 0; i < confetes.length; i++) {
    let p = confetes[i];
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += Math.cos(p.d) + 1;
    p.x += Math.sin(p.d);
    if (p.y > confeteCanvas.height) {
      p.y = 0;
      p.x = Math.random() * confeteCanvas.width;
    }
  }
  requestAnimationFrame(drawConfetes);
}
drawConfetes();

// Fogos de artifício simples
const fogosCanvas = document.getElementById("fogos");
const fx = fogosCanvas.getContext("2d");
fogosCanvas.width = window.innerWidth;
fogosCanvas.height = window.innerHeight;

function criarFogos() {
  const x = Math.random() * fogosCanvas.width;
  const y = Math.random() * fogosCanvas.height / 2;
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x, y,
      dx: (Math.random() - 0.5) * 5,
      dy: (Math.random() - 0.5) * 5,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function animate() {
    fx.fillStyle = "rgba(0, 0, 0, 0.2)";
    fx.fillRect(0, 0, fogosCanvas.width, fogosCanvas.height);

    particles.forEach(p => {
      fx.globalAlpha = p.alpha;
      fx.fillStyle = p.color;
      fx.beginPath();
      fx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      fx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.02;
    });

    particles.filter(p => p.alpha > 0);

    if (particles.some(p => p.alpha > 0)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

setInterval(criarFogos, 2000);
