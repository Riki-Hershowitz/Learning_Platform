from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PromptCreate(BaseModel):
    user_id: str
    category_id: str
    sub_category_id: str
    prompt: str = Field(min_length=3)

class PromptOut(BaseModel):
    id: str
    user_id: str
    category_id: str
    sub_category_id: str
    prompt: str
    response: str
    created_at: datetime
