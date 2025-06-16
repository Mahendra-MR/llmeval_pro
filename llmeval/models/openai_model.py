import os
from dotenv import load_dotenv
from openai import OpenAI
from llmeval.models.base import BaseModel

# Load environment variables from .env
load_dotenv()

class OpenAIModel(BaseModel):
    def __init__(self, model_name="gpt-3.5-turbo"):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables.")
        self.client = OpenAI(api_key=api_key)
        self.model_name = model_name

    def generate(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
