document.addEventListener('DOMContentLoaded', () => {
    ('Página carregada e script iniciado.'); // LOG 1

    // --- ELEMENTOS DO DOM ---
    const emailInput = document.getElementById('email-input');
    const classifyBtn = document.getElementById('classify-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsContainer = document.getElementById('results-container');
    const classificationResult = document.getElementById('classification-result');
    const suggestedResponse = document.getElementById('suggested-response');
    const copyBtn = document.getElementById('copy-btn');
    const notification = document.getElementById('notification');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const exampleBtns = document.querySelectorAll('.example-btn');

    const btnText = classifyBtn.querySelector('.btn-text');
    const spinner = classifyBtn.querySelector('.spinner');

    const API_URL = '/classify';

    // ... (O resto do código de exemplos e tema continua igual) ...
    const examples = {
        urgent: `Olá equipe,\n\nEstou escrevendo pois nosso sistema de pagamentos está fora do ar e não conseguimos processar nenhuma venda há mais de 30 minutos. Nossos clientes estão reclamando.\n\nPrecisamos de uma solução urgente!\n\nAtt,\nJoão Silva`,
        thanks: `Oi Maria,\n\nSó passando para agradecer pela ajuda com o relatório hoje. Você salvou meu dia!\n\nMuito obrigado!\n\nAbraço,\nCarlos`,
        spam: `PARABÉNS! Você foi selecionado para uma oferta imperdível! Clique aqui e ganhe 90% de desconto em nossos produtos. Não perca tempo, é por tempo limitado! Compre agora!`
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);


    // --- LÓGICA PRINCIPAL ---
    const showLoading = (isLoading) => {
        if (isLoading) {
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            classifyBtn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            classifyBtn.disabled = false;
        }
    };
    
    const showNotification = (message) => {
        ('Mostrando notificação:', message); // LOG 2
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    const displayResults = (data) => {
    // Objeto para mapear o nome do sentimento para o ícone
    const sentimentIcons = {
        'Positivo': '😊',
        'Neutro': '😐',
        'Negativo': '😠'
    };

    // Atualiza a linha da classificação para incluir o ícone de sentimento
    classificationResult.innerHTML = `
        <span class="tag tag-${data.priority.toLowerCase()}">${data.priority}</span> 
        ${data.classification}
        <span class="sentiment" title="Sentimento: ${data.sentiment}">${sentimentIcons[data.sentiment] || ''}</span>
    `;

    // A parte da sugestão de resposta continua igual
    suggestedResponse.innerHTML = `
        <strong>Resumo:</strong> ${data.summary}<br><br>
        <strong>Sugestão de Resposta:</strong><br>
        <span id="response-text">${data.suggested_response.replace(/\n/g, '<br>')}</span>`;
    
    // Mostra o container de resultados
    resultsContainer.classList.add('visible');
    };

    classifyBtn.addEventListener('click', async () => {
        ('Botão "Classificar" clicado!'); // LOG 5
        const emailText = emailInput.value;
        if (!emailText.trim()) {
            showNotification('Por favor, insira o texto de um e-mail.');
            return;
        }

        showLoading(true);
        resultsContainer.classList.remove('visible');

        try {
            ('Iniciando chamada para a API...'); // LOG 6
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_text: emailText }),
            });
            
            ('Resposta da API recebida. Status:', response.status); // LOG 7
            const data = await response.json();
            ('Dados da API (em formato JSON):', data); // LOG 8

            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro na API.');
            }
            displayResults(data);

        } catch (error) {
            console.error('--- ERRO CAPTURADO ---', error); // LOG 9 - ERRO
            showNotification(`Falha na classificação: ${error.message}`);
        } finally {
            showLoading(false);
            ('Execução finalizada (bloco finally).'); // LOG 10
        }
    });

    // ... (O resto do código de clear, copy e examples continua igual) ...
    clearBtn.addEventListener('click', () => {
        emailInput.value = '';
        resultsContainer.classList.remove('visible');
    });

    copyBtn.addEventListener('click', () => {
        const responseTextElement = document.getElementById('response-text');
        if (responseTextElement) {
            navigator.clipboard.writeText(responseTextElement.innerText)
                .then(() => showNotification('Resposta copiada para a área de transferência!'))
                .catch(err => showNotification('Falha ao copiar texto.'));
        }
    });
    
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const exampleType = btn.dataset.example;
            emailInput.value = examples[exampleType];
        });
    });
});