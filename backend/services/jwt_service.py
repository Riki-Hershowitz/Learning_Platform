"""
שירות ניהול JWT לאימות ואבטחת משתמשים
כולל יצירת טוקנים ואימות שלהם
"""
import os
from fastapi import Header, HTTPException, status
from jose import jwt, JWTError

SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret")
ALGORITHM = "HS256"

def create_access_token(data: dict) -> str:
    """יצירת טוקן JWT חדש עם נתוני המשתמש"""
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(authorization: str = Header(...)) -> str:
    """
    אימות טוקן JWT והחזרת מזהה המשתמש
    משמש כ-dependency בנתיבים מוגנים
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid token header"
        )
    
    token = authorization[7:]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid token payload"
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid token"
        )
