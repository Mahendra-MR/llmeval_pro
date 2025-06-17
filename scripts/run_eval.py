import click
import json
from datetime import datetime
from llmeval.models.openai_model import OpenAIModel
from llmeval.models.hf_model import HuggingFaceModel
from llmeval.datasets import load_dataset
from llmeval.evaluators import get_evaluator
from llmeval.prompts.template import apply_prompt_template
from llmeval.prompts.fewshot import get_fewshot_examples

MODEL_REGISTRY = {
    "openai": OpenAIModel,
    "hf": HuggingFaceModel,
}

@click.command()
@click.option('--model', type=click.Choice(list(MODEL_REGISTRY.keys())), required=True)
@click.option('--task', type=click.Choice(['gsm8k', 'truthfulqa', 'arc']), required=True)
@click.option('--limit', type=int, default=5)
@click.option('--output', type=str, default=None)
def run_eval(model, task, limit, output):
    model_instance = MODEL_REGISTRY[model]()
    dataset = load_dataset(task)
    evaluator = get_evaluator(task)
    fewshot = get_fewshot_examples(task)

    results = []
    examples = dataset.get_examples(limit=limit)

    for i, ex in enumerate(examples):
        prompt = apply_prompt_template(ex, task, fewshot=fewshot)
        prediction = model_instance.generate(prompt)
        score = evaluator.evaluate(prediction, ex["answer"])

        result = {
            "id": i,
            "task": task,
            "model": model,
            "prompt": prompt,
            "prediction": prediction,
            "reference": ex["answer"],
            "score": score
        }
        results.append(result)
        print(f"[{i}] Score: {score} | Model: {model}")

    if output:
        filename = output or f"results_{task}_{model}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jsonl"
        with open(filename, "w", encoding="utf-8") as f:
            for row in results:
                f.write(json.dumps(row, ensure_ascii=False) + "\n")
        print(f"Results saved to: {filename}")

if __name__ == "__main__":
    run_eval()
