from llmeval.datasets import load_dataset

dataset = load_dataset("gsm8k")
examples = dataset.get_examples(limit=2)

for ex in examples:
    print(f"Q: {ex['question']}\nA: {ex['answer']}\n")
