from llmeval.datasets import load_dataset
from llmeval.evaluators import get_evaluator

def test(task="gsm8k", limit=3):
    dataset = load_dataset(task)
    evaluator = get_evaluator(task)

    examples = dataset.get_examples(limit=limit)
    
    for i, ex in enumerate(examples):
        # Simulate a prediction (for now use reference directly or flip it to test)
        prediction = ex["answer"] if i % 2 == 0 else "wrong answer"
        score = evaluator.evaluate(prediction, ex["answer"])
        print(f"[{i}] Score: {score} | Pred: {prediction[:40]}... | Ref: {ex['answer'][:40]}...")

if __name__ == "__main__":
    test()
