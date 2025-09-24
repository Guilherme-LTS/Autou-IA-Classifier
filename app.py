import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Inicializa o aplicativo Flask
app = Flask(__name__)
# Habilita o CORS para permitir requisições do frontend
CORS(app)

# --- CONFIGURAÇÃO DA API HUGGING FACE ---
API_TOKEN = os.getenv("HF_API_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query_huggingface_api(payload):
    """Função para consultar a API de inferência do Hugging Face."""
    response = requests.post(API_URL, headers=headers, json=payload)
    # Lança um erro se a requisição falhar
    response.raise_for_status()
    return response.json()

# Define a rota principal da nossa API
@app.route('/classify', methods=['POST'])
def classify_email_route():
    """Recebe o texto do e-mail, classifica e sugere uma resposta."""
    data = request.get_json()
    if not data or 'email_text' not in data:
        return jsonify({"error": "O texto do e-mail ('email_text') é obrigatório."}), 400

    email_text = data['email_text']

    try:
        # --- Lógica de Classificação ---
        api_payload = {
            "inputs": email_text,
            "parameters": {"candidate_labels": ["Produtivo", "Improdutivo"]},
        }
        api_result = query_huggingface_api(api_payload)

        # Lógica para encontrar a melhor classificação (como discutimos)
        scores = api_result.get('scores', [])
        labels = api_result.get('labels', [])

        if not scores or not labels:
             return jsonify({"error": "Resposta inesperada da API de IA."}), 500

        highest_score_index = scores.index(max(scores))
        classification = labels[highest_score_index]

        # --- Lógica Simples para Sugerir Resposta (Placeholder) ---
        suggested_response = ""
        if classification == "Produtivo":
            suggested_response = "Obrigado pelo seu e-mail. Estamos analisando sua solicitação e retornaremos em breve."
        else: # Improdutivo
            suggested_response = "Agradecemos o contato. Sua mensagem foi recebida."

        # Monta a resposta final
        response_data = {
            "classification": classification,
            "suggested_response": suggested_response
        }

        return jsonify(response_data)

    except requests.exceptions.RequestException as e:
        # Captura erros de conexão com a API
        return jsonify({"error": f"Erro ao contatar a API de IA: {e}"}), 503
    except Exception as e:
        # Captura outros erros inesperados
        return jsonify({"error": f"Ocorreu um erro interno: {e}"}), 500

# Permite rodar o servidor diretamente com "python app.py"
if __name__ == '__main__':
    app.run(debug=True)