document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para os links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Funcionalidade da Fogueira (JS para criar os elementos) ---
    const fogueiraContainer = document.getElementById('fogueira-container');
    if (fogueiraContainer) {
        // Criar lenhas
        for (let i = 0; i < 3; i++) {
            const lenha = document.createElement('div');
            lenha.classList.add('lenha');
            fogueiraContainer.appendChild(lenha);
        }
        // Criar fogo
        const fogo = document.createElement('div');
        fogo.classList.add('fogo');
        fogueiraContainer.appendChild(fogo);
    }

    // --- Funcionalidade do Balão Flutuante (JS para criar o elemento) ---
    const balloonContainer = document.getElementById('balloon-container');
    if (balloonContainer) {
        // O balão já está estilizado via CSS para a animação.
        // Se você quisesse criar vários balões ou controlá-los mais dinamicamente, usaria JS.
        // Por enquanto, o CSS já cuida da animação de um balão único.
        // O elemento #balloon-container já está no HTML.
    }

    // --- Lógica do Formulário de Inscrição e Confetes ---
    const formInscricao = document.getElementById('form-inscricao');
    const formMessage = document.getElementById('form-message');

    if (formInscricao) {
        formInscricao.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const nome = document.getElementById('nome').value.trim();
            const turma = document.getElementById('turma').value.trim();
            const email = document.getElementById('email').value.trim();
            const presenca = document.getElementById('presenca').value;

            // Validação simples
            if (nome === '' || turma === '' || presenca === '') {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                formMessage.className = 'message error';
                return;
            }

            // Substitua abaixo pela sua URL do Formspree
            const formspreeEndpoint = 'https://formspree.io/f/seu-codigo-do-formspree';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        turma: turma,
                        email: email,
                        presenca: presenca,
                        origem: 'Site Festa Junina Escola 11 de Outubro'
                    })
                });

                if (response.ok) {
                    formMessage.textContent = 'Sua presença foi confirmada com sucesso! Muito obrigado!';
                    formMessage.className = 'message success';
                    formInscricao.reset(); // Limpa o formulário

                    // --- CHUVA DE CONFETES! ---
                    triggerConfetti();

                } else {
                    const data = await response.json();
                    formMessage.textContent = `Erro ao enviar: ${data.errors ? data.errors.map(err => err.message).join(', ') : 'Tente novamente.'}`;
                    formMessage.className = 'message error';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                formMessage.textContent = 'Ocorreu um erro ao confirmar sua presença. Por favor, tente mais tarde.';
                formMessage.className = 'message error';
            }
        });
    }

    // --- Função para a Chuva de Confetes ---
    function triggerConfetti() {
        const confettiCount = 50;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -20}px`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2}) rotate(${Math.random() * 360}deg)`;

            document.body.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});
