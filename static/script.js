// 1. Pega as referências dos elementos HTML que vamos usar
const emailInput = document.getElementById('email-input');
const classifyBtn = document.getElementById('classify-btn');
const resultsContainer = document.getElementById('results-container');
const classificationResult = document.getElementById('classification-result');
const suggestedResponse = document.getElementById('suggested-response');

// URL da nossa API Flask que está rodando localmente
const API_URL = 'http://127.0.0.1:5000/classify';

// 2. Adiciona um "escutador de eventos" ao botão de classificar
classifyBtn.addEventListener('click', async () => {
    const emailText = emailInput.value;

    // Validação simples para não enviar texto vazio
    if (!emailText.trim()) {
        alert('Por favor, insira o texto de um e-mail.');
        return;
    }

    // 3. Feedback visual para o usuário enquanto a IA processa
    classifyBtn.disabled = true;
    classifyBtn.textContent = 'Classificando...';
    resultsContainer.classList.add('hidden');

    try {
        // 4. A chamada para a nossa API (o "pulo do gato")
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_text: emailText }),
        });

        // Pega a resposta JSON do servidor
        const data = await response.json();

        // Se a resposta do servidor não for um sucesso (ex: erro 500)
        if (!response.ok) {
            // Mostra o erro que o nosso backend retornou
            throw new Error(data.error || 'Ocorreu um erro na API.');
        }

        // 5. Mostra os resultados na tela
        displayResults(data);

    } catch (error) {
        // Se der qualquer erro de conexão ou na API, mostra um alerta
        console.error('Erro ao classificar:', error);
        alert(`Falha na classificação: ${error.message}`);
    } finally {
        // 6. Reseta o botão para o estado original, independente de sucesso ou falha
        classifyBtn.disabled = false;
        classifyBtn.textContent = 'Classificar E-mail';
    }
});

function displayResults(data) {
    // Agora 'data' tem os campos: classification, summary, suggested_response, priority
    
    // Atualiza o HTML com os novos dados
    classificationResult.innerHTML = `
        <span class="tag tag-${data.priority.toLowerCase()}">${data.priority}</span> ${data.classification}
    `;
    
    // Adicionamos um novo campo para o resumo
    suggestedResponse.innerHTML = `
        <strong>Resumo:</strong> ${data.summary}<br><br>
        <strong>Sugestão de Resposta:</strong><br>
        ${data.suggested_response.replace(/\n/g, '<br>')}
    `;
    
    resultsContainer.classList.remove('hidden');
}