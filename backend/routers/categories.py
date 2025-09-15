"""
נתיבי API לניהול קטגוריות ראשיות
מאפשר יצירה וקבלת קטגוריות למידה (מתמטיקה, מדעים וכו')
"""
from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from db import categories_col
from models.categories import CategoryCreate, CategoryOut
from services.jwt_service import verify_token

router = APIRouter(prefix="/categories", tags=["קטגוריות"])

@router.post("", response_model=CategoryOut)
def create_category(payload: CategoryCreate, user_id: str = Depends(verify_token)):
    """יצירת קטגוריה חדשה - דורש אימות משתמש"""
    if categories_col.find_one({"name": payload.name}):
        raise HTTPException(400, "שם קטגוריה כבר קיים")
    
    res = categories_col.insert_one(payload.model_dump())
    return {"id": str(res.inserted_id), "name": payload.name}

@router.get("", response_model=list[CategoryOut])
def list_categories():
    """קבלת רשימת כל הקטגוריות - לא דורש אימות"""
    return [{"id": str(c["_id"]), "name": c["name"]} for c in categories_col.find()]
