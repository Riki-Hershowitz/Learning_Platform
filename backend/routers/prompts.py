"""
נתיבי API לניהול שאלות ותשובות AI
כולל שליחת שאלות ל-AI, קבלת שיעורים וניהול היסטוריית למידה
"""
from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from datetime import datetime
from db import prompts_col, users_col, categories_col, sub_categories_col
from models.prompts import PromptCreate, PromptOut
from services.ai import generate_lesson
from services.jwt_service import verify_token

router = APIRouter(prefix="/prompts", tags=["שאלות ותשובות"])

@router.post("", response_model=PromptOut)
def create_prompt(payload: PromptCreate, user_id: str = Depends(verify_token)):
    """
    שליחת שאלה ל-AI וקבלת שיעור מותאם אישית
    בודק שהמשתמש, קטגוריה ותת-קטגוריה קיימים
    """
    if str(payload.user_id) != user_id:
        raise HTTPException(403, "אין התאמה במזהה המשתמש")
    if not users_col.find_one({"_id": ObjectId(payload.user_id)}):
        raise HTTPException(404, "משתמש לא נמצא")
    if not categories_col.find_one({"_id": ObjectId(payload.category_id)}):
        raise HTTPException(404, "קטגוריה לא נמצאה")
    if not sub_categories_col.find_one({"_id": ObjectId(payload.sub_category_id)}):
        raise HTTPException(404, "תת-קטגוריה לא נמצאה")
    
    response = generate_lesson(payload.prompt)
    doc = {
        "user_id": ObjectId(payload.user_id),
        "category_id": ObjectId(payload.category_id),
        "sub_category_id": ObjectId(payload.sub_category_id),
        "prompt": payload.prompt,
        "response": response,
        "created_at": datetime.utcnow()
    }
    res = prompts_col.insert_one(doc)
    doc["_id"] = res.inserted_id
    return PromptOut(
        id=str(doc["_id"]),
        user_id=str(doc["user_id"]),
        category_id=str(doc["category_id"]),
        sub_category_id=str(doc["sub_category_id"]),
        prompt=doc["prompt"],
        response=doc["response"],
        created_at=doc["created_at"].isoformat()
    )

@router.get("/by-user/{user_id}", response_model=list[PromptOut])
def list_user_prompts(user_id: str, token_user_id: str = Depends(verify_token)):
    """קבלת היסטוריית למידה של משתמש ספציפי - רק למשתמש עצמו"""
    if user_id != token_user_id:
        raise HTTPException(403, "אסור")
    
    prompts = list(prompts_col.find({"user_id": ObjectId(user_id)}))
    return [
        PromptOut(
            id=str(p["_id"]),
            user_id=str(p["user_id"]),
            category_id=str(p["category_id"]),
            sub_category_id=str(p["sub_category_id"]),
            prompt=p["prompt"],
            response=p["response"],
            created_at=p["created_at"].isoformat()
        ) for p in prompts
    ]

@router.get("", response_model=list[PromptOut])
def list_all_prompts(skip: int = 0, limit: int = 20, token_user_id: str = Depends(verify_token)):
    """קבלת כל השאלות והתשובות - למנהל בלבד, עם פייגינג"""
    prompts = list(prompts_col.find().skip(skip).limit(limit))
    return [
        PromptOut(
            id=str(p["_id"]),
            user_id=str(p["user_id"]),
            category_id=str(p["category_id"]),
            sub_category_id=str(p["sub_category_id"]),
            prompt=p["prompt"],
            response=p["response"],
            created_at=p["created_at"].isoformat()
        ) for p in prompts
    ]
