from flask import Flask, request, jsonify, render_template
from openai import OpenAI
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Load embedding model
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Load vector database
index = faiss.read_index("vector_db.index")
texts = np.load("texts.npy", allow_pickle=True)

@app.route("/")
def home():
    return render_template("index.html")

def search_knowledge(query):
    query_embedding = embed_model.encode([query])
    D, I = index.search(np.array(query_embedding), k=6)

    results = []

    for i, distance in zip(I[0], D[0]):
        if distance < 1.8:
            results.append(texts[i])

    # fallback protection
    if len(results) == 0:
        results.append(texts[I[0][0]])

    return "\n".join(results)
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    knowledge = search_knowledge(user_message)

    system_prompt = f"""
    You are the official AI Avatar of IFFAI, speaking out loud to a visitor.

    STRICT RULES:
    - Reply in 1 to 2 short sentences only. Never more.
    - Be direct and conversational, like spoken words — no bullet points, no lists.
    - Use the knowledge base below to answer. Do not make up information.
    - If unsure, say so in one sentence.

    KNOWLEDGE BASE:
    {knowledge}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.2,    
        max_tokens=100,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )

    reply = response.choices[0].message.content

    print("Knowledge used:\n", knowledge)

    return jsonify({"reply": reply})
@app.after_request
def allow_iframe(response):
    response.headers["X-Frame-Options"] = "ALLOWALL"
    return response

if __name__ == "__main__":
    app.run(debug=True)