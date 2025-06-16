from abc import ABC, abstractmethod

class BaseEvaluator(ABC):
    @abstractmethod
    def evaluate(self, prediction: str, reference: str) -> float:
        pass
