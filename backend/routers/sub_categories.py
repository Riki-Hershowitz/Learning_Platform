from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db import sub_categories_col, categories_col
from models.sub_categories import SubCategoryCreate, SubCategoryOut

router = APIRouter(prefix="/sub-categories", tags=["sub-categories"])

@router.post("", response_model=SubCategoryOut)
def create_sub_category(payload: SubCategoryCreate):
    # וידוא שהקטגוריה קיימת
    if not categories_col.find_one({"_id": ObjectId(payload.category_id)}):
        raise HTTPException(400, "category_id not found")
    res = sub_categories_col.insert_one(payload.model_dump())
    return {"id": str(res.inserted_id), **payload.model_dump()}

@router.get("", response_model=list[SubCategoryOut])
def list_sub_categories(category_id: str | None = None):
    q = {"category_id": category_id} if category_id else {}
    out = []
    for s in sub_categories_col.find(q):
        out.append({
            "id": str(s["_id"]),
            "name": s["name"],
            "category_id": s["category_id"],
        })
    return out
