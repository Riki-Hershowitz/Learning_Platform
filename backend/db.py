"""
חיבור למסד הנתונים MongoDB Atlas
מגדיר את החיבור ואת כל הקולקציות במערכת
"""
from pymongo import MongoClient
from config import Config

# יצירת חיבור ל-MongoDB Atlas
client = MongoClient(Config.MONGO_URI)
db = client["learning_platform"]

# הגדרת קולקציות המערכת
users_col = db["users"]                    # משתמשים
categories_col = db["categories"]          # קטגוריות ראשיות
sub_categories_col = db["sub_categories"]  # תת-קטגוריות
prompts_col = db["prompts"]                # שאלות ותשובות AI
