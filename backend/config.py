"""
קונפיגורציה כללית של האפליקציה
מנהל את כל ההגדרות ומשתני הסביבה של המערכת
"""
import os
from dotenv import load_dotenv

# טעינת משתני סביבה מקובץ .env
load_dotenv()

class Config:
    """כלאס קונפיגורציה מרכזי לכל ההגדרות האפליקציה"""
    
    # מחרוזת חיבור ל-MongoDB Atlas
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/learning_platform")

    # מפתח API של OpenAI ליצירת שיעורים
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    
    # מפתח סודי ל-JWT אימות
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key")
    
    # מצב פיתוח - מציג מידע נוסף לדיבאג
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
