from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db import categories_col
from models.categories import CategoryCreate, CategoryOut

router = APIRouter(prefix="/categories", tags=["categories"])

@router.post("", response_model=CategoryOut)
def create_category(payload: CategoryCreate):
    if categories_col.find_one({"name": payload.name}):
        raise HTTPException(400, "Category name already exists")
    res = categories_col.insert_one(payload.model_dump())
    return {"id": str(res.inserted_id), "name": payload.name}

@router.get("", response_model=list[CategoryOut])
def list_categories():
    return [{"id": str(c["_id"]), "name": c["name"]} for c in categories_col.find()]
