"""
אפליקציית FastAPI לפלטפורמת למידה מבוססת AI
מאפשרת למשתמשים לבחור נושאי למידה, לשלוח שאלות ל-AI ולקבל שיעורים מותאמים
"""
from fastapi import FastAPI
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from routers import users 
from routers import categories
from routers import sub_categories
from routers import prompts

load_dotenv()

app = FastAPI(
    title="פלטפורמת למידה חכמה",
    description="מערכת למידה מבוססת AI עם ניהול משתמשים והיסטוריית למידה",
    version="1.0.0"
)

mongo_uri = os.getenv("MONGO_URI")

# הגדרות CORS לאפשר גישה מהפרונטאנד
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# רישום כל הנתיבים באפליקציה
app.include_router(users.router)
app.include_router(prompts.router)
app.include_router(categories.router)
app.include_router(sub_categories.router)

# בדיקת חיבור למסד הנתונים
try:
    client = MongoClient(mongo_uri)
    client.server_info()
    print("✅ חיבור ל-MongoDB הצליח!")
except Exception as e:
    print("❌ בעיה בחיבור ל-MongoDB:", e)

@app.get("/", tags=["בדיקה"])
def root():
    """נקודת קצה לבדיקת פעילות השרת"""
    return {"message": "AI Learning Platform API is running!", "status": "active"}
