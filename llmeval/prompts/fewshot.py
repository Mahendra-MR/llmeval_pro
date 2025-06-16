from llmeval.datasets.gsm8k import GSM8K

def get_fewshot_examples(task: str, k: int = 3):
    if task == "gsm8k":
        return GSM8K().get_examples(split="train", limit=k)
    return []
