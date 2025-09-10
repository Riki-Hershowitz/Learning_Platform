# from fastapi import FastAPI
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()
# mongo_uri = os.getenv("MONGO_URI")

# try:
#     client = MongoClient(mongo_uri)
#     client.server_info()  # בודק אם החיבור אפשרי
#     print("✅ חיבור ל-MongoDB הצליח!")
# except Exception as e:
#     print("❌ בעיה בחיבור ל-MongoDB:", e)

# @app.get("/")
# def root():
#     return {"message": "Hello, FastAPI + MongoDB!"}

from fastapi import FastAPI
from routers import users, categories, sub_categories, prompts
from db import client  # לוודא שהחיבור נטען בזמן עלייה

app = FastAPI(title="Learning Platform API", version="0.1.0")

# ראוטים
app.include_router(users.router)
app.include_router(categories.router)
app.include_router(sub_categories.router)
app.include_router(prompts.router)

@app.get("/")
def root():
    return {"status": "ok"}

# אופציונלי: לוג בוט־אפ קצר
try:
    client.server_info()
    print("✅ MongoDB connected")
except Exception as e:
    print("❌ MongoDB connection issue:", e)
