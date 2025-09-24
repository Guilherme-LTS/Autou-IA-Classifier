# 🤖 Case Prático AutoU: Classificador de E-mails com IA

Aplicação web desenvolvida como parte do processo seletivo da AutoU. A solução utiliza a API do Gemini para analisar, classificar e sugerir respostas para e-mails, otimizando o fluxo de trabalho e a produtividade.

---

### ✨ **Acesse a aplicação online aqui:**
[https://autou-ia-classifier.onrender.com](https://autou-ia-classifier.onrender.com)

---

## 🚀 Funcionalidades Principais

* **Análise de E-mail com Gemini:** Utiliza a poderosa IA do Google para uma análise profunda do conteúdo dos e-mails.
* **Classificação Multicritério:** Vai além do básico, categorizando e-mails por:
    * **Conteúdo:** `Solicitação Urgente`, `Dúvida Técnica`, `Comercial`, etc.
    * **Prioridade:** `Alta`, `Média` ou `Baixa`, para organização imediata.
    * **Sentimento:** Detecta se o tom do e-mail é `Positivo 😊`, `Neutro 😐` ou `Negativo 😠`, permitindo uma triagem mais inteligente.
* **Geração de Respostas Contextuais:** Sugere uma resposta profissional e adequada, baseada no conteúdo e sentimento do e-mail.
* **Interface Avançada e Focada em UX:** Projetada para ser eficiente e agradável de usar:
    * **Temas Claro e Escuro (Dark Mode):** Para conforto visual em qualquer ambiente, com a preferência salva no navegador.
    * **Botão "Copiar Resposta":** Aumenta a produtividade permitindo copiar a sugestão com um clique.
    * **E-mails de Exemplo:** Facilita a demonstração e o teste rápido das capacidades da IA.
    * **Design Responsivo e Moderno:** Com animações suaves e feedback visual claro para o usuário.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **Backend:**
    * **Python:** Linguagem principal da aplicação.
    * **Flask:** Micro-framework para a criação da API REST.
    * **Google Gemini API:** Modelo de linguagem para a inteligência artificial.
    * **Gunicorn:** Servidor WSGI para produção.
* **Frontend:**
    * **HTML5:** Estrutura da página.
    * **CSS3:** Estilização e design (incluindo variáveis de CSS para temas).
    * **JavaScript (Vanilla):** Interatividade e comunicação com o backend (via `fetch` API).
* **Hospedagem:**
    * **Render:** Plataforma de nuvem para o deploy da aplicação.

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina.

**Pré-requisitos:**
* Python 3.13.4 instalado.
* Git instalado.

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Guilherme-LTS/Autou-IA-Classifier.git
    cd Autou-IA-Classifier
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate

    # macOS / Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure as variáveis de ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Dentro dele, adicione sua chave da API do Gemini:
        ```
        GEMINI_API_KEY="SUA_CHAVE_AQUI"
        ```

5.  **Inicie o servidor Flask:**
    ```bash
    flask --app app run
    ```
    O backend estará rodando em `http://127.0.0.1:5000`.

6.  **Abra o frontend:**
    * Navegue até a pasta `static` e abra o arquivo `index.html` no seu navegador.

---

<<<<<<< Updated upstream
<<<<<<< Updated upstream
Desenvolvido por **Guilherme Lucas Teixeira**.
=======
Desenvolvido por **Guilherme Lucas Teixeira Silva**.
>>>>>>> Stashed changes
=======
Desenvolvido por **Guilherme Lucas Teixeira Silva**.
>>>>>>> Stashed changes
