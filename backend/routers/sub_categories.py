"""
נתיבי API לניהול תת-קטגוריות
מאפשר יצירה וקבלת תת-קטגוריות לפי קטגוריה אב
"""
from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from db import sub_categories_col, categories_col
from models.sub_categories import SubCategoryCreate, SubCategoryOut
from services.jwt_service import verify_token

router = APIRouter(prefix="/sub-categories", tags=["תת-קטגוריות"])

@router.post("", response_model=SubCategoryOut)
def create_sub_category(payload: SubCategoryCreate, user_id: str = Depends(verify_token)):
    """יצירת תת-קטגוריה חדשה - דורש אימות משתמש"""
    if not categories_col.find_one({"_id": ObjectId(payload.category_id)}):
        raise HTTPException(400, "קטגוריה לא נמצאה")
    
    res = sub_categories_col.insert_one(payload.model_dump())
    return {"id": str(res.inserted_id), **payload.model_dump()}

@router.get("", response_model=list[SubCategoryOut])
def list_sub_categories(category_id: str | None = None):
    """קבלת רשימת תת-קטגוריות - אופציונלי לפי קטגוריה ספציפית"""
    q = {}
    if category_id:
        try:
            ObjectId(category_id)
            q = {"$or": [
                {"category_id": category_id},
                {"category_id": ObjectId(category_id)}
            ]}
        except Exception:
            raise HTTPException(400, "פורמט מזהה קטגוריה לא תקין")
    
    out = []
    for s in sub_categories_col.find(q):
        out.append({
            "id": str(s["_id"]),
            "name": s["name"],
            "category_id": str(s["category_id"]),
        })
    return out
