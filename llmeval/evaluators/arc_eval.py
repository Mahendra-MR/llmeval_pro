from llmeval.evaluators.base import BaseEvaluator
import re

class ARCEvaluator(BaseEvaluator):
    def evaluate(self, prediction: str, reference: str) -> float:
        pred = prediction.strip().upper()
        match = re.search(r"\b([A-D])\b", pred)
        if match:
            pred_letter = match.group(1)
            return float(pred_letter == reference.strip().upper())
        return 0.0
