from datasets import load_dataset
from llmeval.datasets.base import BaseDataset

class TruthfulQA(BaseDataset):
    def get_examples(self, split="validation", limit=None) -> list[dict]:
        ds = load_dataset("truthful_qa", "generation", split=split)
        examples = []
        for item in ds.select(range(limit)) if limit else ds:
            examples.append({
                "question": item["question"],
                "answer": item["best_answer"]
            })
        return examples
