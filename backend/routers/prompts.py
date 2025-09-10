from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime
from db import prompts_col, users_col, categories_col, sub_categories_col
from models.prompts import PromptCreate, PromptOut
from services.ai import generate_lesson

router = APIRouter(prefix="/prompts", tags=["prompts"])

@router.post("", response_model=PromptOut)
def create_prompt(payload: PromptCreate):
    # בדיקות קיום ישויות
    if not users_col.find_one({"_id": ObjectId(payload.user_id)}):
        raise HTTPException(400, "user_id not found")
    if not categories_col.find_one({"_id": ObjectId(payload.category_id)}):
        raise HTTPException(400, "category_id not found")
    if not sub_categories_col.find_one({"_id": ObjectId(payload.sub_category_id)}):
        raise HTTPException(400, "sub_category_id not found")

    response = generate_lesson(payload.prompt)
    doc = {
        **payload.model_dump(),
        "response": response,
        "created_at": datetime.utcnow(),
    }
    res = prompts_col.insert_one(doc)
    return {
        "id": str(res.inserted_id),
        "user_id": payload.user_id,
        "category_id": payload.category_id,
        "sub_category_id": payload.sub_category_id,
        "prompt": payload.prompt,
        "response": response,
        "created_at": doc["created_at"],
    }

@router.get("/by-user/{user_id}", response_model=list[PromptOut])
def list_user_prompts(user_id: str):
    out = []
    for p in prompts_col.find({"user_id": user_id}).sort("created_at", -1):
        out.append({
            "id": str(p["_id"]),
            "user_id": p["user_id"],
            "category_id": p["category_id"],
            "sub_category_id": p["sub_category_id"],
            "prompt": p["prompt"],
            "response": p["response"],
            "created_at": p["created_at"],
        })
    return out

# "אדמין" – כל הפרומפטים עם פאג'ינציה בסיסית
@router.get("", response_model=list[PromptOut])
def list_all_prompts(skip: int = 0, limit: int = 20):
    cursor = prompts_col.find().sort("created_at", -1).skip(skip).limit(limit)
    out = []
    for p in cursor:
        out.append({
            "id": str(p["_id"]),
            "user_id": p["user_id"],
            "category_id": p["category_id"],
            "sub_category_id": p["sub_category_id"],
            "prompt": p["prompt"],
            "response": p["response"],
            "created_at": p["created_at"],
        })
    return out
