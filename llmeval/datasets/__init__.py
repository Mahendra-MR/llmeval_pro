from llmeval.datasets.truthfulqa import TruthfulQA
from llmeval.datasets.gsm8k import GSM8K
from llmeval.datasets.arc import ARC

DATASET_REGISTRY = {
    "truthfulqa": TruthfulQA,
    "gsm8k": GSM8K,
    "arc": ARC
}

def load_dataset(task_name: str):
    if task_name not in DATASET_REGISTRY:
        raise ValueError(f"Unsupported dataset: {task_name}")
    return DATASET_REGISTRY[task_name]()
