from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db import users_col
from models.users import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])

@router.post("", response_model=UserOut)
def create_user(payload: UserCreate):
    doc = payload.model_dump()

    # בדיקה אם המשתמש כבר קיים לפי טלפון ושם
    existing_user = users_col.find_one({"phone": doc["phone"], "name": doc["name"]})
    if existing_user:
        # אם קיים, מחזיר את ה-ID הקיים
        return {"id": str(existing_user["_id"]), "name": existing_user["name"], "phone": existing_user["phone"]}

    # אם לא קיים – יוצרים משתמש חדש
    res = users_col.insert_one(doc)
    return {"id": str(res.inserted_id), **doc}

@router.get("", response_model=list[UserOut])
def list_users():
    out = []
    for u in users_col.find():
        out.append({"id": str(u["_id"]), "name": u["name"], "phone": u["phone"]})
    return out
