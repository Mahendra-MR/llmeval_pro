from datasets import load_dataset
from llmeval.datasets.base import BaseDataset

class ARC(BaseDataset):
    def get_examples(self, split="test", limit=None) -> list[dict]:
        ds = load_dataset("ai2_arc", "ARC-Challenge", split=split)
        examples = []
        for item in ds.select(range(limit)) if limit else ds:
            # ARC has MCQ format
            question = item["question"] + "\nOptions:\n" + "\n".join(
                [f"{chr(65+i)}. {opt}" for i, opt in enumerate(item["choices"]["text"])]
            )
            answer = item["answerKey"]
            examples.append({
                "question": question,
                "answer": answer
            })
        return examples
