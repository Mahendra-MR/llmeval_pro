from transformers import pipeline
from llmeval.models.base import BaseModel

class HuggingFaceModel(BaseModel):
    def __init__(self, model_name="google/flan-t5-base"):
        self.generator = pipeline("text2text-generation", model=model_name)

    def generate(self, prompt: str) -> str:
        output = self.generator(prompt, max_new_tokens=100)
        return output[0]['generated_text']
