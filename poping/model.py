from pydantic import BaseModel
from typing import List, Optional


class Problem(BaseModel):
    _id = None
    filename: str
    name: str
    level: int = 3
    author: str = "anonymous"
    description: str = ""
    tags: List[str] = []
    hint: str = "I have no idea"

    pre_exercise_code: str = ""
    sample_code: str = ""
    solution: str = ""
