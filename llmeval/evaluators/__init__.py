from llmeval.evaluators.accuracy import AccuracyEvaluator
from llmeval.evaluators.arc_eval import ARCEvaluator

EVALUATOR_REGISTRY = {
    "truthfulqa": AccuracyEvaluator,
    "gsm8k": AccuracyEvaluator,
    "arc": ARCEvaluator
}

def get_evaluator(task_name: str):
    if task_name not in EVALUATOR_REGISTRY:
        raise ValueError(f"No evaluator for task: {task_name}")
    return EVALUATOR_REGISTRY[task_name]()
