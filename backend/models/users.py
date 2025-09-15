"""
מודלים לניהול משתמשים
כולל ולידציה של נתוני קלט ופלט
"""
from pydantic import BaseModel, Field
from typing import Optional

class UserCreate(BaseModel):
    """מודל ליצירת משתמש חדש - שם וטלפון"""
    name: str = Field(min_length=2, max_length=100, description="שם המשתמש")
    phone: str = Field(min_length=6, max_length=20, description="מספר טלפון")

class UserOut(BaseModel):
    """מודל להחזרת פרטי משתמש"""
    id: str
    name: str
    phone: str
