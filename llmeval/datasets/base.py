from abc import ABC, abstractmethod

class BaseDataset(ABC):
    @abstractmethod
    def get_examples(self, split: str = "test", limit: int = None) -> list[dict]:
        """
        Returns a list of dicts like:
        [
            {"question": "...", "answer": "..."},
            ...
        ]
        """
        pass
