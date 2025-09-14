from fastapi import APIRouter, HTTPException
from db import users_col
from models.users import UserRegister
from services.jwt_service import create_access_token

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register")
def register_user(payload: UserRegister):
    if users_col.find_one({"phone": payload.phone}):
        raise HTTPException(400, "User already exists")
    doc = payload.model_dump()
    res = users_col.insert_one(doc)
    user_id = str(res.inserted_id)
    token = create_access_token({"user_id": user_id, "name": payload.name})
    return {"id": user_id, "name": payload.name, "token": token}
