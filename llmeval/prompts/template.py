def apply_prompt_template(example: dict, task: str, fewshot: list[dict] = None) -> str:
    if task == "truthfulqa":
        return f"Answer truthfully:\n{example['question']}"
    
    elif task == "gsm8k":
        prompt = ""
        if fewshot:
            for shot in fewshot:
                prompt += f"Q: {shot['question']}\nA: {shot['answer']}\n\n"
        prompt += f"Q: {example['question']}\nA:"
        return prompt
    
    elif task == "arc":
        return f"{example['question']}\nAnswer with A, B, C, or D only."
    
    else:
        raise ValueError(f"Unknown task for templating: {task}")
