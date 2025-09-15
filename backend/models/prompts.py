"""
מודלים לניהול שאלות ותשובות AI
כולל ולידציה של נתוני קלט ופלט
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PromptCreate(BaseModel):
    """מודל לשליחת שאלה חדשה ל-AI"""
    user_id: str = Field(description="מזהה המשתמש")
    category_id: str = Field(description="מזהה הקטגוריה")
    sub_category_id: str = Field(description="מזהה התת-קטגוריה")
    prompt: str = Field(min_length=3, description="השאלה או הנושא ללמידה")

class PromptOut(BaseModel):
    """מודל להחזרת שאלה ותשובת AI"""
    id: str
    user_id: str
    category_id: str
    sub_category_id: str
    prompt: str
    response: str
    created_at: datetime
