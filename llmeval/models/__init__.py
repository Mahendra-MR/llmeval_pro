# llmeval/models/__init__.py
from .base import BaseModel
from .openai_model import OpenAIModel
from .hf_model import HFModel

def get_model(name: str) -> BaseModel:
    name = name.lower()
    if name in ("openai", "gpt", "gpt-4", "gpt-3.5"):
        return OpenAIModel(model_name=name)
    if name in ("hf", "huggingface"):
        return HFModel()
    raise ValueError(f"Unknown model: {name}")
