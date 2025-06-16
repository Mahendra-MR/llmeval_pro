from datasets import load_dataset
from llmeval.datasets.base import BaseDataset

class GSM8K(BaseDataset):
    def get_examples(self, split="test", limit=None) -> list[dict]:
        ds = load_dataset("gsm8k", "main", split=split)
        examples = []
        for item in ds.select(range(limit)) if limit else ds:
            examples.append({
                "question": item["question"],
                "answer": item["answer"]
            })
        return examples
