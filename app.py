import os
import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from flask import Flask, request, jsonify, send_from_directory

# Carrega as variáveis de ambiente
load_dotenv()

# Inicializa o Flask
app = Flask(__name__)
CORS(app)



# --- CONFIGURAÇÃO DA API GEMINI ---
try:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash-latest') # Usando um modelo mais recente e rápido
except Exception as e:
    print(f"Erro ao configurar a API Gemini: {e}")
    model = None

# --- PROMPT ESTRUTURADO PARA O GEMINI ---
# Este prompt é a nova "inteligência" do nosso app.
# Ele instrui o Gemini a agir como um assistente e retornar um JSON.
# Dentro da string PROMPT_TEMPLATE em app.py

PROMPT_TEMPLATE = """
Analise o seguinte e-mail e retorne um objeto JSON com a seguinte estrutura:
{{
  "classification": "...",
  "summary": "...",
  "suggested_response": "...",
  "priority": "...",
  "sentiment": "..." 
}}

- "classification": Classifique o e-mail em uma das seguintes categorias: 'Solicitação Urgente', 'Dúvida Técnica', 'Comercial', 'Feedback', 'Agradecimento', 'Outros'.
- "summary": Um resumo de uma frase do conteúdo do e-mail.
- "suggested_response": Uma resposta adequada e profissional, em português, baseada no conteúdo do e-mail.
- "priority": A prioridade da resposta, classificada como 'Alta', 'Média' ou 'Baixa'.
- "sentiment": O sentimento geral do e-mail, classificado como 'Positivo', 'Neutro' ou 'Negativo'.

Não inclua ```json ou ``` no início ou no fim da sua resposta. Responda apenas com o JSON.

E-mail para análise:
---
{email_text}
---
"""

# Rota para servir o frontend (o arquivo index.html e outros arquivos estáticos)
@app.route('/')
def serve_frontend():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('static', path)

@app.route('/classify', methods=['POST'])
def classify_email_route():
    if not model:
        return jsonify({"error": "Modelo de IA não foi inicializado corretamente."}), 500
        
    data = request.get_json()
    if not data or 'email_text' not in data:
        return jsonify({"error": "O texto do e-mail ('email_text') é obrigatório."}), 400

    email_text = data['email_text']

    try:
        # Formata o prompt com o e-mail recebido
        full_prompt = PROMPT_TEMPLATE.format(email_text=email_text)
        
        # Chama a API do Gemini
        response = model.generate_content(full_prompt)
        
        # O Gemini retorna um texto que esperamos ser um JSON. Vamos convertê-lo.
        # Adicionamos um bloco de segurança para caso a resposta não seja um JSON válido.
        try:
            # Limpa a resposta de possíveis marcações de código que o LLM pode adicionar
            cleaned_response = response.text.strip().replace('```json', '').replace('```', '')
            response_data = json.loads(cleaned_response)
        except (json.JSONDecodeError, AttributeError) as e:
            print(f"Alerta: A resposta da IA não foi um JSON válido. Resposta recebida: {response.text}")
            return jsonify({"error": f"A resposta da IA não pôde ser processada. Detalhes: {e}"}), 500
            
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro ao processar com a IA: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)