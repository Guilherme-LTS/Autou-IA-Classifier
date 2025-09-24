import os
import requests
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Pega o token da API do ambiente
API_TOKEN = os.getenv("HF_API_TOKEN")
if not API_TOKEN:
    raise ValueError("API Token não encontrado. Verifique seu arquivo .env")

# URL da API para o modelo de classificação "zero-shot"
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"

# Cabeçalho para autenticação
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def classify_email(email_text):
    """
    Envia o texto de um e-mail para a API do Hugging Face para classificação.
    """
    payload = {
        "inputs": email_text,
        "parameters": {
            "candidate_labels": ["Produtivo", "Improdutivo"]
        },
    }
    response = requests.post(API_URL, headers=headers, json=payload)

    # Verifica se a API retornou um erro
    if response.status_code != 200:
        return f"Erro na API: {response.text}"

    return response.json()

# --- TEXTO DE E-MAIL PARA TESTE ---
# Altere este texto para testar diferentes cenários
sample_email = """
Olá equipe,

Gostaria de solicitar uma atualização sobre o status do ticket #582-B. 
O cliente está aguardando um retorno sobre a correção do bug no login.

Obrigado,
Guilherme
"""

# Chama a função e imprime o resultado
result = classify_email(sample_email)
print("Resultado da Classificação:")
print(result)