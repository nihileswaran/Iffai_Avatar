from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load embedding model (small and fast)
model = SentenceTransformer("all-MiniLM-L6-v2")

# Read full knowledge file
with open("knowledge.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Split into chunks (VERY IMPORTANT)
chunk_size = 800
chunks = []
 
for i in range(0, len(text), chunk_size):
    chunk = text[i:i+chunk_size]
    chunks.append(chunk)

print(f"Total chunks created: {len(chunks)}")

# Create embeddings
embeddings = model.encode(chunks)

# Create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# Save index and chunks
faiss.write_index(index, "vector_db.index")
np.save("texts.npy", np.array(chunks))

print("Knowledge database rebuilt successfully")