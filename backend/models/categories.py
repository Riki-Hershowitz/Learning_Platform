"""
מודלים לניהול קטגוריות ראשיות
כולל ולידציה של נתוני קלט ופלט
"""
from pydantic import BaseModel, Field

class CategoryCreate(BaseModel):
    """מודל ליצירת קטגוריה חדשה"""
    name: str = Field(min_length=2, max_length=100, description="שם הקטגוריה")

class CategoryOut(BaseModel):
    """מודל להחזרת פרטי קטגוריה"""
    id: str
    name: str
