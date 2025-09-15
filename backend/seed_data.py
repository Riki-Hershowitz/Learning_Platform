#!/usr/bin/env python3
"""
סקריפט להוספת נתונים לדוגמה למסד הנתונים
"""
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

# חיבור למסד נתונים
client = MongoClient(os.getenv("MONGO_URI"))
db = client["learning_platform"]

categories_col = db["categories"]
sub_categories_col = db["sub_categories"]

def seed_data():
    print("🌱 מוסיף נתונים לדוגמה...")
    
    # מחיקת נתונים קיימים
    categories_col.delete_many({})
    sub_categories_col.delete_many({})
    
    # הוספת קטגוריות
    categories = [
        {"name": "מתמטיקה"},
        {"name": "מדעי המחשב"},
        {"name": "פיזיקה"},
        {"name": "כימיה"}
    ]
    
    category_results = categories_col.insert_many(categories)
    category_ids = [str(id) for id in category_results.inserted_ids]
    
    print(f"✅ נוספו {len(categories)} קטגוריות")
    
    # הוספת תת-קטגוריות
    sub_categories = [
        # מתמטיקה
        {"name": "אלגברה", "category_id": category_ids[0]},
        {"name": "גיאומטריה", "category_id": category_ids[0]},
        {"name": "חשבון דיפרנציאלי", "category_id": category_ids[0]},
        
        # מדעי המחשב
        {"name": "תכנות", "category_id": category_ids[1]},
        {"name": "מבני נתונים", "category_id": category_ids[1]},
        {"name": "אלגוריתמים", "category_id": category_ids[1]},
        
        # פיזיקה
        {"name": "מכניקה", "category_id": category_ids[2]},
        {"name": "חשמל ומגנטיות", "category_id": category_ids[2]},
        
        # כימיה
        {"name": "כימיה אורגנית", "category_id": category_ids[3]},
        {"name": "כימיה אנליטית", "category_id": category_ids[3]}
    ]
    
    sub_category_results = sub_categories_col.insert_many(sub_categories)
    
    print(f"✅ נוספו {len(sub_categories)} תת-קטגוריות")
    print("🎉 הנתונים נוספו בהצלחה!")
    
    # הצגת הנתונים
    print("\n📋 קטגוריות:")
    for cat in categories_col.find():
        print(f"  - {cat['name']} (ID: {cat['_id']})")
        
    print("\n📋 תת-קטגוריות:")
    for sub in sub_categories_col.find():
        print(f"  - {sub['name']} (קטגוריה: {sub['category_id']})")

if __name__ == "__main__":
    seed_data()