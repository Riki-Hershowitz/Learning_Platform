"""
נתיבי API לניהול משתמשים
כולל רישום/התחברות וקבלת רשימת משתמשים למנהל
"""
from fastapi import APIRouter, HTTPException, Depends
from db import users_col
from models.users import UserCreate
from services.jwt_service import create_access_token, verify_token

router = APIRouter(prefix="/users", tags=["משתמשים"])

@router.post("/register")
def register_user(payload: UserCreate):
    """
    רישום/התחברות משתמש
    אם המשתמש קיים - מחזיר את פרטיו עם טוקן חדש
    אם לא - יוצר משתמש חדש
    """
    existing_user = users_col.find_one({"phone": payload.phone})
    if existing_user:
        user_id = str(existing_user["_id"])
        token = create_access_token({"user_id": user_id, "name": existing_user["name"]})
        return {"id": user_id, "name": existing_user["name"], "token": token}
    
    doc = payload.model_dump()
    res = users_col.insert_one(doc)
    user_id = str(res.inserted_id)
    token = create_access_token({"user_id": user_id, "name": payload.name})
    return {"id": user_id, "name": payload.name, "token": token}

@router.get("", response_model=list)
def get_all_users(user_id: str = Depends(verify_token)):
    """קבלת רשימת כל המשתמשים - למנהל בלבד"""
    users = list(users_col.find({}, {"_id": 1, "name": 1, "phone": 1}))
    return [
        {
            "id": str(user["_id"]),
            "name": user["name"],
            "phone": user["phone"]
        } for user in users
    ]
