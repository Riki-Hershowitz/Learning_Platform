"""
מודלים לניהול תת-קטגוריות
כולל ולידציה של נתוני קלט ופלט
"""
from pydantic import BaseModel, Field

class SubCategoryCreate(BaseModel):
    """מודל ליצירת תת-קטגוריה חדשה"""
    name: str = Field(min_length=2, max_length=100, description="שם התת-קטגוריה")
    category_id: str = Field(description="מזהה הקטגוריה האב")

class SubCategoryOut(BaseModel):
    """מודל להחזרת פרטי תת-קטגוריה"""
    id: str
    name: str
    category_id: str
