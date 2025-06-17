from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize your Hugging Face model pipeline
generator = pipeline("text2text-generation", model="google/flan-t5-base")

@app.post("/generate")
async def generate_text(request: Request):
    body = await request.json()
    prompt = body.get("prompt", "")
    model = body.get("model", "default")

    if not prompt:
        return {"error": "Prompt is required"}

    print(f"Received prompt: {prompt} | Model: {model}")

    result = generator(prompt, max_new_tokens=100)
    generated = result[0].get("generated_text", "No text generated")
    print(f"Generated: {generated}")

    return {"result": generated}
