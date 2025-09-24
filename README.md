# 🤖 Case Prático AutoU: Classificador de E-mails com IA

Aplicação web desenvolvida como parte do processo seletivo da AutoU. A solução utiliza a API do Gemini para analisar, classificar e sugerir respostas para e-mails, otimizando o fluxo de trabalho e a produtividade.

---

### ✨ **Acesse a aplicação online aqui:**
[https://autou-ia-classifier.onrender.com](https://autou-ia-classifier.onrender.com)

---

## 🚀 Funcionalidades Principais

* **Análise Inteligente de E-mails:** O usuário pode colar o conteúdo de qualquer e-mail para análise.
* **Classificação Automática:** A IA classifica o e-mail em categorias úteis (ex: `Solicitação Urgente`, `Dúvida Técnica`, `Comercial`).
* **Sugestão de Resposta:** Para cada e-mail, uma resposta profissional e contextualizada é gerada automaticamente.
* **Priorização:** O sistema atribui um nível de prioridade (`Alta`, `Média`, `Baixa`) para ajudar na organização.
* **Interface Limpa e Intuitiva:** O design foca na simplicidade e na experiência do usuário.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **Backend:**
    * **Python:** Linguagem principal da aplicação.
    * **Flask:** Micro-framework para a criação da API REST.
    * **Google Gemini API:** Modelo de linguagem para a inteligência artificial.
    * **Gunicorn:** Servidor WSGI para produção.
* **Frontend:**
    * **HTML5:** Estrutura da página.
    * **CSS3:** Estilização e design.
    * **JavaScript (Vanilla):** Interatividade e comunicação com o backend (via `fetch` API).
* **Hospedagem:**
    * **Render:** Plataforma de nuvem para o deploy da aplicação.

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina.

**Pré-requisitos:**
* Python 3.x instalado.
* Git instalado.

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/](https://github.com/)[SEU_USUARIO_GITHUB]/[NOME_DO_REPOSITORIO].git
    cd [NOME_DO_REPOSITORIO]
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

Desenvolvido por **[Seu Nome Completo aqui]**.