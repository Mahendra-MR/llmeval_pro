from llmeval.evaluators.base import BaseEvaluator

class AccuracyEvaluator(BaseEvaluator):
    def evaluate(self, prediction: str, reference: str) -> float:
        return float(prediction.strip().lower() == reference.strip().lower())
